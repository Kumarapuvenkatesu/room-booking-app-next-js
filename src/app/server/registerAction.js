"use server";

import { NextResponse } from "next/server";
import { DBconnection } from "../utils/config/db";
import UserModel from "../utils/config/modules/user";

export default async function registerAction(registerDetails) {
  await DBconnection();
  console.log(registerDetails);
  try {
    const userExists = await UserModel.findOne({
      email: registerDetails.email,
    });
    if (userExists) {
      return { message: "User already exists" };
    }
    // const bycryptPassword= await bcrypt.hash(registerDetails.password,10)
    await UserModel.create(registerDetails);
    return { message: "User registered successfully" };
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
