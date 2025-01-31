import dotenv from 'dotenv'
import Stripe from 'stripe'
dotenv.config();

const _config = {
    MONGO_URI:process.env.MONGO_URI,
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    stripe: new Stripe(process.env.STRIPE_SECRET_KEY)
}

const config = Object.freeze(_config)


export default config;

