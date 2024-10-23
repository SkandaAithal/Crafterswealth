import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { AppActionTypes, SendVerificationEmailArgs } from "../types/app";
import client from "../apollo-client";
import { SEND_VERIFY_EMAIL_MUTATION } from "../queries/users.query";
import { toast } from "../hooks/use-toast";
import { Cart } from "../types/common/products";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isBrowser = (): boolean => typeof window !== "undefined";

export function formatNumberInShort(number: number) {
  if (number >= 10000000) {
    const croreValue = number / 10000000;
    return croreValue % 1 === 0
      ? `${croreValue}Cr`
      : `${croreValue.toFixed(1)}Cr`;
  } else if (number >= 100000) {
    const lakhValue = number / 100000;
    return lakhValue % 1 === 0 ? `${lakhValue}L` : `${lakhValue.toFixed(1)}L`;
  } else if (number >= 1000) {
    const thousandValue = number / 1000;
    return thousandValue % 1 === 0
      ? `${thousandValue}K`
      : `${thousandValue.toFixed(1)}K`;
  } else {
    return number.toString();
  }
}

export const generateRandomOTP = () => {
  const firstDigit = Math.floor(1 + Math.random() * 9);
  const remainingDigits = Math.floor(100000 + Math.random() * 900000);
  const otp = `${firstDigit}${remainingDigits.toString().slice(1)}`;
  return otp;
};

export function getInitials(fullName: string): string {
  const nameParts = fullName.trim().split(/\s+/);
  if (nameParts.length === 0 || nameParts[0] === "") return "";
  return (
    nameParts[0].charAt(0).toUpperCase() +
      nameParts[1]?.charAt(0).toUpperCase() || ""
  );
}

export const isEmpty = (object: any): boolean => {
  if (
    object === null ||
    object === undefined ||
    object === false ||
    object === ""
  )
    return true;

  if (Array.isArray(object))
    return object.length === 0 || object.every(isEmpty);

  if (typeof object === "object") {
    return (
      Object.keys(object).length === 0 || Object.values(object).every(isEmpty)
    );
  }

  return false;
};

export function formatToIndianNumberingSystem(number: number) {
  return new Intl.NumberFormat("en-IN").format(number);
}

export const getFirstIfArray = <T>(data: T[] | T): T =>
  Array.isArray(data) ? data[0] : data;

export const signInFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address." })
    .refine(
      (value) =>
        /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(value) &&
        /.+\.[a-z]{2,}$/.test(value),
      {
        message:
          "Email must be a valid email address with a proper domain and lowercase letters.",
      }
    )
    .transform((val) => val.trim()),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." })
    .refine((val) => /[a-z]/.test(val), {
      message: "Password must contain at least one lowercase letter.",
    })
    .refine((val) => /[A-Z]/.test(val), {
      message: "Password must contain at least one uppercase letter.",
    })
    .refine((val) => /[0-9]/.test(val), {
      message: "Password must contain at least one number.",
    })
    .transform((val) => val.trim()),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address." })
    .refine(
      (value) =>
        /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(value) &&
        /.+\.[a-z]{2,}$/.test(value),
      {
        message:
          "Email must be a valid email address with a proper domain and lowercase letters.",
      }
    )
    .transform((val) => val.trim()),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." })
      .refine((val) => /[a-z]/.test(val), {
        message: "Password must contain at least one lowercase letter.",
      })
      .refine((val) => /[A-Z]/.test(val), {
        message: "Password must contain at least one uppercase letter.",
      })
      .refine((val) => /[0-9]/.test(val), {
        message: "Password must contain at least one number.",
      })
      .transform((val) => val.trim()),
    confirmPassword: z
      .string()
      .min(6, { message: "Confirm password must be at least 6 characters." })
      .refine((val) => /[a-z]/.test(val), {
        message: "Confirm password must contain at least one lowercase letter.",
      })
      .refine((val) => /[A-Z]/.test(val), {
        message: "Confirm password must contain at least one uppercase letter.",
      })
      .refine((val) => /[0-9]/.test(val), {
        message: "Confirm password must contain at least one number.",
      })
      .transform((val) => val.trim()),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

