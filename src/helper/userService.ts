import { httpAxios } from "./httphelper";

interface signInData {
    userName : string;
    password : string;
}

interface signUpData{
    name : string;
    userName : string;
    password : string;
}


export async function signIn(data: signInData) {
    const response = await httpAxios.post('/api/login' , data);
    const result = await response.data;
    return result;
}


export async function signUp(data : signUpData) {
     const response = await httpAxios.post('/api/signup' , data);
     const result = await response.data;

     return result;
}