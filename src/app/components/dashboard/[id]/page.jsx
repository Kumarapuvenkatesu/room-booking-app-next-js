"use client"
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import styles from "./bookingPage.module.css";
import Image from "next/image"; // ✅ default import

export default function Bookingdetails() {
  const [bookings, setBookings] = useState([]);
  const params = useParams();
  const id = params.id;

  const fetchBookings = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${id}`);
      const result = await response.json();
      setBookings(result.eachUser.Bookings || []);
    } catch (error) {
      console.log("Error fetching bookings:", error);
    }
  }

  useEffect(() => {
    if (id) fetchBookings();
  }, [id]);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Your Bookings</h1>

      <div className={styles.grid}>
        {bookings && bookings.length > 0 ? (
          bookings.map((booking) => (
            <div key={booking._id} className={styles.card}>
              <Image
                src={booking.image}
                alt={booking.title}
                width={400}  // ✅ next/image requires width & height
                height={200} // ✅ next/image requires width & height
                className={styles.cardImage}
              />
              <div className={styles.cardContent}>
                <h2 className={styles.cardTitle}>{booking.title}</h2>
                <p className={styles.cardDates}>
                  {booking.startDate} - {booking.endDate}
                </p>
                <p className={styles.cardPrice}>
                  Price: <span>${booking.price}</span>
                </p>
                {booking.offer && (
                  <p className={styles.cardOffer}>{booking.offer} Off</p>
                )}
                <button className={styles.cardButton}>
                  Delete Data
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noBookings}>No bookings found.</p>
        )}
      </div>
    </div>
  );
}
