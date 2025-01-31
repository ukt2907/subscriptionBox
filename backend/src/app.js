import express from 'express'
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors'
import userRoutes from '../src/routes/userRoutes.js'
// import subRoutes from '../src/routes/subRoutes.js'
import productRoute from '../src/routes/productRoute.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors());


app.use('/user', userRoutes)
// app.use('/subscription', subRoutes)
app.use('/product', productRoute)

export default app