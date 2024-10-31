export interface Country {
  name: string;
  code: string;
  flag: string;
  geoNameId: number;
}

export interface CheckoutProps {
  countries: Country[];
}

export interface CountryOption {
  value: string;
  label: React.ReactNode;
  geoNameId: number;
  countryCode: string;
}

export interface StateOption {
  value: string;
  label: string;
  geoNameId: number;
}
export interface CityOption {
  value: string;
  label: string;
}

export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postcode: string;
}

export enum OrderStatus {
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}
