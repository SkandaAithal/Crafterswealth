import client from "@/lib/apollo-client";
import {
  GOOGLE_SIGN_IN_MUTATION,
  SIGN_IN_WITH_EMAIL_AND_PASSWORD_MUTATION,
  USER_DETAILS_QUERY,
} from "@/lib/queries/users.query";
import { UserDetails } from "@/lib/types/common/user";
import { User } from "next-auth";

export const handleCredentialsSignIn = async (credentials: {
  email?: string;
  password?: string;
}) => {
  const { data } = await client.mutate({
    mutation: SIGN_IN_WITH_EMAIL_AND_PASSWORD_MUTATION,
    variables: {
      email: credentials?.email,
      password: credentials?.password,
    },
  });

  const response = data?.loginWithEmailPassword;
  const userId = response?.userId;
  const authToken = response?.authToken;

  if (response.statusCode !== 200 || !authToken || !userId) {
    throw new Error(response.message);
  }

  const userDetails = await getUserDetails(authToken, userId);
  return {
    email: credentials?.email,
    id: userId,
    authToken,
    name: `${userDetails.firstName} ${userDetails.lastName}`,
    image: "",
    userDetails,
  };
};

export const handleGoogleSignIn = async (user: User) => {
  const signInResult = await client.mutate({
    mutation: GOOGLE_SIGN_IN_MUTATION,
    variables: {
      input: {
        email: user.email,
        firstName: user.name?.split(" ")[0] || "",
        lastName: user.name?.split(" ")[1] || "",
        isEmailVerified: true,
      },
    },
  });

  const authToken = signInResult?.data?.googleSignIn?.authToken;
  const userId = signInResult?.data?.googleSignIn?.userId;

  if (!authToken && !userId) return null;
  const userDetails = await getUserDetails(authToken, userId);

  return {
    authToken,
    userDetails,
  };
};

export const getUserDetails = async (authToken: string, userId: string) => {
  const { data: userDetailsResult } = await client.query({
    query: USER_DETAILS_QUERY,
    variables: { id: userId },
    context: {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    },
  });

  const userDetails: UserDetails = userDetailsResult.user;
  return userDetails;
};
