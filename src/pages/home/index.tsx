import { Social } from "../../components/Social";
import {FaFacebook, FaInstagram, FaYoutube} from "react-icons/fa";
import { db } from "../../services/firebaseConnection";
import { getDocs, collection, orderBy, query, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

interface LinkProps {
  id: string,
  name: string,
  url: string,
  bg: string,
  color: string,
}

interface SocialLinksProps {
  facebook: string,
  instagram: string,
  youtube: string
}

export function Home(){
  const [links, setLinks] = useState<LinkProps[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLinksProps>();

  const socialItems = [
    {
      url: socialLinks?.facebook,
      children: <FaFacebook className="text-4xl text-white"/>,
      key: "1",
    },
    {
      url: socialLinks?.instagram,
      children: <FaInstagram className="text-4xl text-white" />,
      key: "2",
    },
    {
      url: socialLinks?.youtube,
      children: <FaYoutube className="text-4xl text-white" />,
      key: "3",
    }
  ]

  useEffect(()=>{

    function loadLinks(){
      const linksRef = collection(db, "links");
      const queryRef = query(linksRef, orderBy("created", "asc"));

      getDocs(queryRef)
      .then((snapshots)=>{
        const lista = [] as LinkProps[];

        snapshots.forEach((doc)=>{
          lista.push(
            {
              id: doc.id,
              name: doc.data().name,
              url: doc.data().url,
              bg: doc.data().bg,
              color: doc.data().color
            }
          )
        })

        setLinks(lista);

      })
    }

    loadLinks();

  }, []);

  useEffect(()=>{
    
    function loadSocialLinks(){
      const docRef = doc(db, "social", "link");

      getDoc(docRef)
      .then((snapshots)=>{
        if(snapshots.data() !== undefined){
          setSocialLinks({
            facebook: snapshots.data()?.facebook,
            instagram: snapshots.data()?.instagram,
            youtube: snapshots.data()?.youtube
          })
        }
      })
    }

    loadSocialLinks();

  }, [])

  return (
    <div className="flex flex-col items-center justify-center w-full py-4">
      <h1 className="mt-20 text-3xl font-bold text-white md:text-4xl">
        Sujeito Programador
      </h1>
      <span className="mt-3 mb-5 text-gray-50">
        Veja meus links ⬇️
      </span>
      <main className="flex flex-col w-11/12 max-w-xl text-center">
       {
        links.map((item)=>(
          <section key={item.id} className="w-full py-2 mb-4 transition-transform bg-white rounded-lg cursor-pointer select-none hover:scale-105" style={{ backgroundColor: item.bg }}>
            <a href={item.url}>
              <p className="text-base md:text-lg" style={{ color: item.color }}>
                {
                  item.name
                }
              </p>
            </a>
          </section>
        ))
        }
        {
          socialLinks && Object.keys(socialLinks).length > 0 && (
            <footer className="flex justify-center gap-3 my-4">
              {
                socialItems.map(items => (<Social url={items.url} children={items.children} key={items.key} />))
              }
            </footer>
          )
        }
      </main>
    </div>
  )

}
