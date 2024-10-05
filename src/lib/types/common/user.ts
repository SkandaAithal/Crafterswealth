import { forgotPasswordSchema } from "@/lib/utils";
import { Session, User } from "next-auth";
import { z } from "zod";

export interface UserDetails {
  firstName: string;
  email: string;
  isEmailVerified: boolean;
  bought: number[];
  lastName: string;
  productsInvested: number[];
  productsViewed: number[];
  roles: { nodes: { displayName: string; name: string }[] };
  id: string;
}

export interface UserObject extends User {
  authToken: string;
  userDetails: UserDetails;
}

export interface SessionObject extends Session {
  authToken: string;
  userDetails: UserDetails;
}

export interface SignInFormData {
  email: string;
  password: string;
}

export interface SignUpFormData {
  firstName: string;
  lastName: string;
  phoneNumber: number;
  email: string;
  password: string;
  confirmPassword: string;
}

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
