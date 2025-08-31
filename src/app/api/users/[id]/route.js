import { DBconnection } from "@/app/utils/config/db";
import UserModel from "@/app/utils/config/modules/user";
import BookingModel from "@/app/utils/config/modules/booking";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  await DBconnection();
  const { id } =  params;
  try {
    const eachUser = await UserModel.findById( id ).populate("Bookings");
    if (!eachUser) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Product fetched successfully", eachUser },
      { status: 200 }
    );
  } catch (error) {
    console.log("");
    return NextResponse.json(
      { message: "Error fetching eachUser", error: error.message },
      { status: 500 }
    );
  }
}
