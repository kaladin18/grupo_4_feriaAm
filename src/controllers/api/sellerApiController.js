const db = require("../../database/models");
const sequelize = db.sequelize;
const { Op } = require("sequelize");

module.exports = {
    list: function (req, res) {
        db.Seller.findAll()
            .then(sellers => {
                let data = [];
                sellers.forEach(element => {
                    data.push({
                        id: element.id,
                        name: element.name + " " + element.last_name,
                        email: element.email,
                        detail: "http://localhost:4001/api/sellers/"+ element.id,
                        created_at: element.created_at
                    })
                });
                let response = {
                    meta: {
                        status: 200,
                        count: sellers.length,
                        url: "http://localhost:4001/api/sellers"
                    },
                    sellers: data
                };
                res.json(response);
            })
    },
    detail: function (req, res) {
        db.Seller.findByPk(req.params.id)
            .then(seller => {
                let response = {
                    meta: {
                        status: 200,
                        url: "api/sellers/details/" + seller.id
                    },
                    seller: {
                        name: seller.name,
                        last_name: seller.last_name,
                        email: seller.email,
                        birthday: seller.birthday,
                        image: "http://localhost:4001/images/users/" + seller.image,
                        created_at: seller.created_at,
                       

                    }
                };
                res.json(response);
            });
    }

}

