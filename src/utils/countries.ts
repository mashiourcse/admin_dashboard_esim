export interface Country {
  iso3_code: string;
  name: string;
  flagUrl: string;
}

export const countries: Country[] = [
  {
    iso3_code: "AFG",
    name: "Afghanistan",
    flagUrl:
      "https://cdn.jsdelivr.net/npm/country-flags-svg@latest/flags/afg.svg",
  },
  {
    iso3_code: "BGD",
    name: "Bangladesh",
    flagUrl:
      "https://cdn.jsdelivr.net/npm/country-flags-svg@latest/flags/bgd.svg",
  },
  {
    iso3_code: "USA",
    name: "United States of America",
    flagUrl:
      "https://cdn.jsdelivr.net/npm/country-flags-svg@latest/flags/usa.svg",
  },
  {
    iso3_code: "SGP",
    name: "Singapore",
    flagUrl:
      "https://cdn.jsdelivr.net/npm/country-flags-svg@latest/flags/sgp.svg",
  },
  {
    iso3_code: "MYS",
    name: "Malaysia",
    flagUrl:
      "https://cdn.jsdelivr.net/npm/country-flags-svg@latest/flags/mys.svg",
  },
  {
    iso3_code: "IND",
    name: "India",
    flagUrl:
      "https://cdn.jsdelivr.net/npm/country-flags-svg@latest/flags/ind.svg",
  },
  {
    iso3_code: "GBR",
    name: "United Kingdom",
    flagUrl:
      "https://cdn.jsdelivr.net/npm/country-flags-svg@latest/flags/gbr.svg",
  },
  {
    iso3_code: "DEU",
    name: "Germany",
    flagUrl:
      "https://cdn.jsdelivr.net/npm/country-flags-svg@latest/flags/deu.svg",
  },
  {
    iso3_code: "FRA",
    name: "France",
    flagUrl:
      "https://cdn.jsdelivr.net/npm/country-flags-svg@latest/flags/fra.svg",
  },
  {
    iso3_code: "ITA",
    name: "Italy",
    flagUrl:
      "https://cdn.jsdelivr.net/npm/country-flags-svg@latest/flags/ita.svg",
  },
  {
    iso3_code: "ESP",
    name: "Spain",
    flagUrl:
      "https://cdn.jsdelivr.net/npm/country-flags-svg@latest/flags/esp.svg",
  },
  {
    iso3_code: "NLD",
    name: "Netherlands",
    flagUrl:
      "https://cdn.jsdelivr.net/npm/country-flags-svg@latest/flags/nld.svg",
  },
  {
    iso3_code: "BEL",
    name: "Belgium",
    flagUrl:
      "https://cdn.jsdelivr.net/npm/country-flags-svg@latest/flags/bel.svg",
  },
  {
    iso3_code: "CHE",
    name: "Switzerland",
    flagUrl:
      "https://cdn.jsdelivr.net/npm/country-flags-svg@latest/flags/che.svg",
  },
  {
    iso3_code: "AUT",
    name: "Austria",
    flagUrl:
      "https://cdn.jsdelivr.net/npm/country-flags-svg@latest/flags/aut.svg",
  },
  {
    iso3_code: "DNK",
    name: "Denmark",
    flagUrl:
      "https://cdn.jsdelivr.net/npm/country-flags-svg@latest/flags/dnk.svg",
  },
  {
    iso3_code: "NOR",
    name: "Norway",
    flagUrl:
      "https://cdn.jsdelivr.net/npm/country-flags-svg@latest/flags/nor.svg",
  },
  {
    iso3_code: "FIN",
    name: "Finland",
    flagUrl:
      "https://cdn.jsdelivr.net/npm/country-flags-svg@latest/flags/fin.svg",
  },
  {
    iso3_code: "ISL",
    name: "Iceland",
    flagUrl:
      "https://cdn.jsdelivr.net/npm/country-flags-svg@latest/flags/isl.svg",
  },
  {
    iso3_code: "IRL",
    name: "Ireland",
    flagUrl:
      "https://cdn.jsdelivr.net/npm/country-flags-svg@latest/flags/irl.svg",
  },
];

export function getCountryByCode(code: string) {
  return countries.find((c) => c.iso3_code === code);
}

export function getCountriesByCodes(codes: string[]) {
  return codes.map((code) => getCountryByCode(code)).filter(Boolean);
}

export function getCountriesNameByCodes(codes: string[]) {
  return codes
    .map((code) => getCountryByCode(code))
    .filter(Boolean)
    .map((c) => c!.name)
    .join(", ");
}
