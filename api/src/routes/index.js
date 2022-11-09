const { Router } = require('express');
const { API_KEY } = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const { Dog, Temperament } = require("../db");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async () => {
  const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
  const apiInfo = await apiUrl.data.map(el => {
    return {
      name: el.name,
      id: el.id,
      img: el.image.url,
      weight: el.weight.metric,
      height: el.height.metric,
      life_span: el.life_span,
      temperament: el.temperament
    };
  });
  return apiInfo;
};

const getDbInfo = async () => {
  return await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    }
  })
};

const getAllDogs = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoTotal = apiInfo.concat(dbInfo);
  return infoTotal;
};

router.get("/dogs", async (req, res) => {
  const name = req.query.name;
  let totalDogs = await getAllDogs();
  if (name) {
    let razasFiltradas = totalDogs.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
    if (razasFiltradas.length) {
      res.status(200).send(razasFiltradas);
    }
    else {
      res.status(200).send([]);
    }
  }
  else {
    res.status(200).send(totalDogs);
  }
});

router.get(`/dogs/:idRaza`, async (req, res) => {
  try {
  const idRaza = req.params.idRaza;
  let totalDogs = await getAllDogs();
  let razaFilter = await totalDogs.filter(el => el.id == idRaza);
  if (razaFilter.length) {
    res.status(200).send(razaFilter);
  }
  else {
    res.status(404).send("No se encontro el id de la raza buscada")
  }
  } catch (err) {
    res.status(404).send(err);
  }
  
  
})

router.get("/temperaments", async (req, res) => {
  const temperamentsApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
  const temperaments = temperamentsApi.data.map(el => el.temperament); // me traigo los temperamentos, los tengo en un array
  
  let alltemperaments = [];
  for (let i = 0; i < temperaments.length; i++){ // spliteo los temperamentos, para separarlos en distintos arrays
    if (temperaments[i]) {
      let cortado = temperaments[i].split(", ");
      alltemperaments = alltemperaments.concat(cortado);
    }
  }
  const uniqueTemp = [...new Set(alltemperaments)];  // saco los temperamentos repetidos, ya que hay razas que repiten distintos temperamentos
  console.log(uniqueTemp);
  uniqueTemp.forEach(el => {  //creo en la base de datos los distintos tipos de temperamentos
    Temperament.findOrCreate({
      where: {name: el}
    })
  })
  const totalTemps = await Temperament.findAll();

  res.send(totalTemps.sort((a, b) => {
    if (a.name < b.name) {
      return -1
    }
    else return 1
  }));
});

router.post("/dogs", async (req, res) => {
  let {
    name,
    height,
    weight,
    life_span,
    img,
    createdinDb,
    temperament
  } = req.body;


  let dogCreated = await Dog.create({
    name,
    height,
    weight,
    life_span,
    img,
    createdinDb
  });
  

  let temperamentDb = await Temperament.findAll({ where: { name: temperament }});
  dogCreated.addTemperaments(temperamentDb);
  res.send("Perro creado con exito");
});




module.exports = router;
