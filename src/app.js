const path = require("path");
const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
//Requerir archivos de ruteo
let indexRoutes = require("./routes/index.routes");
let registerRoutes = require("./routes/users/register.routes");
let loginRoutes = require("./routes/users/login.routes");
let productCartRoutes = require("./routes/products/productCart.routes")

app.use(express.static(path.resolve(__dirname,"../public")));

app.listen(3000, () => console.log("servidor corriendo en puerto 3000"));

//Ruteo


app.use("/register", registerRoutes);
app.use("/login", loginRoutes);
app.use("/product-cart", productCartRoutes)
app.use("/", indexRoutes);


