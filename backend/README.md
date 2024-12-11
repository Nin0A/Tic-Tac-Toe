# API Tic Tac Toe

## Description
API REST pour jouer au Tic Tac Toe avec Node.js, Express et persistance de données via fichiers JSON.

## Prérequis
- Node.js (v20+)
- npm

## Installation
1. Installer les dépendances
```bash
npm install
```

3. Démarrer le serveur
```bash
npm start
```

## Routes API

### Authentification
- `POST /register`: Créer un utilisateur
- `POST /login`: Connexion, obtention du token JWT

### Doc

| Method | Route                         | Body                                             | Description                         | Response Example                                                                                                                                                                                 |
| ------ | ----------------------------- | ------------------------------------------------ | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| POST   | /register                     | `{ "username": "string", "password": "string" }` | Register a new user                 | `{ "message": "User created", "userId": "uuid" }`                                                                                                                                                |
| POST   | /login                        | `{ "username": "string", "password": "string" }` | Login a user and return a JWT token | `{ "token": "jwt_token" }`                                                                                                                                                                       |
| GET    | /user/:id                     | N/A                                              | Get user information by ID          | `{ "id": "uuid", "username": "string" }`                                                                                                                                                         |
| PUT    | /user                         | `{ "username": "string", "password": "string" }` | Update username and password        | `{ "message": "User updated", "user": { "id": "uuid", "token": "new_jwt_token", "username": "string" } }`                                                                                        |
| POST   | /games                        | N/A                                              | Create a new game                   | `{ "id": "uuid", "creator": "uuid", "player1": "uuid", "player2": null, "board": [null, null, null, null, null, null, null, null, null], "status": "waiting", "currentPlayer": "uuid" }`         |
| GET    | /games                        | N/A                                              | List all available games            | `[ { "id": "uuid", "creator": "uuid", "player1": "uuid", "player2": null, "board": [null, null, null, null, null, null, null, null, null], "status": "waiting", "currentPlayer": "uuid" } ]`     |
| POST   | /games/:gameId/join           | N/A                                              | Join a game by ID                   | `{ "id": "uuid", "creator": "uuid", "player1": "uuid", "player2": "uuid", "board": [null, null, null, null, null, null, null, null, null], "status": "in_progress", "currentPlayer": "uuid" }`   |
| POST   | /games/:gameId/move/:row/:col | N/A                                              | Make a move in the game             | `{ "id": "uuid", "creator": "uuid", "player1": "uuid", "player2": "uuid", "board": ["uuid", null, null, null, null, null, null, null, null], "status": "in_progress", "currentPlayer": "uuid" }` |
| DELETE | /games/:gameId                | N/A                                              | Delete a game by ID                 | `{ "message": "Game deleted" }`                                                                                                                                                                  |
| GET    | /games/:gameId                | N/A                                              | Get game state by ID                | `{ "id": "uuid", "creator": "uuid", "player1": "uuid", "player2": "uuid", "board": [null, null, null, null, null, null, null, null, null], "status": "waiting", "currentPlayer": "uuid" }`       |


### Game Status

- `waiting` : Ce statut est utilisé lorsque la partie vient d'être créée et qu'elle attend qu'un deuxième joueur la rejoigne.
- `in_progress` : Ce statut est utilisé lorsque les deux joueurs sont présents et que la partie est en cours.
- `finished` : Ce statut est utilisé lorsque la partie est terminée et qu'un joueur a gagné.
- `draw` : Ce statut est utilisé lorsque la partie est terminée sans gagnant (toutes les cases sont remplies sans combinaison gagnante).

## Licence
MIT