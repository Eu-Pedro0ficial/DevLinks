import { FormEvent, useEffect, useState } from "react";
import { Header } from "../../components/Header.tsx";
import { Input } from "../../components/Input/index.tsx";

import { FiTrash } from "react-icons/fi"
import { db } from "../../services/firebaseConnection.ts";
import { addDoc, collection, onSnapshot, query, orderBy, doc, deleteDoc } from "firebase/firestore";

interface LinkProps {
  id: string,
  name: string,
  url: string,
  bg: string,
  color: string,
}

export function Admin(){
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [textColor, setTextoColor] = useState("#f1f1f1");
  const [background, setBackground] = useState("#121212");
  const [links, setLinks] = useState<LinkProps[]>([]);

  useEffect(()=>{
    const linksRef = collection(db, "links");
    const queryRef = query(linksRef, orderBy("created", "asc"));

    const unsub = onSnapshot(queryRef, (snapshot)=>{
      const lista = [] as LinkProps[];

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          bg: doc.data().bg,
          color: doc.data().color
        })
      })

      setLinks(lista);
    })


    return () => {
      unsub();
    }


  }, [])
  
  async function handleRegister(e:FormEvent){
    e.preventDefault();

    if(name === "" || url === ""){
      alert("Preencha todos os campos!")
      return
    }

    addDoc(collection(db, "links"), {
      name: name,
      url: url,
      bg: background,
      color: textColor,
      created: new Date()
    })
    .then(()=>{
      alert("Cadastrado com sucesso!");
      setName("");
      setUrl("");
    }).catch((error) =>{
      console.error("!!!ERRO AO CADASTRAR NO BANCO!!!" + error);
    })

  }

  async function handleDelete(id: string){
    const docRef = doc(db, "links", id);
    await deleteDoc(docRef);
  }

  return (
   <div className="flex flex-col items-center min-h-screen px-2 flex-column pb-7">
    <Header />

    <form onSubmit={handleRegister} className="flex flex-col w-full max-w-xl mt-8 mb-3">

      <label className="mt-2 mb-2 font-medium text-white">
        Nome do Link
      </label>
      <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Digite o nome do link..." />

      <label className="mt-2 mb-2 font-medium text-white">
        Url do Link
      </label>
      <Input value={url} type="url" onChange={(e) => setUrl(e.target.value)} placeholder="Digite a url..." />

      <section className="flex gap-5 my-4">
        <div className="flex gap-2">
          <label className="mt-2 mb-2 font-medium text-white">
            Cor do link
          </label>
          <input type="color" value={textColor} onChange={(e) => setTextoColor(e.target.value)} />
        </div>
        <div className="flex gap-2">
          <label className="mt-2 mb-2 font-medium text-white">
            Fundo do link
          </label>
          <input type="color" value={background} onChange={(e) => setBackground(e.target.value)} />
        </div>
      </section>

      {
        name !== '' && (
          <div className="flex flex-col items-center justify-start p-1 border rounded-md mb-7 border-gray-100/25">
            <label className="mt-2 mb-3 font-medium text-white">Veja como está ficando:</label>
            <article 
              className="flex flex-col items-center justify-between w-11/12 max-w-lg px-1 py-3 rounded bg-zinc-900"
              style={{ marginBottom: 8, marginTop: 8, backgroundColor: background }}
            >
              <p className="font-medium" style={{ color: textColor }}>{name}</p>
            </article>
          </div>
        )
      }
      
      <button type="submit" className="flex items-center justify-center gap-4 text-white bg-blue-600 rounded-md h-9 fot-medium mb-7">
        Cadastrar
      </button>
    </form>

    <h2 className="mb-4 text-2xl font-bold text-white">Meus links</h2>
    {
      links.map((item) => (
        <article 
          key={item.id}
          className="flex items-center justify-between w-11/12 max-w-xl px-2 py-3 mb-2 rounded select-none"
          style={{ background: item.bg, color: item.color }}
        >
          <p>
            {
              item.name
            }
          </p>
          <div>
            <button onClick={ () => handleDelete(item.id)} className="p-1 border border-dashed rounded bg-zinc-900">
              <FiTrash  size={18} color="#fff"/>
            </button>
          </div>
        </article>
      ))
    }
    
   </div>
  )

}