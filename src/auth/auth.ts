import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut as _signOut,
} from 'firebase/auth';
import { firebaseAuth } from './firebase';

export const signUp = (email: string, password: string) =>
    createUserWithEmailAndPassword(firebaseAuth, email, password);

export const signIn = (email: string, password: string) =>
    signInWithEmailAndPassword(firebaseAuth, email, password);

export const signOut = () => _signOut(firebaseAuth);
