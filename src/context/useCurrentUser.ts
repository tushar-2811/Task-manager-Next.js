import useSWR from "swr";
import axios from "axios";
import useAuth from "./useAuth";
import Cookies from 'js-cookie'

export const fetcherfxn = async(url: string) => {
    const {data} = await axios.get(url);
    Cookies.set("userId" , data?.user?.id);
    return data.user;
}

const useCurrentUser = (url:string) => {
    const {data , isLoading} = useSWR(url , fetcherfxn);
    return {
        data,
        isLoading,
    }
}

export default useCurrentUser;