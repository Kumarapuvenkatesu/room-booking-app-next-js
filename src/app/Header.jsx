'use client'
import Link from "next/link";
import style from "./page.module.css";
import { signOut,useSession } from "next-auth/react";
import HomeIcon from "@mui/icons-material/Home"; // ✅ Best Home Icon from MUI
import { auth } from "@/auth";

export default function Header() {
  const { data: session } = useSession();
  const userId = session?.user?.id; 
  console.log("header",userId)
  return (
    <header className={style.header}>
      <div className={style.row}>
        {/* Logo + Home */}
        <div className={style.logo}>
          <Link href={"/"}>
            <span className={style.homeLink}>
              <HomeIcon fontSize="large" className={style.icon} />
              <h1>Bookins</h1>
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav>
          <ul className={style.navList}>
            
            <li>
              <Link href={`components/dashboard/${userId}`}>Booking Details</Link>
            </li>
          </ul>
        </nav>

        {/* Logout */}
        <button
          className={style.logoutBtn}
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          Logout
        </button>
      </div>
    </header>
  );
}
