import axios from "axios";
import { emitWarning } from "process";

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3000",
	withCredentials: true, // necessary to send and receive cookies
});

export const register = (email: string, password: string) =>
	api.post("/auth/register", { email, password }).then((res) => res.data);

export const login = (email: string, password: string) =>
	api.post("/auth/login", { email, password }).then((res) => res.data);

export const logout = () => api.post("/auth/logout").then((res) => res.data);

export const refresh = () => api.post("/auth/refresh").then((res) => res.data);
