import productModel from "../models/ProductModel.js"
import ProductModel from "../models/ProductModel.js"
export const createProductservice = async ({userId, name, image, description, price, category})=>{
    if(!name || !description || !price || !category ){
        throw new Error ("All fields are required")
    }
    const product = await ProductModel.create({
        userId,
        name,
        description,
        price,
        category,
        image
    })

    return product;
}

export const updateProductService = async ({productId, updatedData})=>{
    try {
        const updatedProduct = await productModel.findByIdAndUpdate(productId, updatedData, {new: true});
        return updatedProduct;
    } catch (error) {
        throw new Error ("Error updating product" + error.message);
    }
}