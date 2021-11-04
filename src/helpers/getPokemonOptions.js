
// importamos la api
import pokemonApi from '../api/pokemonApi'

// Creamos el arreglo
const getPokemons = () => {

    // arreglo basado en el arreglo de 650 items por las propiedades de la api
    const pokemonsArr = Array.from(Array(650))
    return pokemonsArr.map((_, index) => index+1)
    
}
//mezclamos el arreglo para que los 4 primeros elementos sean aleatorios
const getPokemonOptions = async() => {

    const mixedPokemons = getPokemons().sort(()=> Math.random() - 0.5)
    //cortamos y mostramos los 4 primeros elementos del arreglo
    const pokemons = await getPokemonNames(mixedPokemons.splice(0,4))
    return pokemons
}
//desestructuramos en variables independientes los primeros 4 elementos
const getPokemonNames = async ( [a,b,c,d]= []) => {

    //const res = await pokemonApi.get(`/1`)
    //console.log(res.data.name, res.data.id);
    //variables independientes de cada pokemon
    //console.log(a,b,c,d);

    const arrPromises = [
        pokemonApi.get(`${a}`),
        pokemonApi.get(`${b}`),
        pokemonApi.get(`${c}`),
        pokemonApi.get(`${d}`)
    ]
    //devuelve arreglo completo
    // const resp = await Promise.all(arrPromises)
    // console.log(resp);
    //desestructuramos
    const [p1,p2,p3,p4] = await Promise.all(arrPromises)
    return [
        {name: p1.data.name, id:p1.data.id},
        {name: p2.data.name, id:p2.data.id},
        {name: p3.data.name, id:p3.data.id},
        {name: p4.data.name, id:p4.data.id}
    ]
}

export default getPokemonOptions