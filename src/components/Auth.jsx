import { auth, googleProvider, db } from "../config/firebase";
import { signInWithPopup,fetchSignInMethodsForEmail, onAuthStateChanged, getAuth } from "@firebase/auth";
import { useState, useEffect } from "react";
import { doc, collection, setDoc } from 'firebase/firestore';
import { Navigate } from "react-router-dom";


export const Auth = () => {
  const [user, setUser] = useState(null);
  const [userExists, setUserExists] = useState(false);
   
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
    });

    if (user) {
      const email = user.email;
      fetchSignInMethodsForEmail(auth, email)
        .then((methods) => {
          setUserExists(methods.length > 0);
          console.log('Usuário existe:', methods.length > 0);
          
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setUserExists(false);
      console.log('Usuario nao existe')
      
    }

    const createUser = async () => {
      if (userExists) {
        const uid = user?.uid;
        const usersRef = collection(db, 'users');
        const userDoc = doc(usersRef, uid);

        try {
          await setDoc(userDoc, {
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL
          });
          console.log('Usuário criado com sucesso!');
        } catch (error) {
          console.error(error);
        }
      }
    };

    createUser();

    return unsubscribe;
  }, [user, userExists]);

  const signInWithGoogle = async () => {
    try {
      const auth = getAuth();
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user)
    } catch (error) {
      console.error(error);
    }
  };


  if (userExists && user) {
    return <Navigate to={`/${user.uid}`} />;
  }

  return (
    <div className="flex gap-5 text-slate-200 items-center">
        <button onClick={signInWithGoogle}> Sign In With Google</button>
      <div>
    </div>
    </div>
  )

}