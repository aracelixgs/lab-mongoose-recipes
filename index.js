const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then((res) => {
    return Recipe.create({
      tittle: "Frangoyo",
      level: 'Amateur Chef',
      ingredients: [
        "leche",
        "huevo",
        "Almendras",
      ],
      cuisine: "Canaria",
      dishType: "dessert",
      imagen: "https://i.ytimg.com/vi/89Kr74LOq4A/maxresdefault.jpg",
      duration: 220,
      creator: "Un Canario",
    })
  })
  .then( (res) => {
    console.log("Se ha creado la receta")
    return Recipe.find({tittle: "Frangoyo"})
    .select({tittle: 1})
  })
  .then((res) => {
    console.log(res)
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
