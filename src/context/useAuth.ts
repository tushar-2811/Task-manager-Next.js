'use client';
import Cookies from "js-cookie";
import { create } from "zustand";


interface userStore {
    isAuth : boolean;
    setAuth : () => void;
    removeAuth : () => void;
}



const useAuth = create<userStore>((set) => ({
    isAuth :  !!Cookies.get('authToken'),
    setAuth : () => set({isAuth : true}),
    removeAuth : () => set({isAuth : false})
}))

export default useAuth ;