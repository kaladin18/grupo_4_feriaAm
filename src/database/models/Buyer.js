module.exports = function (sequelize, dataTypes) {
  let alias = "Buyer";
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
  };

  let config = {
    tableName: "buyers",
    timestamps: false,
  };

  const Buyer = sequelize.define(alias, cols, config);

  Buyer.associate = function (models) {
    Buyer.hasMany(models.Cart, {
      foreignKey: "buyer_id",
      as: "cart",
    });
  };
  return Buyer;
};
