import axios from "axios";

export const nextServer = axios.create({
    baseURL: "/api",       // 🔥 обовʼязково
    withCredentials: true, // 🔥 обовʼязково
});