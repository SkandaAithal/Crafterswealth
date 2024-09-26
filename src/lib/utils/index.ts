import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
