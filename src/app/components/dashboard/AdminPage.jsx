"use client";
import React, { useState } from "react";

export default function AdminPage() {
  const [data, setData] = useState({
    title: "",
    price: "",
    offer: "",
    amets: "",
    description: "",
    image: null,
  });

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // handle file upload
  const handleFileChange = (e) => {
    setData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  // form submit
  const handleSubmit = async(e) => {
    e.preventDefault();
     const formData = new FormData();
  formData.append("title", data.title);
  formData.append("price", data.price);
  formData.append("offer", data.offer);
  formData.append("amets", data.amets);
  formData.append("description", data.description);
  formData.append("image", data.image);
//console.log("Form Data:", `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin`);
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin`, {
      method: "POST",
      body: formData,
    });
    const result = await response.json();
    if(result.message){
        alert(result.message)
    }else{
        alert("Error adding product")
    }
    setData({
        title: "",
        price: "",
        offer: "",
        amets: "",
        description: "",
        image: null,
      });
    
  } catch (error) {
    console.log("Error submitting form:", error.message);
  }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3>Admin Form</h3>

      <form onSubmit={handleSubmit}>
        <div><input
          type="text"
          name="title"
          placeholder="Title"
          value={data.title}
          onChange={handleChange}
        /></div>
        <br />

        <div><input
          type="number"
          name="price"
          placeholder="Price"
          value={data.price}
          onChange={handleChange}
        /></div>
        <br />

        <div><input
          type="text"
          name="offer"
          placeholder="Offer"
          value={data.offer}
          onChange={handleChange}
        /></div>
        <br />

       <div> <input
          type="text"
          name="amets"
          placeholder="Amenities"
          value={data.amets}
          onChange={handleChange}
        /></div>
        <br />

        <div><textarea
          name="description"
          placeholder="Description"
          value={data.description}
          onChange={handleChange}
        ></textarea></div>
        <br />

        <div><input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        /></div>
        <br />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}
