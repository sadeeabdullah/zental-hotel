
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
  } from 'firebase/auth';
  import { createContext, useEffect, useState } from 'react';
  import PropTypes from 'prop-types';
import { auth } from '../config/firebase.config';
import axios from 'axios';
  
  export const AuthContext = createContext();
  const googleProvider = new GoogleAuthProvider();
  
  const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState(true);
  
    const createUser = (email, password) => {
      setIsLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
    };
  
    const login = (email, password) => {
      setIsLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
    };
  
    // const googleLogin = () => {
    //   return signInWithPopup(auth, GoogleAuthProvider);
    // };
    const googleLogin = () => {
  return signInWithPopup(auth,googleProvider)
    }
  
    const logout = () => {
      setIsLoading(true);
      return signOut(auth);
    };
  
    useEffect(() => {
      
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        const userEmail = currentUser?.email || user?.email;
        setUser(currentUser);
        const loggedUser = {email: userEmail}
        setIsLoading(false);
        // if user exist then issue a token 
        if(currentUser){
          
        axios.post('https://zenhotel-server.vercel.app/api/v1/access-token',loggedUser,{ withCredentials : true })
        .then(res  => {
          console.log('token response',res.data)})
        }
        else{
          axios.post('https://zenhotel-server.vercel.app/api/v1/logout',loggedUser,{withCredentials:true})
          .then(res =>{
            console.log(res.data)
          })
        }
        
      });
  
      return () => {
        return unsubscribe();
      };
    }, []);
    

// to parse the selected date and compare 
const parseDate = (selectedDateStr) =>{
  const parts = selectedDateStr.split('-')
  const day = parseInt(parts[0], 10);
const month = parseInt(parts[1] - 1, 10); // Months are 0-indexed
const year = parseInt(parts[2], 10);
return new Date(year, month, day);
}
    



    const values = { createUser, login, user, isLoading, logout, googleLogin,parseDate  };
  
    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
  };
  
  AuthProvider.propTypes = {
    children: PropTypes.node,
  };
  
  export default AuthProvider;
  