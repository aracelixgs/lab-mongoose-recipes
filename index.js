const mongoose = require('mongoose');
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data.json');

// const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';
const MONGODB_URI = 'mongodb://127.0.0.1/recipe-app';

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
      title: "Frangoyo",
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
    return Recipe.find({title: "Frangoyo"})
    .select({title: 1})
  })
  .then((res) => {
    console.log(res)
    return Recipe.insertMany(data)
  })
  .then((res) => {
    console.log("Se han añadido todas las recetas")
    return Recipe.find()
    .select({title: 1})
  })
  .then((res) => {
    console.log(res)
    return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100}, {new: true})
  })
  .then((res) => {
    console.log("duración actualizada" + res)
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
