import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged} 
    from "firebase/auth";
import {auth, db} from '../services/firebase.jsx'
import { createContext, useContext, useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";

const AuthContext = createContext()

export function AuthContextProvider ({children}) {

    const[user, setUser] = useState({})

    useEffect(() =>{
        const unsubscribed = onAuthStateChanged(auth, (currentUser) =>{
            setUser(currentUser)
        })

        return() =>{
            unsubscribed()
        }
    },[])

    async function signUp(email, password) {
        await createUserWithEmailAndPassword(auth, email, password)
        await setDoc(doc(db, "users", email),{
            favShows: [],
        })
    }

    function logIn(email, password){
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logOut(){
        return signOut(auth)
    }

    return(
        <AuthContext.Provider value={{user, signUp, logIn, logOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export function UserAuth(){
    return useContext(AuthContext)
}