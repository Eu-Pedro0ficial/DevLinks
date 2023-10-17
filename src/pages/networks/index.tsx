import { FormEvent, useEffect, useState } from "react";
import { Header } from "../../components/Header.tsx";
import { Input } from "../../components/Input";

import { db } from "../../services/firebaseConnection";
import { setDoc, doc, getDoc } from "firebase/firestore";

export function Networks(){

  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [youtube, setYoutube] = useState("");

  useEffect(()=>{

    function loadLinks(){
      const docRef = doc(db, "social", "link");
      getDoc(docRef)
      .then((snapshot)=>{
        if(snapshot.data() !== undefined){
          setFacebook(snapshot.data()?.facebook);
          setInstagram(snapshot.data()?.instagram);
          setYoutube(snapshot.data()?.youtube);
        }
      })
    }

    loadLinks();

  }, [])

  function handleSubmit(e:FormEvent){
    e.preventDefault();

    setDoc(doc(db, "social", "link"), {
      facebook: facebook,
      instagram: instagram,
      youtube: youtube
    }).then(()=>{
      alert("Cadastrado com sucesso!");
    }).catch((error) =>{
      console.error("!!!ERRO AO SALVAR!!!" + error);
    })

  }

  return (
    <div className="flex flex-col items-center min-h-screen px-2 pb-7">
      <Header />

      <h1 className="mt-8 mb-4 text-2xl font-medium text-white">Minhas redes sociais</h1>
      <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-xl">

        <label className="my-2 font-medium text-white" htmlFor="">Link do faceboob</label>
        <Input type="url" placeholder="Digite a url do facebook..." value={facebook} onChange={(e) => setFacebook(e.target.value)} />

        <label className="my-2 font-medium text-white" htmlFor="">Link do instagram</label>
        <Input type="url" placeholder="Digite a url do instagram..." value={instagram} onChange={(e) => setInstagram(e.target.value)} />

        <label className="my-2 font-medium text-white" htmlFor="">Link do youtube</label>
        <Input type="url" placeholder="Digite a url do youtube..." value={youtube} onChange={(e) => setYoutube(e.target.value)} />

        <button type="submit" className="flex items-center justify-center text-white bg-blue-600 rounded-md h-9 mb-7">
          Salvar links
        </button>
      </form>
    </div>
  )

}