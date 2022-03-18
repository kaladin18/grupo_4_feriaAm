module.exports = {
    main: function(req, res) {
        res.render("users/admin", { title: 'Página admin' });
    },
    create: function(req, res) {
        res.render("products/productCreate", { title: "Subir nuevo producto" });
    }
}
