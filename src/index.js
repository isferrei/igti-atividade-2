const fs = require("fs").promises;

async function init() {
  await handleFiles();
  await handleStatesMoreCities();
  await handleCitieName();
}

init();

async function handleFiles() {
  let data = await fs.readFile("./Estados.json");
  const states = JSON.parse(data);

  data = await fs.readFile("./Cidades.json");
  const cities = JSON.parse(data);

  for (state of states) {
    const stateCities = cities.filter((item) => item.Estado === state.ID);
    await fs.writeFile(
      `./States/${state.Sigla}.json`,
      JSON.stringify(stateCities)
    );
  }
}

async function handleCitiesCount(uf) {
  const data = await fs.readFile(`./States/${uf}.json`);
  const cities = JSON.parse(data);
  return cities.length;
}

async function handleStatesMoreCities() {
  let data = await fs.readFile("./Estados.json");
  const states = JSON.parse(data);

  data = await fs.readFile("./Cidades.json");
  const cities = JSON.parse(data);
  const list = [];

  for (state of states) {
    const count = await handleCitiesCount(state.Sigla);
    list.push({ uf: state.Sigla, count });
  }

  let result = list.sort((a, b) => b.count - a.count);
  let lessCities = list.sort((a, b) => a.count - b.count);

  console.log(lessCities.splice(0, 5));
}

async function handleCitieName() {
  let data = await fs.readFile("./Estados.json");
  const states = JSON.parse(data);

  data = await fs.readFile("./Cidades.json");
  const cities = JSON.parse(data);
  const list = [{}];

  for (city of cities) {
    list.push(city.Nome);
    const shortestName = list.sort((a, b) => a - b);
    let shortest = [];

    shortest.push({ shortestName });

    console.log(shortestName);
  }
}
