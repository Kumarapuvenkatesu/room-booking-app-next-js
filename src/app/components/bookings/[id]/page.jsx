"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Style from "./each.module.css";
import Calender from "../../calender/Calender";
import { BookingAction } from "@/app/server/bookings";
import { useDatesContext } from "@/app/(auth-routes)/context/context";
import { useRouter } from "next/navigation";

export default function EachBookingPage() {
  const { id } = useParams();
  const [bookingDetails, setBookingDetails] = useState(null);
  

  const { latestDates } = useDatesContext();
  const router=useRouter()

  const fetchBookingDetails = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`
      );
      const result = await response.json();
      if (result.eachProduct) {
        setBookingDetails(result.eachProduct);
      }
    } catch (error) {
      console.log("Error fetching booking details:", error.message || error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchBookingDetails();
    }
  }, [id]);

  const hotelBooked = async () => {
    if (latestDates.startDate === null || latestDates.endDate === null) {
      alert("Must and should be need dates");
      return;
    }
    try {
      const response = await BookingAction({ bookingDetails, latestDates });
      if(response.message==="successfully booked room"){
        alert("successfully booked room")
        router.push('/')
      }
    } catch (error) {
      console.log("error at ", error);
    }
  };

  return (
    <div className={Style.container}>
      <Calender />
      <div className={Style.header}>
        <h1>Booking Details</h1>
        <p>Find all the information about your selected room here.</p>
      </div>

      <div className={Style.details}>
        {bookingDetails ? (
          <>
            <Image
              src={bookingDetails.image}
              alt={bookingDetails.title}
              width={900}
              height={500}
              className={Style.image}
            />

            <div className={Style.info}>
              <h2>{bookingDetails.title}</h2>
              <p>{bookingDetails.description}</p>
              <p>
                <strong>Amenities:</strong>{" "}
                {bookingDetails.amets.map((item) => (
                  <span key={item} className={Style.amenity}>
                    <span>*</span>
                    {item} &nbsp;
                  </span>
                ))}
              </p>
              <p className={Style.price}>Price: ₨ {bookingDetails.price}</p>
              <button className={Style.bookBtn} onClick={() => hotelBooked()}>
                Book Now
              </button>
            </div>
          </>
        ) : (
          <h2>
            <center>Loading booking details...</center>
          </h2>
        )}
      </div>
    </div>
  );
}
