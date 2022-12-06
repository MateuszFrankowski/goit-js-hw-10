export const fetchCountries = country => {
  const name = country.trim();
  console.log(name);
  if (name.length === 0) return;
  return fetch(
    `https://restcountries.com/v2/name/${name}?fields=name,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};
