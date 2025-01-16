<script>
export default {
  props: {
    board: {
      type: Array,
      required: true,
    },
    currentPlayer: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
        player1: {
      type: String,
      required: true,
    },
    player2: {
      type: String,
      required: true,
    },
    winner: {
      type: String,
      required: false,
    },
  },
  methods: {
    handleCellClick(row, col) {
      console.log('Cell clicked:', row, col);
      if (this.board[row][col] === null && this.currentPlayer === this.userId && !this.winner && this.player2) {
        this.$emit('cell-clicked', row, col);
        console.log('Cell clicked:', row, col);
      }
    },
    getCellSymbol(cell) {
      if (cell === this.player1) return 'X';
      if (this.player2 && cell === this.player2) return 'O';
      return '';
    },
  },
};
</script>

<template>
  <div class="game-board">
    <div v-for="(row, rowIndex) in board" :key="rowIndex" class="board-row">
      <div
        v-for="(cell, colIndex) in row"
        :key="colIndex"
        class="board-cell"
        :class="{ 'current-player': currentPlayer === userId }"
        @click="handleCellClick(rowIndex, colIndex)"
      >
        {{ getCellSymbol(cell) }}
      </div>
    </div>
  </div>
</template>

<style>
.game-board {
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  gap: 10px;
}
.board-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
.board-cell {
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #000;
  cursor: pointer;
}
.board-cell.current-player {
  background-color: lightgreen;
}
</style>