
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase";

const ALLOWED_DOMAIN = "hbplus.fit";

export async function loginWithGoogle() {
  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: "select_account",
  });

  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  const email = user.email?.trim().toLowerCase();

  if (
    !email ||
    !user.emailVerified ||
    email.split("@").length !== 2 ||
    email.split("@")[1] !== ALLOWED_DOMAIN
  ) {
    await signOut(auth);

    throw new Error(
      "Access restricted. Please login using your official domain email."
    );
  }

  return user;
}

export { signOut };
