module.exports = function (sequelize, dataTypes) {
  let alias = "Category";
  let cols = {
    id: {
      type: dataTypes.INTEGER(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    state: {
      type: dataTypes.INTEGER(1),
      allowNull: false,
    },
    class: {
      type: dataTypes.STRING(20),
      allowNull: false,
    },
    age_group: {
      type: dataTypes.STRING(10),
      allowNull: false,
    },

    subclass: {
      type: dataTypes.STRING(15),
      defaultValue: null,
    },
    color: {
      type: dataTypes.STRING(20),
      defaultValue: null,
    },
    size: {
      type: dataTypes.STRING(10),
      defaultValue: null,
    },
    stock: {
      type: dataTypes.INTEGER(3),
      defaultValue: null,
    },
  };

  let config = {
    tableName: "category",
    timestamps: false,
  };

  const Category = sequelize.define(alias, cols, config);

  Category.associate = function (models) {
    Category.hasOne(models.Product, {
      foreignKey: "category_id",
      as: "producto",
      onDelete: "CASCADE"
    });
  };
  return Category;
};
