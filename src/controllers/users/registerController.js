module.exports = {
    main: function(req, res) {
        res.render("users/register", { title: 'Registrate gratis' });
    },
    success: function (req, res) {
        res.render("users/registerSuccess", { title: 'Bienvenido!' });
        console.log(req.body);
    } 
        
    
}
