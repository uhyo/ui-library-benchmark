cat raw.json | jq '.data.pokemon_v2_location | map({
  id: .id,
  en: .pokemon_v2_locationnames | .[] | select(.language_id == 9) | .name,
  ja: .pokemon_v2_locationnames | .[] | select(.language_id == 1) | .name
})' > location.json
