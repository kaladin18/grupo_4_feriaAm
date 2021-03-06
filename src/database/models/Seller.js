module.exports = function (sequelize, dataTypes) {
  let alias = "Seller";
  let cols = {
    id: {
      type: dataTypes.INTEGER(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: dataTypes.STRING(20),
      allowNull: false,
    },
    last_name: {
      type: dataTypes.STRING(30),
      allowNull: false,
    },
    email: {
      type: dataTypes.STRING(40),
      allowNull: false,
    },

    image: {
      type: dataTypes.STRING(150),
      allowNull: false,
    },
    birthday: {
      type: dataTypes.DATEONLY,
      allowNull: false,
    },
    password: {
      type: dataTypes.STRING(255),
      allowNull: false,
    },
    created_at: {
      type: "TIMESTAMP",
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
    
  };

  let config = {
    tableName: "sellers",
    timestamps: false,
  };

  const Seller = sequelize.define(alias, cols, config);

  Seller.associate = function (models) {
    Seller.hasMany(models.Product, {
      foreignKey: "seller_id",
      as: "productos",
    });
  };
  return Seller;
};
