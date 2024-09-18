import axios from "axios";

export const modelApi = axios.create({
    baseURL : import.meta.env.VITE_BACK_END_BASE_URL
})

