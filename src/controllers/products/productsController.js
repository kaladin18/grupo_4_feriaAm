const fs = require("fs");
const path = require("path");

let listaProductos = JSON.parse(fs.readFileSync (path.join(__dirname, "../../data/products.json"), "utf-8"));

//Busca un producto específico en la lista pasando ID como parametro
let findProduct = (ID) => {
    let resultadoBusqueda = null;
    listaProductos.forEach(function(item, index){
       listaProductos[index].id == ID ? resultadoBusqueda = listaProductos[index] : " ";
    })
    return resultadoBusqueda;
}



let escribirJSON = (array) => {
    let formJSON = JSON.stringify(array);
    fs.writeFileSync(path.join(__dirname, "../../data/products.json"), formJSON);
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
    editView: function(req, res) {
        let data = findProduct(req.params.id);
        res.render("products/productEdit", { title: "Edición de producto", data: data});
    },
    editPUT: function (req, res) {
        let editedProduct = req.body;
        let productToEdit = findProduct(req.body.productID);
        productToEdit.name = editedProduct.productName; 
        productToEdit.description = editedProduct.productDescription; 
        productToEdit.type = editedProduct.productState; 
        productToEdit.category = editedProduct.productCategory; 
        productToEdit.size = editedProduct.productSize;
        productToEdit.color = editedProduct.productColor;
        productToEdit.price = editedProduct.productPrice; 

        listaProductos[(req.body.productID)-1] = productToEdit;

        escribirJSON(listaProductos);
        
        res.redirect("/products/"+ req.body.productID);
        
    },
    detail: function(req, res) {
        let data = findProduct(req.params.id);
        res.render("products/productDetail", { title: "Detalle de producto", data: data, lista: data.size});
    }
}

