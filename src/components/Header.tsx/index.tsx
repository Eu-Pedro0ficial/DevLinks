import { signOut } from "firebase/auth";
import { auth } from "../../services/firebaseConnection";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";

export function Header(){

  async function handleLogout(){
    await signOut(auth)
  }

  return (
    <header className="w-full max-w-2xl px-1 mt-4">
      <nav className="flex items-center justify-between w-full h-12 px-3 bg-white rounded-md">
        <div className="flex gap-4 font-medium">
          <Link to="/" children="Home" />
          <Link to="/admin" children="Links" />
          <Link to="/admin/social" children="Redes sociais" />
        </div>
        <button onClick={handleLogout}>
          <BiLogOut className="text-2xl text-red-500" />
        </button>
      </nav>
    </header>
  )

}

