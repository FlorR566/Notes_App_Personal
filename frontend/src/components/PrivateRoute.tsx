import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({
	children,
}: {
	children: React.ReactNode;
}) {
	const { user, isLoading } = useAuth();

	if (isLoading) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<p className="text-gray-400">Loading...</p>
			</div>
		);
	}

	if (!user) return <Navigate to="/login" replace />;

	return <>{children}</>;
}
