let pokemonList = document.getElementById('pokemonList')
let loadMoreBtn = document.getElementById('loadMoreBtn')

const maxRecords  = 151
const limit = 10
let offset = 0

    function loadPokemons(offset, limit) {   
      pokeApi.getPokemons(offset, limit)
      .then((pokemons = []) => {
        pokemonList.innerHTML += pokemons.map((pokemon) => {
          return `<li class="pokemon ${pokemon.type}">
          <span class="number">#${pokemon.number}</span>
          <span class="name">${pokemon.name}</span>
      
          <div class="detail">
            <ol class="types">
              ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
            <img src="${pokemon.photo}" alt="${pokemon.name}">
          </div>
        </li>
        `
        }).join('')
      })
      .catch((erro) => console.log(erro))
      .finally(() => console.log('Requisição concluída'))
    }

    loadPokemons(offset, limit)

    loadMoreBtn.addEventListener('click', () => {
      offset += limit

      const qtdRecordNextPage = offset + limit

      if(qtdRecordNextPage >= maxRecords) {
        const newLimit = qtdRecordNextPage - maxRecords
        loadPokemons(offset, limit)

        loadMoreBtn.remove()
      }
      else {
        loadPokemons(offset, limit)
      }
    })