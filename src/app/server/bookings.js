"use server"
import { auth } from "@/auth";
import { DBconnection } from "../utils/config/db";
import UserModel from "../utils/config/modules/user";
import BookingModel from "../utils/config/modules/booking";

export async function BookingAction(data){
    try {
        const session=await auth();
        await DBconnection();
        const user =await UserModel.findOne({email:session.user.email})
        const userId= user._id.toString();
        const createBookings=await BookingModel.create({
            startDate:data.latestDates.startDate,
            endDate:data.latestDates.endDate,
            title:data.bookingDetails.title,
            image:data.bookingDetails.image,
            price:data.bookingDetails.price,
            offer:data.bookingDetails.offer
        })
        await UserModel.findByIdAndUpdate(
            userId,
            {$push:{Bookings:createBookings._id}},
            {new:true}
        )
        return {message:"successfully booked room"}
    } catch (error) {
        console.log("Error fetching products:",error.message)
    }
} 