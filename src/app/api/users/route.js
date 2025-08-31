import { DBconnection } from "@/app/utils/config/db";
import UserModel from "@/app/utils/config/modules/user";
import { NextResponse } from "next/server";

export async function GET(){
    await DBconnection();
    try {
        const usersCollection=await UserModel.find({});
        console.log("user details",usersCollection);
        return NextResponse.json({message:"Users fetched successfully",usersCollection},{status:200})
    } catch (error) {
        console.log("Error fetching users:",error.message);
        return NextResponse.json({message:"Error fetching users",error:error.message},{status:500})
    }
}