import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import clearFormData from "../stepper/services/clearFormData";

export default function useClearFormData() {
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      clearFormData();
      navigate(".", { replace: true });
    };
  }, [navigate]);
}
