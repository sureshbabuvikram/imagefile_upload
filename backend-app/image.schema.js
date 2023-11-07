import mongoose from "mongoose";

const imgSchema= mongoose.Schema({
   image:String
})

const Image= mongoose.model('ImageDetails',imgSchema)

export default Image;