import { 
    getAuth, 
    signInWithPopup, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword 
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { Firestore, getDoc, getFirestore, query, where } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import { addDoc, collection, getDocs, doc } from 'firebase/firestore';


const FirebaseContext = createContext(null);

export const useFirebase = () => {
    return useContext(FirebaseContext);
}

const firebaseConfig = {
    apiKey: "AIzaSyAwcj5esOGmEu0NLhtzFCk-R-kTI5zAdRg",
    authDomain: "bookify-5ec68.firebaseapp.com",
    projectId: "bookify-5ec68",
    storageBucket: "bookify-5ec68.appspot.com",
    messagingSenderId: "125107676658",
    appId: "1:125107676658:web:86ba83d7826a4fb752b76b"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
const fireStore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);


export const FirebaseProvider = (props) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user ? user : null);
        });

        return () => unsubscribe();
    }, []);

    const signinUser = async (email, password) => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            console.log("Signin Successful", result);
            alert("Signin Successful");
        } catch (error) {
            console.error("Signin Error", error.message);
            alert("Try again with different email");
        }
    }

    const loginUser = async (email, password) => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            console.log("Signup Successful", result);
            alert("Signup Successful");
        } catch (error) {
            console.error("Signup Error", error.message);
            alert("Invalid Credential");
        }
    }

    const googleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            console.log("Google Signin Successful", result);
        } catch (error) {
            console.error("Google Signin Error", error);
            alert("Google Signin Failed");
        }
    }

    const handleCreateNewListing = async(name, isbn, price, cover) => {
        const imageRef = ref(storage, `uploads/images/${Date.now()}-${cover.name}`);
        const uploadResult = await uploadBytes(imageRef,cover)
        return await addDoc(collection(fireStore,'books'),{
            name,
            isbn,
            price,
            imageURL:uploadResult.ref.fullPath,
            userID: user.uid,
            userEmail: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL
        })
    }
    const listAllBooks = async () => {
            return getDocs(collection(fireStore, "books"));
    }               
    const getImageURL = (path) => {
        return getDownloadURL(ref(storage, path));
    }
    const isLoggedIn = user ? true : false;
    const getBookById = async(id) => {
        const docRef = doc(fireStore, 'books', id); 
        const docSnap = await getDoc(docRef);    
        return docSnap;
    }   
    const placeOrder = async(bookId,qty) => {
        const collectionRef = collection(fireStore, "books", bookId, "orders")
        const result = await addDoc(collectionRef,{
            userID: user.uid,
            userEmail: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            qty
        })
        return result
        
    }
    const fetchMyOrders = async() => {
        const collectionref = collection(fireStore, "books");
        const q = query(collectionref, where("userID", "==" ,user.uid))
        const result = await getDoc(q);
        return result;
    }

    return (
        <FirebaseContext.Provider value={{ getImageURL,fetchMyOrders,placeOrder,getBookById, isLoggedIn,listAllBooks, signinUser, loginUser, googleLogin, handleCreateNewListing }}>
            {props.children}
        </FirebaseContext.Provider>
    );
}
