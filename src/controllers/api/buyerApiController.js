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
                        detail: "api/buyers/"+ element.id
                    })
                });
                let response = {
                    meta: {
                        status: 200,
                        count: buyers.length,
                        url: "api/buyers"
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
                        url: "api/genres/details/" + genre.id
                    },
                    buyer: {
                        name: buyer.name,
                        last_name: buyer.last_name,
                        email: buyer.email,
                        birthday: buyer.birthday,
                        image: "/images/users/" + buyer.image,
                        created_at: buyer.created_at,
                        updated_at: buyer.updated_at

                    }
                };
                res.json(response);
            });
    }

}

