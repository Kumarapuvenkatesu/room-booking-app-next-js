'use client'
import React,{useState,useEffect} from "react";
import Image from "next/image";
import Style from "./bookings.module.css"
import Link from "next/link";
export default function AllRooms(){
    const [rooms,setRooms]=useState([]);

    const fetchedData=async()=>{
        try {
            const response=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`);
            const result=await response.json();
            if(result.products){
                setRooms(result.products);
            }
            
        } catch (error) {
            console.log("Error fetching rooms:",error.message||error);
        }
    }
    useEffect(()=>{
        fetchedData();
    },[])

    return(
        <div className={Style.container}>
  <h1 className={Style.title}>All Rooms</h1>
  <p className={Style.subtitle}>List of all available rooms will be displayed here.</p>

  <div className={Style.roomsGrid}>
    {rooms && rooms.map((room) => (
      <div key={room._id} className={Style.card}>
        <Image src={room.image} alt={room.title} width={400} height={250} className={Style.allImages} priority={false}/>

        <div className={Style.cardContent}>
          <h2>{room.title}</h2>
          <p>{room.amets}</p>
          <p>{room.description.slice(0,10)}....</p>
          <p className={Style.price}>Price: ₨ {room.price}</p>
          <Link href={`components/bookings/${room._id}`} passHref>
          <button className={Style.detailsBtn}>Details</button>
          </Link>
        </div>
      </div>
    ))}
  </div>
</div>

    )
}