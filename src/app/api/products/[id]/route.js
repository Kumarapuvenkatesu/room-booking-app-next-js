import { DBconnection } from "@/app/utils/config/db";
import ProductModel from "@/app/utils/config/modules/Product";
import { NextResponse } from "next/server";

export async function GET(request,  context ) {
    await DBconnection();
    const { id } = await context.params;
    try {
        const eachProduct=await ProductModel.findById(id);
        if(!eachProduct){
            return NextResponse.json({message:"Product not found"},{status:404})
        }
        return NextResponse.json({message:"Product fetched successfully",eachProduct},{status:200})
    } catch (error) {
        console.log("Error fetching product by ID:", error.message);
        return NextResponse.json({message:"Error fetching product",error:error.message},{status:500})
    }
}