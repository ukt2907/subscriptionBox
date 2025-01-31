import userModel from '../models/userModel.js'

export const createUser = async ({email,password,username,role})=>{
    if(!email || !password || !username){
        throw new Error('All fields are required');
    }

    const ifUserAlreadyExist = await userModel.findOne({
        email
    })

    if(ifUserAlreadyExist){
        throw new Error('User Already exists')
    }

    const user = await userModel.create({
        email,
        password,
        username,
        role
    })



    const token = user.generateToken();
    const objUser = user.toObject();
    delete objUser.password

    return {user:objUser, token}
    
}

export const loginUserServices = async ({email,password})=>{
    if(!email || !password){
        throw new Error("all fields are required")
    }

    const User = await userModel.findOne({email})
    if(!User){
        throw new Error("invalid credentials")
    }

    const isValidPassword = await User.comparePassword(password);
    if(!isValidPassword){
        throw new Error ("invalid password or password")
    }

    const token = User.generateToken();
    const objUser = User.toObject();
    delete objUser.password;

    return {User: objUser, token}


}