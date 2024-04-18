
import { LogIn } from "@/app/actions";
import { Button } from "@nextui-org/react";

export  function SignInButton() {
 return (
  <>
  <Button  color='success'onClick={async () => await LogIn()}>LogIn</Button>
  </>
 //  <form 
 //  action={LogIn}
 //  >
 //   <Button color="primary" type="submit">Log In</Button>

 // </form>

 )
}