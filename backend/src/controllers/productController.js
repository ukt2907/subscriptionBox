import productModel from "../models/ProductModel.js";
import { createProductservice, updateProductService } from "../services/productServices.js";

export const createProduct = async (req,res)=>{
    const userId = req.user.id
    try {
        const {name, description, price,category} = req.body;
        const image = req.file ? req.file.path :null;
        if (!image) {
            return res.status(400).json({ message: "Image is required" });
          }

        const product = await createProductservice({userId, name, image,description, price, category})
        return res.status(201).json({
            product, message:"Product created successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "error creating product",error: error.message})
    }
}

export const editProduct = async (req, res) => {
    const productId = req.params.id;

    try {
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "not found" });
        }

        const updatedData = {
            name: req.body.name || product.name,
            description: req.body.description || product.description,
            price: req.body.price || product.price,
            category: req.body.category || product.category,
            image: req.file ? req.file.path : product.image // Keep the old image if no new image is uploaded
        };


        const updatedProduct = await updateProductService({ productId, updatedData });
        if (!updatedProduct) {
            return res.status(500).json({ message: "Failed to update product" });
        }

        return res.status(200).json({ message: "successfully edited", updatedProduct });

    } catch (error) {
        return res.status(500).json({ message: "Error editing Product",error: error.message });
    }
};

export const getAllProducts = async (req,res) =>{
    
    try {
        const products = await productModel.find();
        return res.status(200).json(products);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const userProducts = async (req,res)=>{
    const userId = req.user.id;
    try {
        const product = await productModel.find({userId})
        console.log(product);
        if(!product || product.length === 0){
          return res.status(404).json({message: "no product found"})
        }
        res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({
         message:"error getting products"
        })
    }
}

export const deleteProduct = async (req,res)=>{
    const productId = req.params.id;
    try {   
        const deletedProduct = await productModel.findByIdAndDelete(productId);
        if(!deletedProduct){
            return res.status(404).json({message:"not found"})
        }
    
        return res.status(200).json({message:"successfully deleted"}) 
    } catch (error) {
        return res.status(500).json({error: error.message})
    }

}   
