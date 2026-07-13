import {
	createContext,
	useContext,
	useState,
	useEffect,
	type ReactNode,
} from "react";
import { logout as logoutApi, refresh } from "../api/auth";

interface AuthUser {
	id: number;
	email: string;
}

interface AuthContextType {
	user: AuthUser | null;
	setUser: (user: AuthUser | null) => void;
	logout: () => Promise<void>;
	isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<AuthUser | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		refresh()
			.then((data) => setUser(data.user))
			.catch(() => setUser(null))
			.finally(() => setIsLoading(false));
	}, []);

	const logout = async () => {
		await logoutApi();
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, setUser, logout, isLoading }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) throw new Error("useAuth must be used within AuthProvider");
	return context;
}
