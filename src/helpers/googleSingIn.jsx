import { GoogleSingInAPI } from "../api/AuthAPIs";
import { checkUserExists } from "../api/FirestoreAPIs";
import { toast } from "react-toastify";

export const googleSingIn = async () => {
  try {
    // Because the 'GoogleSingInAPI is a promise, we assing the 'await' keyword before it.
    const res = await GoogleSingInAPI();
    checkUserExists(res.user);
    toast.success("Signed In With Google!");
    localStorage.setItem("userEmail", res.user.email); // Storing the user's email in order to access it later when he posts or perform some operation.
  } catch (error) {
    toast.error("Problem with google authentication");
  }
};
