import { User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { firebaseAuth } from '../auth/firebase';

const useAuth = (action: (user?: User | null) => void = () => {}) => {
    const [checkingUser, setCheckingUser] = useState<boolean>(true);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        firebaseAuth.onAuthStateChanged((user) => {
            setCheckingUser(false);
            setUser(user);
            action(user);
        });
    }, [action]);

    return { checkingUser, user };
};

export default useAuth;
