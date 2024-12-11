const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

const app = express();
const PORT = process.env_PORT || 3001;
const JWT_SECRET = 'your_jwt_secret_key'; // À remplacer par une vraie clé secrète en production

app.use(express.json());

// Middleware CORS pour gérer les requêtes de même origine
app.use(
    cors({
        origin: '*', // Remplacez par le domaine de votre frontend
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    }),
);

// Middleware de journalisation
app.use((req, res, next) => {
    const start = Date.now();
    const originalSend = res.send;

    res.send = function (body) {
        const duration = Date.now() - start;
        console.log(
            `${req.method} ${req.url} - ${
                res.statusCode
            } - ${duration}ms - ${JSON.stringify(body)}`,
        );
        originalSend.call(this, body);
    };

    next();
});

// Chemins des fichiers de données
const USERS_FILE = path.join(__dirname, 'data', 'users.json');
const GAMES_FILE = path.join(__dirname, 'data', 'games.json');

// Middleware d'authentification
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Utilitaires de gestion de fichiers
const readJsonFile = async (filePath) => {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

const writeJsonFile = async (filePath, data) => {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};

// Routes d'authentification
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const users = await readJsonFile(USERS_FILE);

    if (users.find((u) => u.username === username)) {
        return res.status(400).json({ message: 'User already exist' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
        id: uuidv4(),
        username,
        password: hashedPassword,
    };

    users.push(newUser);
    await writeJsonFile(USERS_FILE, users);

    res.status(201).json({ message: 'User created', userId: newUser.id });
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const users = await readJsonFile(USERS_FILE);

    const user = users.find((u) => u.username === username);
    if (!user) return res.status(400).json({ message: 'Bad user' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
        return res.status(400).json({ message: 'Bad password' });

    const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: '1h' },
    );
    res.json({ token });
});

app.get('/user/:id', authenticateToken, async (req, res) => {
    const userId = req.params.id;
    const users = await readJsonFile(USERS_FILE);
    const user = users.find((u) => u.id === userId);
    res.json({ id: user.id, username: user.username });
});

// Route pour mettre à jour le nom d'utilisateur et le mot de passe
app.put('/user', authenticateToken, async (req, res) => {
    const { username, password } = req.body;
    const users = await readJsonFile(USERS_FILE);

    const userIndex = users.findIndex((u) => u.id === req.user.id);
    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }

    if (username) {
        if (
            users.find((u) => u.username === username && u.id !== req.user.id)
        ) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        users[userIndex].username = username;
    }

    if (password && password.length > 0) {
        const hashedPassword = await bcrypt.hash(password, 10);
        users[userIndex].password = hashedPassword;
    }

    await writeJsonFile(USERS_FILE, users);

    const newToken = jwt.sign(
        { id: req.user.id, username: users[userIndex].username },
        JWT_SECRET,
        { expiresIn: '1h' },
    );

    res.json({
        message: 'User updated',
        user: {
            id: req.user.id,
            token: newToken,
            username: users[userIndex].username,
        },
    });
});

// Routes de jeu
app.post('/games', authenticateToken, async (req, res) => {
    try {
        const games = await readJsonFile(GAMES_FILE);

        const newGame = {
            id: uuidv4(),
            creator: req.user.id,
            player1: req.user.id,
            player2: null,
            board: Array(9).fill(null),
            status: 'waiting',
            currentPlayer: req.user.id,
        };

        games.push(newGame);
        await writeJsonFile(GAMES_FILE, games);

        res.status(201).json(newGame);
    } catch (error) {
        console.error(error);
    }
});

app.get('/games', authenticateToken, async (req, res) => {
    const games = await readJsonFile(GAMES_FILE);
    const availableGames = games.filter(
        (game) => game.status === 'waiting' || game.status === 'in_progress',
    );
    res.json(availableGames);
});

app.post('/games/:gameId/join', authenticateToken, async (req, res) => {
    const games = await readJsonFile(GAMES_FILE);
    const gameIndex = games.findIndex((g) => g.id === req.params.gameId);

    if (gameIndex === -1)
        return res.status(404).json({ message: 'Game not found' });

    const game = games[gameIndex];
    if (game.player2)
        return res.status(400).json({ message: 'Game already completed' });

    game.player2 = req.user.id;
    game.status = 'in_progress';

    games[gameIndex] = game;
    await writeJsonFile(GAMES_FILE, games);

    res.json(game);
});

app.post(
    '/games/:gameId/move/:row/:col',
    authenticateToken,
    async (req, res) => {
        const { row, col } = req.params;
        const games = await readJsonFile(GAMES_FILE);
        const gameIndex = games.findIndex((g) => g.id === req.params.gameId);

        if (gameIndex === -1)
            return res.status(404).json({ message: 'Game not found' });

        const game = games[gameIndex];

        if (game.currentPlayer !== req.user.id) {
            return res.status(400).json({ message: 'Not your turn' });
        }

        const position = parseInt(row) * 3 + parseInt(col);

        if (game.board[position] !== null) {
            return res.status(400).json({ message: 'Cell already played' });
        }

        game.board[position] = req.user.id;
        game.currentPlayer =
            req.user.id === game.player1 ? game.player2 : game.player1;

        // Vérifier si victoire
        const winningCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8], // Lignes
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8], // Colonnes
            [0, 4, 8],
            [2, 4, 6], // Diagonales
        ];

        const winner = winningCombos.some(
            (combo) =>
                game.board[combo[0]] &&
                game.board[combo[0]] === game.board[combo[1]] &&
                game.board[combo[0]] === game.board[combo[2]],
        );

        if (winner) {
            game.status = 'finished';
            game.winner = req.user.id;
        } else if (!game.board.includes(null)) {
            game.status = 'draw';
        }

        games[gameIndex] = game;
        await writeJsonFile(GAMES_FILE, games);

        res.json(game);
    },
);

app.delete('/games/:gameId', authenticateToken, async (req, res) => {
    const games = await readJsonFile(GAMES_FILE);
    const gameIndex = games.findIndex((g) => g.id === req.params.gameId);

    if (gameIndex === -1)
        return res.status(404).json({ message: 'Game not found' });

    const game = games[gameIndex];
    if (game.creator !== req.user.id) {
        return res.status(403).json({
            message: 'Cannot delete game you did not create',
        });
    }

    games.splice(gameIndex, 1);
    await writeJsonFile(GAMES_FILE, games);

    res.json({ message: 'Game deleted' });
});

app.get('/games/:gameId', authenticateToken, async (req, res) => {
    const gameId = req.params.gameId;

    const games = await readJsonFile(GAMES_FILE);
    const game = games.find((g) => g.id === gameId);

    if (game) {
        res.json(game);
    } else {
        res.status(404).json({ message: 'Game not found' });
    }
});

// Créer les dossiers de données s'ils n'existent pas
const initializeDataFiles = async () => {
    await fs.mkdir(path.join(__dirname, 'data'), { recursive: true });

    try {
        await fs.access(USERS_FILE);
    } catch {
        await writeJsonFile(USERS_FILE, []);
    }

    try {
        await fs.access(GAMES_FILE);
    } catch {
        await writeJsonFile(GAMES_FILE, []);
    }
};

// Démarrage du serveur
const startServer = async () => {
    await initializeDataFiles();

    app.listen(PORT, () => {
        console.log(`Serveur Tic Tac Toe port ${PORT}`);
    });
};

startServer();
