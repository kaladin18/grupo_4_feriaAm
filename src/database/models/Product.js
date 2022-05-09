module.exports = function (sequelize, dataTypes) {
  let alias = "Product";
  let cols = {
    id: {
      type: dataTypes.INTEGER(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: dataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: dataTypes.STRING(255),
      allowNull: false,
    },
    price: {
      type: dataTypes.DECIMAL(8, 2),
      allowNull: false,
    },

    discount: {
      type: dataTypes.INTEGER,
      defaultValue: null,
    },
    seller_id: {
      type: dataTypes.INTEGER(10).UNSIGNED
    },
    category_id: {
      type: dataTypes.INTEGER(10).UNSIGNED
    },
    image: {
      type: dataTypes.STRING(150),
      allowNull: false,
    },
  };

  let config = {
    tableName: "products",
    timestamps: false,
  };

  const Product = sequelize.define(alias, cols, config);

  Product.associate = (models) => {
    Product.belongsTo(models.Category, {
      foreignKey: "category_id",
      as: "categoria",
      onDelete: "CASCADE"
    });
    Product.belongsTo(models.Seller, {
      foreignKey: "seller_id",
      as: "vendedor",
      onDelete: "CASCADE"
    });
    Product.belongsToMany(models.Cart, {
      as: "cartForProduct",
      through: "cart_product",
      foreignKey: "product_id",
      otherKey: "cart_id",
    });
  };

  return Product;
};
