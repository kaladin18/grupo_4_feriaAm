const path = require("path");
const express = require("express");
const session = require("express-session");
const cookies = require("cookie-parser");
const loggedUserMiddleware = require("./middlewares/loggedUserMiddleware");


const app = express();



const methodOverride = require("method-override");

//MIDDLEWARES
app.use(
  session({
    secret: "Shh, It's a secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(cookies());

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
const indexRoutes = require("./routes/index.routes");
const usersRoutes = require("./routes/users/users.routes");
const productsRoutes = require("./routes/products/products.routes");
const cookieParser = require("cookie-parser");

//Requerir ruteo de apis
const buyerApiRoutes = require("./routes/api/buyerApi.routes");
const sellerApiRoutes = require("./routes/api/sellerApi.routes");
const productApiRoutes = require("./routes/api/productApi.routes");

//RUta de archivos estáticos
app.use(express.static(path.resolve(__dirname, "../public")));

app.listen(4001, () => console.log("servidor corriendo en puerto 4001"));

//Ruteo

app.use("/users", usersRoutes);
app.use("/products", productsRoutes);
app.use("/", indexRoutes);

//API
app.use("/api/sellers", sellerApiRoutes);
app.use("/api/buyers", buyerApiRoutes);
app.use("/api/products", productApiRoutes);