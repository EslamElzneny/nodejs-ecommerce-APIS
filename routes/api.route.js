import express from 'express';
import { authRouter } from './auth.route.js';
import { userRouter } from './users.route.js';
import { httpResp } from '../utils/httpResponse.js';
import { categoryRouter } from './categories.route.js';
import { productRouter } from './products.route.js';
import { wishlistRouter } from './wishlist.route.js';
import { addressRouter } from './addresses.route.js';
export const apiRouter = express.Router();

apiRouter.use('/',authRouter);
apiRouter.use('/users',userRouter);
apiRouter.use('/categories',categoryRouter);
apiRouter.use('/products',productRouter);
apiRouter.use('/wishlist',wishlistRouter);
apiRouter.use('/addresses',addressRouter);

// global middleware for not found api
apiRouter.all('*',(req,res)=>{
    res.status(404).json(httpResp.error('This resource is not available!'));
});

apiRouter.use((err,req,res,next)=>{
    res.status(err.statusCode).json(httpResp.general(err.message,err.statusText,err.statusCode));
})
