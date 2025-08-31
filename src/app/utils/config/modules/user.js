import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type:String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password:{
    type : String,
    required: true
  },
  role:{
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  status:{
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  Bookings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'bookingdbs',
  }]
});

const UserModel = mongoose.models?.userdbs || mongoose.model("userdbs", userSchema);


export default UserModel;
