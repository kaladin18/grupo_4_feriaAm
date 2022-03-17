module.exports = {
    main: function(req, res) {
        res.render("users/register");
    },
    success: function (req, res) {
        res.render("users/registroexitoso");
    } 
        
    
}
