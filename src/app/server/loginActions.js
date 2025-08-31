"use server";
import { signIn, auth } from "@/auth";

export const loginAction = async (loginDetails) => {
  try {
    const response = await signIn("credentials", {
      email: loginDetails.email,
      password: loginDetails.password,
      redirect: false,
    });

    if (response.error || !response) {
      throw new Error(response.error || "Login failed");
    }

    // ✅ After login, fetch session (contains user.id now)
    const session = await auth();

    return { message: "Login successful", user: session?.user };
  } catch (error) {
    console.error("Error during login:", error);
    return { error: "Internal server error" };
  }
};
