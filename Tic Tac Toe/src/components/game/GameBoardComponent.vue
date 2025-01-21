<script>

import '../../assets/css/STYLE_GameBoardComponent.css';

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
      if (cell === this.player1) return '/src/assets/img/x.svg';
      if (this.player2 && cell === this.player2) return '/src/assets/img/o.svg';
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
        :id="`cell-${rowIndex}-${colIndex}`"
        class="board-cell"
        :class="{ 'current-player': currentPlayer === userId }"
        @click="handleCellClick(rowIndex, colIndex)"
      >
      <img v-if="getCellSymbol(cell)" :src="getCellSymbol(cell)" alt="Symbol" />

      </div>
    </div>
  </div>
</template>


