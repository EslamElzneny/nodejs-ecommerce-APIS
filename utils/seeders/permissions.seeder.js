import { _EventEmitter } from "../../config/eventEmitter.js";
import { Permission } from "../../models/Permission.model.js";
import { CRUD_ARR } from "../enums/CRUD.enum.js";

class PermissionsSeeder {
    constructor(){}

    call = () => {

        _EventEmitter.on('db_connect',async (model_names) => {
            let docs = [];
            model_names.forEach((model_name)=>{
                CRUD_ARR.forEach((operation)=>{
                    docs.push({name:`${operation}_${model_name}`});
                })
            });

            let docs_count = await Permission.countDocuments();
            
            if(docs_count == docs.length){ return }
            
            await Permission.insertMany(docs);
            
        });
    }

}

export const _PermissionsSeeder = new PermissionsSeeder; 
