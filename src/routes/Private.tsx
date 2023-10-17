import { ReactNode, useState, useEffect } from "react";
import { auth } from "../services/firebaseConnection";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";

interface PrivateProps {
  children: ReactNode
}

export function Private(props:PrivateProps){
  const [loading, setLoading] = useState(true);
  const [signed, setSigned] = useState(false);

  useEffect(()=>{
    setTimeout(()=>{
      const unsub = onAuthStateChanged(auth, (user)=>{
        if(user){
          const userData = {
            uid: user?.uid,
            email: user?.email
          }
  
          localStorage.setItem("@reactLinks", JSON.stringify(userData));
          setLoading(false);
          setSigned(true);
        }else{
          setLoading(false);
          setSigned(false);
          console.log("error");
        }
      })

      return () => {
        unsub();
      }
    }, 1000)

  }, [])

  if(loading){
    return <p className="text-white">Carregando...</p>
  }

  if(!signed){
    return <Navigate to="/login" />
  }

  return (
    <>
      {
        props.children
      }
    </>
  )

}

