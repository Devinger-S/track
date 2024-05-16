'use client'
import { ComponentPropsWithoutRef } from "react";
import { Button, ButtonProps } from "./button";


type Props = ButtonProps & {
 onClick?: () => Promise<void> | void
 // variant?: ButtonProps
}

 export const ButtonServerAction:React.FC<Props> = ({className,variant,onClick,...props}) => {
 return (
  
  <Button className={className} variant={variant} onClick={async () => {
   if (onClick) await onClick();
  }
  }>{props.children}</Button>
   
  
 )
}

