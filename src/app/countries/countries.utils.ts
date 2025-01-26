import {Country} from './countries.interface';

export const convertCountryApiToCountry = (country: any): Country => {
  return {
    name: country.name.common,
    flag: {
      url: country.flags.svg,
      alt: country.flags.alt,
    },
    population: country.population
  }
}
