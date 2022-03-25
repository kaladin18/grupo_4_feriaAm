const fs = require("fs");
const path = require("path");

let listaProductos = JSON.parse(fs.readFileSync (path.join(__dirname, "../../data/products.json"), "utf-8"));

//Busca un producto específico en la lista pasando ID como parametro
let findProduct = (productID) => {
    
    listaProductos.forEach(function(item, index){
       listaProductos[index].id == productID ? resultadoBusqueda = listaProductos[index] : " ";
    })
    return resultadoBusqueda;
}



module.exports = {
    list: function(req, res) {
        res.render("products/productsList", { title: 'Productos', productList: listaProductos });
    },
    cart: function(req, res) {
        res.render("products/productCart", { title: 'Tu carrito' });
    },
    create: function(req, res) {
        res.render("products/productCreate", { title: "Subir nuevo producto" });
    },
    edit: function(req, res) {
        let data = findProduct(req.params.id);
        res.render("products/productEdit", { title: "Edición de producto", data: data});
    },
    detail: function(req, res) {
        let data = findProduct(req.params.id);
        res.render("products/productDetail", { title: "Detalle de producto", data: data, lista: data.size});
    }
}

