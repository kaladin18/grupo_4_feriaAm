module.exports = function (sequelize, dataTypes) {
  let alias = "Cart";
  let cols = {
    id: {
      type: dataTypes.INTEGER(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    buyer_id: dataTypes.INTEGER(10),
  };
  let config = {
    tableName: "cart",
    timestamps: false,
  };

  const Cart = sequelize.define(alias, cols, config);

  Cart.associate = (models) => {
    Cart.belongsTo(models.Buyer, {
      foreignKey: "buyer_id",
      as: "buyer",
    });
    Cart.belongsToMany(models.Product, {
      as: "productsInCart",
      through: "cart_product",
      foreignKey: "cart_id",
      otherKey: "product_id",
    });
  };

  return Cart;
};
