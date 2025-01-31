import express from 'express'
import { adminMiddleware, authenticationToken } from '../middlewares/authenticationMiddleware.js';
import { createProduct, deleteProduct, editProduct, getAllProducts, userProducts } from '../controllers/productController.js';
import upload from '../config/multer.js';
const router = express.Router();

router.post('/create-product', authenticationToken, adminMiddleware, upload.single('image'),createProduct);
router.put('/edit-product/:id',authenticationToken, adminMiddleware, upload.single('image'),editProduct);
router.get('/user-products',authenticationToken, adminMiddleware,userProducts)
router.get('/products',getAllProducts)
router.get('/delete-product/:id',authenticationToken, adminMiddleware, deleteProduct)

export default router;