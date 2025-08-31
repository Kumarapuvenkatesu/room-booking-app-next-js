const { default: mongoose, set } = require("mongoose");
const Schema=mongoose.Schema

const productSchema=new Schema({
     title: {
        type:String,
    },
    price: {
        type: Number,
        required: true,
    },
    offer: {
        type: String,
    },
    amets: {
        type: [String],
        default: ["AC","Free Wi-Fi","TV","Mini Bar","Room Service","breakfast"],
        set:function(amets){
           const defaultAmets=["AC","Free Wi-Fi","TV","Mini Bar","Room Service","breakfast"];
           if(typeof amets==="string"){
            const ametsArray=amets.split(",").map(item=>item.trim());
            const uniqueAmets=[...new Set([...defaultAmets,...ametsArray])];
            return uniqueAmets;
           }
        }
    },
    description:{
        type: String,
    },
    image:{
        type: String,
        required: true,
    }
})
const ProductModel=mongoose.models.productdbs||mongoose.model("productdbs",productSchema)

export default ProductModel