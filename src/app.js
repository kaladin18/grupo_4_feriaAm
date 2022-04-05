const path = require("path");
const express = require("express");
const session = require("express-session");
const app = express();
const loggedUserMiddleware = require("./middlewares/loggedUserMiddleware");

const methodOverride = require("method-override");


app.use(session({
    secret: "Shh, It's a secret",
    resave: false,
    saveUninitialized: false
}));

//Middleware para verificar si hay un usuario logueado
app.use(loggedUserMiddleware);

//para poder usar el req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//configuración del ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(methodOverride("_method"));

//Requerir archivos de ruteo
let indexRoutes = require("./routes/index.routes");
let usersRoutes = require("./routes/users/users.routes");
let productsRoutes = require("./routes/products/products.routes")




//RUta de archivos estáticos
app.use(express.static(path.resolve(__dirname,"../public")));

app.listen(3000, () => console.log("servidor corriendo en puerto 3000"));

//Ruteo


app.use("/users", usersRoutes);
app.use("/products", productsRoutes);
app.use("/", indexRoutes);


