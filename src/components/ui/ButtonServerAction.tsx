'use client'
import { Button } from "@nextui-org/react";
import { ComponentPropsWithoutRef } from "react";


type Props = ComponentPropsWithoutRef<'button'> & {
 onClick?: () => Promise<void> | void
}

 export const ButtonServerAction:React.FC<Props> = ({onClick,...props}) => {
 return (
  
  <button onClick={async () => {
   if (onClick) await onClick();
  }
  }>{props.children}</button>
   
  
 )
}

