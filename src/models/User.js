const fs = require("fs");
const path = require("path");

const User = {
  fileName: "../data/users.json",

  getData: function () {
    return JSON.parse(
      fs.readFileSync(path.join(__dirname, this.fileName), "utf-8")
    );
  },

  writeData: function (data) {
    fs.writeFileSync(
      path.join(__dirname, this.fileName),
      JSON.stringify(data, null, " ")
    );
  },

  generateId: function () {
    let allUsers = this.findAll();
    let lastUser = allUsers.pop();
    if (lastUser) {
      return lastUser.id + 1;
    }
    return 1;
  },

  findAll: function () {
    return this.getData();
  },

  create: function (userData) {
    let allUsers = this.getData();

    let newUser = {
      id: this.generateId(),
      ...userData,
    };
    console.log(allUsers);
    allUsers.push(newUser);
    this.writeData(allUsers);
  },

  findByPK: function (id) {
    let allUsers = this.findAll();
    let userFound = allUsers.find((user) => user.id == id);
    return userFound;
  },

  findByField: function (field, text) {
    let allUsers = this.findAll();
    let userFound = allUsers.find((user) => user[field] == text);
    return userFound;
  },
  createCart: function (userData) {
    let registeredUser = this.findByField("email", userData.email);

    let buyerId = [{ sellerId: registeredUser.id }];

    let dataCart = JSON.stringify(buyerId);
    fs.writeFile(
      path.join(__dirname, "../data/carts/cart" + registeredUser.id),
      dataCart,
      function (err, result) {
        if (err) console.log("error", err);
      }
    );
  },
};
module.exports = User;
