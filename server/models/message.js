import mongoose,{Schema, model, Types} from "mongoose";
import {tr} from "@faker-js/faker";

const schema = new Schema({
    sender:{
        type:Types.ObjectId,
        ref:'User',
        required:true
    },
    chat:{
        type:Types.ObjectId,
        ref:'Chat',
        required:true
    },
    content:String,
    attachment:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ]


},{
    timestamps:true
})


// why are we using this models.Message || model('Message',schema)
// instead of just model('Message',schema)
// Answer: Because we are using the models object to store the models that we have created.
// If we create a model with the same name twice, it will throw an error.
// So, we are checking if the model is already created or not.
// If it is created, then we are using the already created model.
// If it is not created, then we are creating a new model.
// This is a good practice to avoid errors.
// This is the same as we are doing with the User model in the user.js file.
export const Message = mongoose.models.Message || model('Message',schema)