import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const { setUser } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async () => {
		if (!email || !password) return;
		setLoading(true);
		setError("");
		try {
			const data = await register(email, password);
			setUser(data.user);
			navigate("/");
		} catch {
			setError("Email already in use or invalid data");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 flex items-center justify-center">
			<div className="bg-white rounded-xl shadow p-8 w-full max-w-md flex flex-col gap-4">
				<h1 className="text-2xl font-bold text-gray-800">Register</h1>
				{error && <p className="text-red-500 text-sm">{error}</p>}
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
				/>
				<div className="relative">
					<input
						type={showPassword ? "text" : "password"}
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
					/>
					<button
						type="button"
						onClick={() => setShowPassword((prev) => !prev)}
						className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
						aria-label={showPassword ? "Hide password" : "Show password"}
					>
						{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
					</button>
				</div>
				<button
					onClick={handleSubmit}
					disabled={loading}
					className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2 text-sm font-medium disabled:opacity-50"
				>
					{loading ? "Registering..." : "Register"}
				</button>
				<p className="text-sm text-gray-500 text-center">
					Already have an account?{" "}
					<Link to="/login" className="text-blue-500 hover:underline">
						Login
					</Link>
				</p>
			</div>
		</div>
	);
}
