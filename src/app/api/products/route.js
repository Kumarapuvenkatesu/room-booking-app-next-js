import { DBconnection } from "@/app/utils/config/db";
import ProductModel from "@/app/utils/config/modules/Product";
import { NextResponse } from "next/server";

export  async function GET(){
    await DBconnection();
    const products=await ProductModel.find({});

    try {
        return NextResponse.json({message:"Products fetched successfully",products},{status:200})
        
    } catch (error) {
        console.log("Error fetching products:",error.message);
        return NextResponse.json({message:"Error fetching products",error:error.message},{status:500})
    }
}