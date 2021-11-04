<template>
  <h1 v-if="!pokemon"> Espere un segundo por favor...</h1>
  <div v-else>
      <h1>Quién es este pokémon?</h1>

      <!-- Img -->
      <PokemonPicture
        :pokemonId="pokemon.id"
        :showPokemon="showPokemon" />

      <!-- Opciones -->
      <!-- Recibimos el evento personalizado dentro de un metodo creado aqui con la info del componente hijo -->
      <PokemonOptions
        :pokemons="pokemonArr" 
        @selection="checkAnswer($event)"/>

        <!-- contenedor respuesta -->
      <div class="show-answer" v-if="showAnswer">
        <h2> {{message}} </h2>
        <button @click="reset">
            Nuevo Juego
        </button>
     </div>
  </div>
</template>

<script>
import PokemonOptions from '../components/PokemonOptions.vue'
import PokemonPicture from '../components/PokemonPicture.vue'

// logica del array de pokemons
import getPokemonOptions from '../helpers/getPokemonOptions'
//console.log(getPokemonOptions())

export default {
    name: 'PokemonPage',
    components: {
        PokemonOptions,
        PokemonPicture
    },
    data(){
        return{
            //arreglo vacio que mostrará las opciones
            pokemonArr: [],
            pokemon: null,
            showPokemon: false,
            showAnswer: false,
            message: ''
        }
    },
    methods: {
        //como esperamos una promesa, este metodo debe ser async
        async mixedPokemonArray(){
            this.pokemonArr = await getPokemonOptions()
            console.log(this.pokemonArr);
            //numero random entre 0 y 3
            const randomInt = Math.floor( Math.random() * 4)
            //pokemon será igual al elemento con index randomInt  en pokemonArr 
            this.pokemon = this.pokemonArr[randomInt]
        },
        checkAnswer(pokemonID){
            console.log('ID del pokemon seleccionado: ', pokemonID);
            this.showPokemon = true
            this.showAnswer= true

            if(pokemonID === this.pokemon.id ){
                this.message= `Correcto, el pokemon es ${this.pokemon.name}`
            }else{
                this.message= `Incorrecto, el pokemon era ${this.pokemon.name}`
            }
        },
        reset(){
            this.showPokemon = false
            this.showAnswer = false
            this.pokemonArr = []
            this.mixedPokemonArray()
            this.pokemon = null
        }
        
    },
    //lifecycles
    mounted() {
        this.mixedPokemonArray()
    }

}
</script>
<style scoped>
.show-answer{
    text-align: center;
}
</style>
