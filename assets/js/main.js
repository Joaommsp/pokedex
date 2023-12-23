let pokemonList = document.getElementById('pokemonList')
let loadMoreBtn = document.getElementById('loadMoreBtn')
let pokePopUp = document.getElementById('pokePopUp')
let body = document.querySelector('body')
let closePopUpBtn = document.getElementById('closePopUp')

// pokePopUp.addEventListener('mouseleave', () => {
//   pokePopUp.classList.add('displayNone')
// })
closePopUpBtn.addEventListener('click', () => {
  pokePopUp.classList.add('displayNone')
})

const maxRecords  = 151
const limit = 10
let offset = 0

    function loadPokemons(offset, limit, getPokemonInfo) {   
       pokeApi.getPokemons(offset, limit)
      .then((pokemons) => {
        pokemonList.innerHTML += pokemons.map((pokemon) => {
          return `<li class="pokemon ${pokemon.type}" id="${pokemon.name}">
          <span class="number">#${pokemon.number}</span>
          <span class="name">${pokemon.name}</span>
      
          <div class="detail">
            <ol class="types">
              ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
            <img id="${pokemon.name}Img" src="${pokemon.photo}" alt="${pokemon.name}">
          </div>
        </li>
        `
        }).join('')
        return pokemons
      })
      .catch((erro) => console.log(erro))
      .finally(() => console.log('Requisição concluída'))

      let waitResults = setInterval(() => {
        getPokemonInfo()
        clearInterval(waitResults)
      }, 1000)
    }

    function getPokemonInfo() {
      let poke = document.querySelectorAll(".pokemon")
      poke.forEach((e) => {
        e.addEventListener('click', () => {

          let details = e.childNodes
          let bgColor = e.classList[1]
          
          pokePopUp.classList.toggle('displayNone')

          for(let i = 0; i < pokePopUp.classList.length ; i++) {
            if(i != 0 ) {
              pokePopUp.classList.remove(pokePopUp.classList[i])
            }
          }

          pokePopUp.classList.add(bgColor)

          let pokeIdContent = document.getElementById('pokeId')
          let pokeNameContent = document.getElementById('pokeName')
          let pokeType1Content = document.getElementById('pokeType1')
          let pokeType2Content = document.getElementById('pokeType2')
          let pokeImgContent = document.getElementById('pokePopUpImg')

          let pokeId =  details[1].textContent
          generateContent(pokeIdContent, pokeId)
          let pokeName = details[3].textContent
          generateContent(pokeNameContent, pokeName)
          let pokeType1 = details[5].childNodes[1].childNodes[1].textContent
          generateContent(pokeType1Content, pokeType1)
          let pokeType2 = details[5].childNodes[1].childNodes[2].textContent
          generateContent(pokeType2Content, pokeType2)
          let pokeImg =  details[5].childNodes[3].src

          pokeImgContent.src = pokeImg
        })
      })
    }

    loadPokemons(offset, limit, getPokemonInfo)

    loadMoreBtn.addEventListener('click', () => {
      offset += limit

      const qtdRecordNextPage = offset + limit

      if(qtdRecordNextPage >= maxRecords) {
        const newLimit = qtdRecordNextPage - maxRecords
        loadPokemons(offset, newLimit, getPokemonInfo)

        loadMoreBtn.remove()
      }
      else {
        loadPokemons(offset, limit, getPokemonInfo)
      }
    })

    function generateContent(element, content) {
      return element.textContent = content
    }