import axios from "axios";

const happyPetApi = axios.create({
    baseURL:'/api',
    headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
    }
})


export default happyPetApi;