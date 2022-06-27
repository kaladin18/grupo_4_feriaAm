const express = require("express");
const productsController = require("../../controllers/products/productsController");
const authMiddleware = require("../../middlewares/authMiddleware");
const { productImageUpload } = require("../../middlewares/imageUpload");
const productSellerAuthMiddleware = require("../../middlewares/productSellerAuthMiddleware");
const isSellerMiddleware = require("../../middlewares/isSellerMiddleware");
const router = express.Router();

router.get("/", authMiddleware, productsController.list);
router.get("/search", productsController.search);
router.get("/db/:id", productsController.detail);
router.get("/search/:type", productsController.type)
//creacion y edicion de productos
router.get("/create", isSellerMiddleware, productsController.create);
router.post("/create", productImageUpload.single("productImage"), productsController.createProcess)
router.get(
  "/db/:id/edit",
  authMiddleware,
  productSellerAuthMiddleware,
  productsController.edit
);
router.put("/db/:id", productsController.editProcess);
router.delete("/db/:id", productsController.deleteProcess);


//Carrito
// router.get("/cart", authMiddleware, productsController.cart);
// router.post("/db/:id", authMiddleware, productsController.addToCart);

module.exports = router;
