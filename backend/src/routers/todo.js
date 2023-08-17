const express = require("express");

//importamos el fichero con los datos que necesita nuestro Router
const { todos } = require("../data/index");
const {
  middlewarePassValidation,
} = require("../data/middleware/middlewarePassValidation");

/*

Un Router de express es como un switch case de Javascript. Simplemente redirige las peticiones hacia la ruta correcta, si esta existe.

En una aplicacion de express podemos tener tantos Routers como queramos/sean necesarios. Lo habitual cuando se implementa una API REST
es tener un Router por cada "recurso" de la api. Si imaginamos una aplicacion que tiene 3 recursos (User, Todo, Category), deberiamos
tener 3 routers diferentes: userRouter, todoRouter y categoryRouter.
*/

const todoRouter = express.Router();

todoRouter.get("/todo", (req, res) => {
  res.status(200).json(todos);
  //devolver todos los "todos" que hay en el array con formato JSON.
});

todoRouter.post("/todo", (req, res) => {
  const newTodo = req.body;
  todos.push({ ...newTodo, id: todos.length });

  res.status(201).json(todos);
  //crear un nuevo objeto con estructura {id, text, fecha, done} con los datos que vienen en el BODY de la Request y meterlos dentro de el array.
  //el nuevo objeto debe tener como id un numero mas que el numero actual de elementos guardados en el array.
});

// todoRouter.post('/todo', middlewarePassValidation, (req, res) => {
//   const body = req.body;

//   const todos = {
//     id: req.params.id,
//     text: body.text,
//     fecha: body.fecha,
//     done: body.done,
//     password: body.pass
//   };

//   res.status(200).json(todos);

// });

/*
En este endpoint, el path contiene una variable llamada id. La syntaxis que utiliza express para estos casos es el simbolo :

Una variable en un path, significa que express recoge el valor que va justo después de /todo/ y lo guarda en una variable dentro del objeto "req"
con el mismo nombre que hemos utilizado en el path.

Ejemplo:

Si con Insomnia o Postman hicisemos una peticion GET a la ruta /todo/12, está será dirigida directamente hasta este endpoint.


*/
todoRouter.get("/todo/:id", (req, res) => {
  const id = req.params.id;
  const foundTodo = todos.find((todos) => todos.id === Number(id));

  if (!foundTodo) {
    res.status(404).send("Sorry, your to do doesn't exist");
  } else {
    res.status(200).json(foundTodo);
  }

  //recogemos el valor de la variable del path llamada "id" y lo transformarlo a un numero (todos nuestros ids son numericos).
  //cualquier valor que recogemos de req.params será siempre un String. Por eso lo debemos convertir a numero.

  //buscar dentro del array "todos" aquel elemento que coincide con el id recibido por parametro de la ruta en la request.
  //si existe, devolverlo como formato JSON y codigo de status 200.

  //Si no hemos econtrado un TODO o no nos han pasado un id en la ruta, devolvemos un 404.
});

// MISSING '/todo/:id' PATCH

todoRouter.patch("/todo/:id", (req, res) => {
  const id = req.params.id;
  const { text, fecha, done } = req.body;
  const todo = todos.find((todo) => todo.id === Number(id));

  if (todo) {
    todo.text = text ? text : todo.text;
    todo.fecha = fecha ? fecha : todo.fecha;
    todo.done = done !== undefined ? done : todo.done;

    res.status(201).json(todo);
  } else {
    res
      .status(404)
      .send("Sorry, your to do item doesn't match with existing ones");
  }
  //recogemos el valor de la variable del path llamada "id" y lo transformarlo a un numero (todos nuestros ids son numericos).
  //cualquier valor que recogemos de req.params será siempre un String. Por eso lo debemos convertir a numero.

  //buscar dentro del array "todos" aquel elemento que coincide con el id recibido por parametro de la ruta en la request.
  //si existe, lo ACTUALIZAMOS con los datos del BODY de la Request y lo devolvemos como formato JSON y codigo de status 200.

  //Si no hemos econtrado un TODO o no nos han pasado un id en la ruta, devolvemos un 404.
});

// MISSING '/todo/:id' DELETE

todoRouter.delete("/todo/:id", (req, res) => {
  const id = req.params.id;
  const todo = todos.find((todo) => todo.id === Number(id));

  if (todo) {
    todos.splice(todo.id, 1);
    res.status(200).send("Your to do has been deleted");
  } else {
    res.status(404).send("Sorry, your to do doesn't exist");
  }
  //recogemos el valor de la variable del path llamada "id" y lo transformarlo a un numero (todos nuestros ids son numericos).
  //cualquier valor que recogemos de req.params será siempre un String. Por eso lo debemos convertir a numero.

  //buscar dentro del array "todos" aquel elemento que coincide con el id recibido por parametro de la ruta en la request.
  //si existe, lo BORRAMOS y devolvemos un codigo de status 204.

  //Si no hemos econtrado un TODO o no nos han pasado un id en la ruta, devolvemos un 404.
});

//exportamos el router para poder 'usarlo' en nuestra app.
module.exports = todoRouter;
