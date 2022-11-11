import mongoose from "mongoose"


export interface TodoDocument extends mongoose.Document {
    user: string;
    title:string;
    status:boolean;
    createdAt: Date;
    updatedAt: Date;
  }
const todoItemSchema=new mongoose.Schema({
    
        user:{
          type:mongoose.Schema.Types.ObjectId,
          required:true,
          ref:"Folder",
          
        },
    title:{
        type:String,
        require:[true,"Please add title"],
        min:3,
        max:15
        

    },
     status:{
        type:Boolean,
        
        default:false
    },
   
   
},{
    timestamps:true
}
)

const Todo=mongoose.model<TodoDocument>("Todo",todoItemSchema)
export default Todo