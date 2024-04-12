
import { LogOut } from "@/app/actions";
import { Button } from "@nextui-org/react";
// import { signOut } from "auth";

export   function SignOut() {
 return (
  <>
  <button onClick={async () => {await LogOut()}}>LogOut</button>
  </>
 //  <form 
 //  action={LogOut}
 //  >
 //   <Button color="warning" type="submit">Log Out</Button>

 // </form>

 )
}