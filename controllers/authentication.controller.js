import bcrypt from 'bcryptjs';
import { asyncWrapper } from "../middlewares/asyncWrapper.js";
import { User } from "../models/User.model.js";
import { _AppError } from "../utils/appError.js";
import { httpStatus } from "../utils/httpStatus.js";
import { httpResp } from '../utils/httpResponse.js';
import { generateJWT } from '../utils/generateJWT.js';
import { upload } from '../utils/uploadFile.js';

class Authentication {
    constructor(){}

    register = asyncWrapper(
        async (req,res,next) => {
            const { name , email , password } = req.body;

            const existUser = await User.findOne({email});

            if(existUser){
                const error = _AppError.create('User already exist',400,httpStatus.FAIL)
                return next(error);
            }

            // generate hash password
            const password_hashed = await bcrypt.hash(password,+process.env.HASH_SALT);

            let user = new User({
                name,
                email,
                password: password_hashed,
                created_at: new Date(),
            });

            // generate jwt token
            const token = await generateJWT({email,name,_id:user._id,role:user.role});
            user.token = token;

            await user.save()
            return res.status(201).json(httpResp.success(user)); 

        }
    );

    login = asyncWrapper(
        async (req,res,next) => {
            const { email , password } = req.body;
            if(!email || !password){
                const error = _AppError.create('Email and password is required.',400,httpStatus.FAIL);
                return next(error);
            }
            const user = await User.findOne({email});
            if(!user){
                const error = _AppError.create('Please check your input data.',400,httpStatus.FAIL);
                return next(error);
            }

            const matchedPassword = await bcrypt.compare(password,user.password,);

            if(!matchedPassword){
                const error = _AppError.create('Please check your input data.',400,httpStatus.FAIL);
                return next(error);
            }

            const token = await generateJWT({email,_id:user._id,name:user.name,role:user.role});
            user.token = token;

            await user.save();

            return res.json(httpResp.success(user));

        }  
    );

    _validateRegisterDataInputs = asyncWrapper(
        async (req,res,next) =>{

        }
    );

}

export const _AuthController = new Authentication;



// register = asyncWrapper(
//     async (req,res,next) => {
//         const { name , email , password } = req.body;

//         const existUser = await User.findOne({email});
        
//         console.log(req.body);
//         return
        

//         if(existUser){
//             const error = _AppError.create('User already exist',400,httpStatus.FAIL)
//             return next(error);
//         }

//         // generate hash password
//         const password_hashed = await bcrypt.hash(password,+process.env.HASH_SALT);

//         upload(
//             async (req,res,err) => {
//                 if (err) {
//                     return res.send(_AppError.create(err,400));
//                   }
  
//                   if(req.file == undefined){
//                       return res.send(_AppError.create('No file selected',400));
//                   }
  
//                   let user = new User({
//                       name,
//                       email,
//                       password: password_hashed,
//                       avatar:req.file.filename,
//                       created_at: new Date(),
//                   });
      
//                   // generate jwt token
//                   const token = await generateJWT({email,name,_id:user._id,role:user.role});
//                   user.token = token;
      
//                   await user.save()
//                   return res.status(201).json(httpResp.success(user)); 
//             }
//         );

//     }
// );
