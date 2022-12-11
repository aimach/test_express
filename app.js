require('dotenv').config()

const express = require("express");
const { hashPassword } = require("./auth.js");
const { validateMovie, validateUser } = require('./validator.js')

const app = express();

app.use(express.json());

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");
const usersHandlers = require('./usersHandlers')
const loginHandlers = require('./loginHandlers')

// handle movies
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.post('/api/movies', validateMovie, movieHandlers.postMovie);
app.put('/api/movies/:id', validateMovie, movieHandlers.updateMovie);
app.delete('/api/movies/:id', movieHandlers.deleteMovie);

//handle users
app.get('/api/users', usersHandlers.getUsers);
app.get('/api/users/:id', usersHandlers.getUsersById);
app.post('/api/users', validateUser, hashPassword, usersHandlers.postUser);
app.put('/api/users/:id', validateUser, usersHandlers.updateUser);
app.delete('/api/users/:id', usersHandlers.deleteUser);

//handle login
app.post('/api/login', loginHandlers.getLogin)


app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
