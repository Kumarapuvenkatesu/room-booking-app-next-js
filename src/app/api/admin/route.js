"use server";
import { DBconnection } from "@/app/utils/config/db";
import { NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import ProductModel from "@/app/utils/config/modules/Product";

export async function POST(request) {
  try {
    await DBconnection();
    const data = await request.formData();

    const title = data.get("title").toUpperCase();
    const price = data.get("price");
    const offer = data.get("offer");
    const amets = data.get("amets");
    const description = data.get("description");
    const image = data.get("image");

    if (!image) {
      return NextResponse.json(
        { message: "No image uploaded" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await image.arrayBuffer());

    const imagesDir = path.join(process.cwd(), "public", "images");
    await mkdir(imagesDir, { recursive: true });

    const imagePath = path.join(imagesDir, image.name);
    await writeFile(imagePath, buffer);

    const newProduct = new ProductModel({
      title,
      price,
      offer,
      amets,
      description,
      image: `/images/${image.name}`,
    });
    await newProduct.save();

    console.log("Image saved successfully at", imagePath);

    return NextResponse.json(
      { message: "Product added successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving image:", error);
    return NextResponse.json(
      { message: "Error saving image", error: error.message },
      { status: 500 }
    );
  }
}
