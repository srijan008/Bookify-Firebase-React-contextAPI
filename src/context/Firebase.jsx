import { createContext, useContext } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyBx1bZoa_CoaOwSokyiSHwdAo1MYzoA7y4",
    authDomain: "app-d7115.firebaseapp.com",
    databaseURL: "https://app-d7115-default-rtdb.firebaseio.com",
    projectId: "app-d7115",
    storageBucket: "app-d7115.appspot.com",
    messagingSenderId: "986117504400",
    appId: "1:986117504400:web:3068457ab4ce60a8c10715"
  };
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp)
const database = getDatabase(firebaseApp)

const FirebaseContext = createContext(null)
export const useFirebase = () => useContext(FirebaseContext)

export const FirebaseProvider = (props) => {
    const signupUserWithEmailAndPassword = (email, password) => {
        return createUserWithEmailAndPassword(firebaseAuth, email, password)
    }

    const putData = (key, data) => set(ref(database, key), data);

    return(
        <FirebaseContext.Provider value={{signupUserWithEmailAndPassword, putData}}>
            {props.children}
        </FirebaseContext.Provider>
    )
}


