export interface Card {
  arena_id?: number;
  id: string;
  lang: string;
  mtgo_id?: number;
  mtgo_foil_id?: number;
  multiverse_ids?: number[];
  tcgplayer_id?: number;
  tcgplayer_etched_id?: number;
  cardmarket_id?: number;
  object: string;
  layout: string;
  oracle_id?: string;
  prints_search_uri: string;
  rulings_uri: string;
  scryfall_uri: string;
  uri: string;
  all_parts?: RelatedCard[];
  card_faces?: CardFace[];
  cmc: number;
  color_identity: string[];
  color_indicator?: string[];
  colors?: string[];
  defense?: string;
  edhrec_rank?: number;
  hand_modifier?: string;
  keywords: string[];
  legalities: Legalities;
  life_modifier?: string;
  loyalty?: string;
  mana_cost?: string;
  name: string;
  oracle_text?: string;
  penny_rank?: number;
  power?: string;
  produced_mana?: string[];
  reserved: boolean;
  toughness?: string;
  type_line: string;
  artist?: string;
  artist_ids?: string[];
  attraction_lights?: number[];
  booster: boolean;
  border_color: string;
  card_back_id: string;
  collector_number: string;
  content_warning?: boolean;
  digital: boolean;
  finishes: string[];
  flavor_name?: string;
  flavor_text?: string;
  frame_effects?: string[];
  frame: string;
  full_art: boolean;
  games: string[];
  highres_image: boolean;
  illustration_id?: string;
  image_status: string;
  image_uris?: ImageUris;
  oversized: boolean;
  prices: Prices;
  printed_name?: string;
  printed_text?: string;
  printed_type_line?: string;
  promo: boolean;
  promo_types?: string[];
  purchase_uris?: PurchaseUris;
  rarity: string;
  related_uris: RelatedUris;
  released_at: string;
  reprint: boolean;
  scryfall_set_uri: string;
  set_name: string;
  set_search_uri: string;
  set_type: string;
  set_uri: string;
  set: string;
  set_id: string;
  story_spotlight: boolean;
  textless: boolean;
  variation: boolean;
  variation_of?: string;
  security_stamp?: string;
  watermark?: string;
  preview?: Preview;
}

export interface RelatedCard {
  id: string;
  object: string;
  component: string;
  name: string;
  type_line: string;
  uri: string;
}

export interface CardFace {
  artist?: string;
  artist_id?: string;
  cmc?: number;
  color_indicator?: string[];
  colors?: string[];
  flavor_text?: string;
  illustration_id?: string;
  image_uris?: ImageUris;
  loyalty?: string;
  mana_cost: string;
  name: string;
  object: string;
  oracle_id?: string;
  oracle_text?: string;
  power?: string;
  printed_name?: string;
  printed_text?: string;
  printed_type_line?: string;
  toughness?: string;
  type_line: string;
  watermark?: string;
}

export interface Legalities {
  standard: string;
  future: string;
  historic: string;
  gladiator: string;
  pioneer: string;
  explorer: string;
  modern: string;
  legacy: string;
  pauper: string;
  vintage: string;
  penny: string;
  commander: string;
  oathbreaker: string;
  brawl: string;
  historicbrawl: string;
  alchemy: string;
  paupercommander: string;
  duel: string;
  oldschool: string;
  premodern: string;
  predh: string;
}

export interface ImageUris {
  small: string;
  normal: string;
  large: string;
  png: string;
  art_crop: string;
  border_crop: string;
}

export interface Prices {
  usd?: string;
  usd_foil?: string;
  usd_etched?: string;
  eur?: string;
  eur_foil?: string;
  eur_etched?: string;
  tix?: string;
}

export interface PurchaseUris {
  tcgplayer?: string;
  cardmarket?: string;
  cardhoarder?: string;
}

export interface RelatedUris {
  gatherer?: string;
  tcgplayer_infinite_articles?: string;
  tcgplayer_infinite_decks?: string;
  edhrec?: string;
  mtgtop8?: string;
}

export interface Preview {
  previewed_at?: string;
  source_uri?: string;
  source?: string;
}
