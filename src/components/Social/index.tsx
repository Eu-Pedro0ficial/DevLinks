import { ReactNode } from "react"

interface IProps {
  url?: string,
  children: ReactNode,
}

export function Social(props:IProps){

  return (
    <a href={props.url} rel="noopener noreferrer" target="_blank">{props.children}</a>
  )

}
