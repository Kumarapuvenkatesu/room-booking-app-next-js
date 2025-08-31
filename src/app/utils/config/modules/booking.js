const { default: mongoose } = require("mongoose");

const bookingSchema=new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    startDate:{
        type:String,
        required :true,
    },
    endDate:{
        type:String,
        required :true,
    },
    offer:{
        type:String,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userdbs',
    }
})
const BookingModel=mongoose.models.bookingdbs||mongoose.model("bookingdbs",bookingSchema)

module.exports=BookingModel