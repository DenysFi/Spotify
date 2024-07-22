import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import Loader from "@/components/ui/loader/loader";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, currentUser } = useAuth();

  return (
    <Loader isLoading={isLoading}>
      {currentUser ? children : <Navigate to={"/auth/login"} replace />}
    </Loader>
  );
};
