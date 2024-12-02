import { gql } from "@apollo/client";

export const GOOGLE_SIGN_IN_MUTATION = gql`
  mutation GoogleSignIn($input: GoogleSignInInput!) {
    googleSignIn(input: $input) {
      authToken
      username
      userId
    }
  }
`;

export const SIGN_IN_WITH_EMAIL_AND_PASSWORD_MUTATION = gql`
  mutation loginWithEmailPassword($email: String!, $password: String!) {
    loginWithEmailPassword(input: { email: $email, password: $password }) {
      authToken
      message
      userId
      statusCode
    }
  }
`;

export const USER_DETAILS_QUERY = gql`
  query userDetails($id: ID!) {
    user(id: $id) {
      id
      firstName
      email
      isEmailVerified
      bought
      lastName
      productsInvested
      productsViewed
      cart
      phoneNumber
      subscription
      roles {
        nodes {
          displayName
          name
        }
      }
      city
      country
      address
      postcode
      state
    }
  }
`;

export const CREATE_USER_SIGNUP = gql`
  mutation CreateUserFromSignUp($input: CreateUserFromSignUpInput!) {
    createUserFromSignUp(input: $input) {
      message
      statusCode
    }
  }
`;

export const SEND_EMAIL_MUTATION = gql`
  mutation SendEmail($input: SendEmailInput!) {
    sendEmail(input: $input) {
      sent
    }
  }
`;

export const UPDATE_USER_META = gql`
  mutation UpdateUserMeta($input: UpdateUserMetaInput!) {
    updateUserMeta(input: $input) {
      message
      statusCode
      userId
      data
    }
  }
`;

export const UPDATE_USER_CHECKOUT_DETAILS = gql`
  mutation UpdateUserCheckoutDetails($input: UpdateUserCheckoutDetailsInput!) {
    updateUserCheckoutDetails(input: $input) {
      message
      success
    }
  }
`;
