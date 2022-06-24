cat raw.json | jq '.data.pokemon_v2_pokemonspecies | map({
  id: .id,
  en: .pokemon_v2_pokemonspeciesnames | .[] | select(.language_id == 9) | .name,
  ja: .pokemon_v2_pokemonspeciesnames | .[] | select(.language_id == 1) | .name
})' > pokemon.json 