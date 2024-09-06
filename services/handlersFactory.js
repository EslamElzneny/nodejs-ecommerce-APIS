import { asyncWrapper } from "../middlewares/asyncWrapper.js";
import { _AppError } from "../utils/appError.js";
import { httpResp } from "../utils/httpResponse.js";

export class HandlersFactory {
    Model;
    modelName;
    constructor(model){
        this.Model = model;
        this.modelName = this.Model.modelName;
    }

    getAll = asyncWrapper(
        async (req,res,next) => {
            const filterObj = req.filterObj || {};
            const data = await this.Model.find(filterObj);
            res.json(httpResp.success(data));
        }
    );

    getAllByPaginate = asyncWrapper(
        async (req,res,next) => {
            const filterObj = req.filterObj || {};
            const limit = req.query.limit || 10;
            const page = req.query.page || 1;
            const skip = (page - 1) * limit;
            const total = await this.Model.countDocuments(filterObj);
            const data = await this.Model.find(filterObj).limit(limit).skip(skip);
            res.json(httpResp.paginated(data,{current_page:page,per_page:limit,total}));
        }
    );


    getOne = asyncWrapper(
        async (req,res,next)=>{
            const filterObj = req.filterObj || {};
            const data = await this.Model.findOne({_id:req.params.id,...filterObj});
            if(!data){
                const error = _AppError.create(`${this.modelName} Not Found`,404,httpStatus.FAIL)
                next(error);
            }
            return res.json(httpResp.success(data));
        }
    );

    createOne = asyncWrapper(
        async (req,res,next)=>{
            const doc = new this.Model(req.body); // init model
            await doc.save()
            return res.status(201).json(httpResp.success(doc));
        }
    );

    updateOne = asyncWrapper(
        async (req,res,next)=>{
            const doc = await this.Model.updateOne({_id:req.params.id},{$set:req.body});
            return res.status(201).json(httpResp.success(doc));
        }
    );

    deleteOne = asyncWrapper(
        async (req,res,next)=>{
            const doc = await this.Model.deleteOne({_id:req.params.id})
            return res.json(httpResp.success(doc))
        }
    );    


}
