import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {

}

export function Input(props:InputProps){

  return (
    <input className="px-2 mb-3 border-0 rounded-md outline-none h-9" {...props} />
  )

}
