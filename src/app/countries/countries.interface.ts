export interface CountryFlag {
  url: string;
  alt?: string;
}

export interface Country {
  name: string;
  flag: CountryFlag;
  population: number;
}
