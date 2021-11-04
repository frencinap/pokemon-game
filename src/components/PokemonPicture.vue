<template>
  <div>
    <div class="pokemon-container">
      <img
        class="hidden-pokemon"
        :src="imgSrc"
        alt="pokemon">
      <img
      v-if="showPokemon"
        class="fade-in"
        :src="imgSrc"
        alt="pokemon">
    </div>
      
  </div>
</template>

<script>
export default {
  name: 'PokemonPicture',
  props: {
    pokemonId: {
      type: Number,
      required: true,
      default: false
    },
    showPokemon: {
      type: Boolean,
      required: true,

    }
  },
  computed: {
    imgSrc() {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${this.pokemonId}.svg`
    }
  }

}
</script>

<style scoped>
/* Pokemon Picture */
.pokemon-container {
    height: 250px;
    display: flex;
    flex-flow: row;
    justify-content: center;
}
img {
    height: 250px;
    width: 250px;
    position: absolute;
    
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
}
.hidden-pokemon {
    filter: brightness(0);
}

</style>