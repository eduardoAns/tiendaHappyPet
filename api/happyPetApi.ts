import axios from "axios";

const happyPetApi = axios.create({
    baseURL:'https://happypet.herokuapp.com/api',
    headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
    }
})


export default happyPetApi;