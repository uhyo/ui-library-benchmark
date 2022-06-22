cat pokemons.json | jq '.data.species | map({
  id: .id,
  en: .pokemon_v2_pokemonspeciesnames | .[] | select(.language_id == 8) | .name,
  ja: .pokemon_v2_pokemonspeciesnames | .[] | select(.language_id == 1) | .name
})' > data.json