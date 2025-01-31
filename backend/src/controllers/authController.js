import { createUser, loginUserServices } from "../services/userServices.js";
export const registerUser = async (req,res)=>{
    try {
        const {email,password,username,role} = req.body;

        const user = await createUser({
            email,
            password,
            username,
            role
        }) 
        res.status(201).json(user);
    } catch (error) {
        console.log('error registring',error);
        res.status(500).json({
            message: "Error in creating user",
            error: error.message 
        })
    }
}

export const loginUser = async (req,res)=>{

    try {
        const {email,password} = req.body;

        const user = await loginUserServices({
            email,password
        })
    
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(401).json({
            message: "invalid credentials"
        })
    }

}