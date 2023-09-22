export const shuffle = (array: any[]):Array<any> => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export const isArrayCheck = (arr: any):boolean => Array.isArray(arr) && arr.length > 0;

export const handleOptionShuffling = (data: any):Record<string, any>=> {
  // Set a random country object from the response in the state
  const randomIndex = Math.floor(Math.random() * data.length);
  const randomCountry = data[randomIndex];
  // You can set the random country object in the state or use it as needed.
  const shuffledCities = [...data.map((dat: any) => dat.capital)].sort(
    () => Math.random() - 0.5
  );
  const optionsAB = shuffledCities.slice(0, 2); // Select the first two shuffled cities as options A and B
  let options=shuffle([...optionsAB, randomCountry?.capital])
  return {
    selectedCountry: randomCountry,
    options: options
  };
};
