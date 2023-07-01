
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setSnack } from "../redux/features/snackbarSlice";

const dispatch = useDispatch();
const auth = getAuth();


function sendPasswordResetToEmail  (user: any)  {
    if (user === null) {
        return
      }
  
      sendPasswordResetEmail(auth, user.email)
        .then(() => {
          dispatch(setSnack({
            isShown: true,
            message: 'Password reset sent to email...'
          }))
  
        })
        .catch((e) => {
         console.log(e.message);
         
          dispatch(setSnack({
            isShown: true,
            message: e.message
          }))
        })
  
}

export { sendPasswordResetToEmail }

 



 
 
