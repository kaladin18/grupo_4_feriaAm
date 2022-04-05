const fs = require('fs');
const path = require('path');

const Product = {
    fileName: "../data/products.json",

    getData: function() { 
        return JSON.parse(fs.readFileSync (path.join(__dirname, this.fileName), "utf-8"));
    },

    writeData: function(data) {
        fs.writeFileSync(path.join(__dirname, this.fileName), JSON.stringify(data, null, " "));
    },

    generateId: function ()  {
        let allProducts = this.findAll();
        let lastProduct = allProducts.pop();
        if (lastProduct) {
            return lastProduct.id +1;
        }
        return 1;
    },


    findAll: function () {
        return this.getData();
    },

    create: function (productData) {
        let allProducts = this.findAll();
        
        let newproduct = {
            id: this.generateId(),
            ...productData
        }
        console.log(allProducts);
        allProducts.push(newproduct);
        this.writeData(allProducts);
    },

    edit: function (editedProduct) {
        let listaProductos = this.findAll();
        let productToEdit = this.findByPK(editedProduct.productID);
        productToEdit.name = editedProduct.productName; 
        productToEdit.description = editedProduct.productDescription; 
        productToEdit.type = editedProduct.productState; 
        productToEdit.category = editedProduct.productCategory; 
        productToEdit.size = editedProduct.productSize;
        productToEdit.color = editedProduct.productColor;
        productToEdit.price = editedProduct.productPrice; 

        listaProductos[(editedProduct.productID)-1] = productToEdit;

        this.writeData(listaProductos);
    },

    findByPK: function (id) {
        let allProducts = this.findAll();
        let productFound = allProducts.find(product => product.id == id);
        return productFound;
    },

    findByField: function (field, text) {
        let allProducts = this.findAll();
        let productFound = allProducts.find(product => product[field] == text);
        return productFound;
    },




}


module.exports = Product;