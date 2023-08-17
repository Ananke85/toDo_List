const express = require('express');
const app = express();
const todoRouter = require('./routers/todo');
const port = 3000
const cors = require('cors');
app.use(cors());


//Le decimos a nuestra app, que vamos recibir peticiones donde el Body contiene texto en formato JSON.
app.use(express.json());

//Le decimos a nuestra app, que "utilize" el router de todos. Esto es equivalente a haber definido todos nuestros endpoints directamente sobre el objeto app como vimos en clase.
app.use(todoRouter);


//a partir de este punto y gracias a la linea escrita mas arriba, si llega alguna peticion que empieze por /todo, está se redirige hacia todoRouter.

app.listen(port, () => {
    console.log("Server is up and running in port 3000");
});