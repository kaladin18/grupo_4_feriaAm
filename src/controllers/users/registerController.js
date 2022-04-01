const { validationResult } = require("express-validator");

module.exports = {
    main: function(req, res) {
        res.render("users/register", { title: 'Registrate gratis' });
    },
    register: function(req, res) {
        let errors = validationResult(req)
        let oldData = req.body;
        if (!errors.isEmpty()){
            console.log(req.body);
            return res.render("users/register", ({title: "Error en la registracion", errors: errors.mapped(), oldData: oldData}));
        }
        res.redirect("register/success");
    },
    registerSuccess: function (req, res) {
        res.render("users/registerSuccess", { title: 'Bienvenido!' });
       
    } 
        
    
}
