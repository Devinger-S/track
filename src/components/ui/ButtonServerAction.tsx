'use client'
import { ComponentPropsWithoutRef } from "react";
import { Button } from "./button";


type Props = ComponentPropsWithoutRef<'button'> & {
 onClick?: () => Promise<void> | void
}

 export const ButtonServerAction:React.FC<Props> = ({onClick,...props}) => {
 return (
  
  <Button onClick={async () => {
   if (onClick) await onClick();
  }
  }>{props.children}</Button>
   
  
 )
}

