<script>

export default {

  props: {
    game: {
      type: Object,
      Required: true,

    },
  },
}

</script>

<template>
  <h2>{{ game.playerName }}</h2>
  <p>coucou</p>

</template>
