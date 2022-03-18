const path = require("path");
const express = require("express");
const app = express();
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(methodOverride("_method"));

//Requerir archivos de ruteo
let indexRoutes = require("./routes/index.routes");
let registerRoutes = require("./routes/users/register.routes");
let loginRoutes = require("./routes/users/login.routes");
let productsRoutes = require("./routes/products/products.routes")
let adminRoutes = require("./routes/users/admin.routes");

//RUta de archivos estáticos
app.use(express.static(path.resolve(__dirname,"../public")));

app.listen(3000, () => console.log("servidor corriendo en puerto 3000"));

//Ruteo


app.use("/register", registerRoutes);
app.use("/login", loginRoutes);
app.use("/products", productsRoutes)
app.use("/", indexRoutes);
app.use("/admin", adminRoutes);


