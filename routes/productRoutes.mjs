import express from "express";
import multer from "multer";
import os from "os";
import {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
} from "../queries/productQuery.mjs";

const router = express.Router();

// route list
router.get("/products", getProducts);
router.get("/products/:id", getProductById);
router.post(
  "/products",
  multer({ dest: os.tmpdir() }).single("image"),
  createProduct
);
router.delete("/products/:id", deleteProduct);

export default router;