export const signUpFormSchema = z
  .object({
    firstName: z
      .string()
      .min(1, { message: "First name is required." })
      .max(50, { message: "First name must be less than 50 characters." })
      .transform((val) => val.trim()),

    lastName: z
      .string()
      .min(1, { message: "Last name is required." })
      .max(50, { message: "Last name must be less than 50 characters." })
      .transform((val) => val.trim()),

    phoneNumber: z
      .string()
      .regex(/^[6-9]\d{9}$/, {
        message:
          "Enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.",
      })
      .transform((val) => Number(val))
      .refine((val) => val > 0, {
        message: "Phone number cannot be negative",
      }),

    email: z
      .string()
      .email({ message: "Invalid email address." })
      .refine(
        (value) =>
          /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(value) &&
          /.+\.[a-z]{2,}$/.test(value),
        {
          message:
            "Email must be a valid email address with a proper domain and lowercase letters.",
        }
      )
      .transform((val) => val.trim()),

    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." })
      .refine((val) => /[a-z]/.test(val), {
        message: "Password must contain at least one lowercase letter.",
      })
      .refine((val) => /[A-Z]/.test(val), {
        message: "Password must contain at least one uppercase letter.",
      })
      .refine((val) => /[0-9]/.test(val), {
        message: "Password must contain at least one number.",
      })
      .transform((val) => val.trim()),

    confirmPassword: z
      .string()
      .min(6, { message: "Confirm password must be at least 6 characters." })
      .refine((val) => /[a-z]/.test(val), {
        message: "Confirm password must contain at least one lowercase letter.",
      })
      .refine((val) => /[A-Z]/.test(val), {
        message: "Confirm password must contain at least one uppercase letter.",
      })
      .refine((val) => /[0-9]/.test(val), {
        message: "Confirm password must contain at least one number.",
      })
      .transform((val) => val.trim()),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

export const checkoutFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().regex(/^[6-9]\d{9}$/, {
    message:
      "Enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.",
  }),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  postcode: z.string().min(1, "Postcode is required"),
});

export const handleSendVerificationEmail = async ({
  appDispatch,
  email,
  expire,
  setIsVerifyEmailLoading,
}: SendVerificationEmailArgs) => {
  if (Date.now() < expire) {
    return;
  }

  const randomOtp = generateRandomOTP();

  try {
    setIsVerifyEmailLoading(true);
    const response = await client.mutate({
      mutation: SEND_VERIFY_EMAIL_MUTATION,
      variables: {
        input: {
          body: `Your OTP is: <strong>${randomOtp}</strong>`,
          from: "support@crafterswealth.com",
          subject: "Verify Email",
          to: email,
        },
      },
    });

    if (!response?.data?.sendEmail?.sent) {
      toast({
        title: "Failed to send email",
        description:
          "We were unable to send the verification email. Please try again.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Email Sent",
      description: `A verification email has been sent to ${email}. Please check your inbox.`,
    });
  } catch (error) {
    toast({
      title: "Error",
      description:
        "An error occurred while sending the verification email. Please try again later.",
      variant: "destructive",
    });
    return;
  } finally {
    setIsVerifyEmailLoading(false);
  }
  const expirationTime = Date.now() + 120 * 1000;

  appDispatch({
    type: AppActionTypes.SEND_EMAIL,
    payload: { verificationCode: randomOtp, expire: expirationTime, email },
  });
};

export const formatTime = (timeInSeconds: number) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return `${minutes > 0 ? `${minutes}m ` : ""}${seconds}s`;
};

export function decodeNumericId(encodedId: string): number {
  const decodedId = atob(encodedId);
  return Number(decodedId.split(":")[1]);
}

export function convertToDaysOrHours(input: string): string {
  const upperInput = input.toUpperCase();
  const timeUnit = upperInput.slice(-1);
  const value = parseInt(upperInput.slice(0, -1));

  if (isNaN(value)) {
    return "0";
  }

  switch (timeUnit) {
    case "M":
      return `${value * 30} days`;
    case "Y":
      return `${value * 365} days`;
    case "D":
      return `${value} days`;
    case "H":
      return `${value} hours`;
    default:
      return "0";
  }
}

export const hasChanges = <T extends object>(
  original: T,
  updated: T
): boolean => {
  for (const key in original) {
    if (Object.prototype.hasOwnProperty.call(original, key)) {
      if (key in updated && original[key] !== updated[key]) {
        return true;
      }
    }
  }
  return false;
};

export const calculateSubtotal = (cartArray: Cart[]): number => {
  return cartArray.reduce((total: number, item: Cart) => total + item.price, 0);
};

export const calculateTax = (
  subtotal: number,
  state: string
): { sgst: number; cgst: number; igst: number } => {
  let sgst = 0,
    cgst = 0,
    igst = 0;

  const taxRate = 0.18;
  if (state === "Karnataka") {
    const totalTax = subtotal * taxRate;
    sgst = totalTax / 2;
    cgst = totalTax / 2;
  } else {
    igst = subtotal * taxRate;
  }

  return { sgst, cgst, igst };
};

export const calculateTotal = (
  subtotal: number,
  sgst: number,
  cgst: number,
  igst: number
): number => {
  return Math.round(subtotal + sgst + cgst + igst);
};

export const addDurationToDate = (duration: string): Date => {
  const value = parseInt(duration.slice(0, -1), 10);
  const unit = duration.slice(-1).toUpperCase();

  const now = new Date();

  switch (unit) {
    case "D":
      return new Date(now.setDate(now.getDate() + value));
    case "W":
      return new Date(now.setDate(now.getDate() + value * 7));
    case "M":
      return new Date(now.setMonth(now.getMonth() + value));
    case "Y":
      return new Date(now.setFullYear(now.getFullYear() + value));
    case "H":
      return new Date(now.setHours(now.getHours() + value));
    default:
      throw new Error("Invalid duration format");
  }
};

export const isSubscriptionValid = (period: string): boolean => {
  if (!period) return false;

  const expiryDate = new Date(period);
  const currentDate = new Date();

  return currentDate <= expiryDate;
};
