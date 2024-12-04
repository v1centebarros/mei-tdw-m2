export interface CardSymbol {
  object: string;
  symbol: string;
  loose_variant?: string;
  english: string;
  transposable: boolean;
  represents_mana: boolean;
  mana_value?: number;
  appears_in_mana_costs: boolean;
  colors: string[];
  hybrid: boolean;
  phyrexian: boolean;
  gatherer_alternates?: string[];
  svg_uri?: string;
}
