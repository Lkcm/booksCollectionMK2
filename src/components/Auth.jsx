import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "@firebase/auth";

export const Auth = () => {

  const logout = async () => {
    try {
    await signOut(auth)
    }catch (err){
      console.log(err)
    }
  }
  const signInWithGoogle = async () => {
    try {
    await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="flex gap-5 text-slate-200">
      <button onClick={signInWithGoogle}> Sign In With Google</button>
      <button onClick={logout}>Logout</button>
    </div>
  )
}
