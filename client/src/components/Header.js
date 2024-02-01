import React, { useCallback } from "react"; // Import useCallback
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  // Wrap the navigateToCreate function with useCallback
  const navigateToCreate = useCallback(() => {
    navigate("/create");
  }, [navigate]); // Dependencies array, navigate is stable but included for completeness

  return (
    <div position="static">
      <button onClick={navigateToCreate}>Create New</button>
    </div>
  );
}
