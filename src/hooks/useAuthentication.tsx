import { useContext } from "react";
import { AuthenticationContext } from "../context/AuthenticationContext";

export default function useAuthentication() {
  return useContext(AuthenticationContext);
}
