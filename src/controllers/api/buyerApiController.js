const db = require("../../database/models");
const sequelize = db.sequelize;
const { Op } = require("sequelize");

module.exports = {
    list: function (req, res) {
        db.Buyer.findAll()
            .then(buyers => {
                let data = [];
                buyers.forEach(element => {
                    data.push({
                        id: element.id,
                        name: element.name + " " + element.last_name,
                        email: element.email,
                        detail: "http://localhost:4001/api/buyers/"+ element.id,
                        created_at: element.created_at
                    })
                });
                let response = {
                    meta: {
                        status: 200,
                        count: buyers.length,
                        url: "http://localhost:4001/api/buyers"
                    },
                    buyers: data
                };
                res.json(response);
            })
    },
    detail: function (req, res) {
        db.Buyer.findByPk(req.params.id)
            .then(buyer => {
                let response = {
                    meta: {
                        status: 200,
                        url: "http://localhost:4001/api/genres/details/" + buyer.id
                    },
                    buyer: {
                        name: buyer.name,
                        last_name: buyer.last_name,
                        email: buyer.email,
                        birthday: buyer.birthday,
                        image: "http://localhost:4001/images/users/" + buyer.image,
                        created_at: buyer.created_at,
                        

                    }
                };
                res.json(response);
            });
    }

}

