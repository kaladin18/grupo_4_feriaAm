const db = require("../../database/models");
const sequelize = db.sequelize;
const { Op } = require("sequelize");

module.exports = {
    list: function (req,res) {
        db.Product.findAll({
            include: [{ association: "vendedor" }, { association: "categoria" }],
          }).then(products => {
            let data = [];
            let cantidadRopa = 0;
            let cantidadCalzado = 0;
            let cantidadNueva= 0;
            let cantidadUsada =0;
            products.forEach(producto => {
                if (producto.categoria.class == "clothes") {
                    cantidadRopa += 1;
                }
                if (producto.categoria.class == "shoes") {
                    cantidadCalzado += 1;
                }
                if (producto.categoria.state) {
                    cantidadNueva += 1;
                }
                if (!producto.categoria.state) {
                    cantidadUsada += 1;
                }
                
                
                data.push({
                    id: producto.id,
                    name: producto.name,
                    description: producto.description,
                    categories: producto.categoria,
                    detail: "http://localhost:3000/api/products/" + producto.id
                })
                
            });
            let response = {
                meta: {
                    status: 200,
                    count: products.length,
                    countByCategory: {
                        clothes: cantidadRopa,
                        shoes: cantidadCalzado,
                        new: cantidadNueva,
                        used: cantidadUsada
                    },
                    url: "http://localhost:3000/api/products"
                },
                products: data
            };
            res.json(response);
          });
    },
    detail: function (req,res) {
        db.Product.findByPk(req.params.id, {
            include: [{ association: "categoria" }, { association: "vendedor" }],
          }).then(producto =>{
            let response = {
                meta: {
                    status: 200,
                    url: "http://localhost:3000/api/products/"+ producto.id
                },
                product: {
                    id: producto.id,
                    name: producto.name,
                    description: producto.description,
                    price: producto.price,
                    image: "http://localhost:3000/images/users/" + producto.image,
                    created_at: producto.created_at,
                    updated_at: producto.updated_at,
                    category: producto.categoria
                }
            };
            res.json(response);
          });
    }
}