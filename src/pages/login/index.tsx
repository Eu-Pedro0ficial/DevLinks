import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/Input";
import { FormEvent, useState } from "react";
import { auth } from "../../services/firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";

export function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e:FormEvent){
    e.preventDefault();

    if(email === '' || password === ''){
      alert("Preencha todos os campos");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
    .then(()=>{
      console.log("Logado com sucesso");
      navigate('/admin', { replace: true });

    }).catch((error) => {
      console.error("Erro:", error);
    })

  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <Link to="/" children={<h1 className="text-5xl font-bold text-white mt-11 mb-7">Dev<span className="text-transparent bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text">Link</span></h1>} />

      <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-xl px-1">
        <Input placeholder="Digite seu email..." type="email" value={email} onChange={ (e) => setEmail(e.target.value)} />
        <Input placeholder="Digite sua senha..." type="password" value={password} onChange={ (e) => setPassword(e.target.value)} />
        <button type="submit" className="text-lg font-medium text-white bg-blue-600 border-0 rounded h-9">Acessar</button>
      </form>

    </div>
  )

}