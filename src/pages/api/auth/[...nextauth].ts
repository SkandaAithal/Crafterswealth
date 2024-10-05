import { authConfig } from "@/lib/utils/auth/authConfig";
import nextAuth from "next-auth";

export default nextAuth(authConfig);
