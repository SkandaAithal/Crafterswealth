import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CountrySelect from "./CountrySelect";
import { useAuth } from "@/lib/provider/auth-provider";
import {
  CheckoutProps,
  StateOption,
  CityOption,
  CheckoutFormData,
  OrderStatus,
} from "@/lib/types/checkout";
import Select from "react-select";
import {
  BASE_URL,
  customDropDownStyles,
  GEO_NAMES_USER_NAME,
} from "@/lib/constants";
import { TbLoader3 } from "react-icons/tb";
import { toast } from "@/lib/hooks/use-toast";
import { useMutation } from "@apollo/client";
import { UPDATE_USER_CHECKOUT_DETAILS } from "@/lib/queries/users.query";
import { checkoutFormSchema, decodeNumericId, hasChanges } from "@/lib/utils";
import {
  AuthActionTypes,
  SessionObject,
  UserDetails,
} from "@/lib/types/common/user";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { SHA256 } from "crypto-js";
import { useRouter } from "next/router";
import { POST_STATUS_API } from "@/lib/routes";
import OrderSummary from "../cart/OrderSummary";
import { useApp } from "@/lib/provider/app-provider";
import { getSession } from "next-auth/react";
import client from "@/lib/apollo-client";
import { CREATE_ORDER_MUTATION } from "@/lib/queries/products.query";
import { AppActionTypes } from "@/lib/types/common/app";
import { produce } from "immer";

const CheckoutForm: React.FC<CheckoutProps> = ({ countries }) => {
  const router = useRouter();
  const {
    user,
    authDispatch,
    redirectTrigger,
    setRedirectTrigger,
    isAuthenticated,
  } = useAuth();
  const { products, appDispatch, payment } = useApp();

  const [states, setStates] = useState<StateOption[]>([]);
  const [cities, setCities] = useState<CityOption[]>([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [isCouponLoading, setIsCouponLoading] = useState(false);
  const [updateUserCheckoutDetails] = useMutation(UPDATE_USER_CHECKOUT_DETAILS);

  const initialFormState = {
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email || "",
    phoneNumber: user.phoneNumber || "",
    address: user.address || "",
    city: user.city || "",
    state: user.state || "",
    country: user.country || "",
    postcode: user.postcode || "",
  };

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: initialFormState,
  });

  useEffect(() => {
    form.reset(initialFormState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const stateValue = form.getValues("state");

  const lineItems = useMemo(() => {
    const items: { productId: number; quantity: number; total: string }[] = [];

    user.cart.forEach((item) => {
      if (item.access.length) {
        item.access.forEach((category) => {
          const product = products.find(
            (product) => product.productCategories.nodes[0].slug === category
          );
          if (product) {
            const p = {
              productId: decodeNumericId(product.id),
              quantity: 1,
              total: (item.price / item.access.length).toString(),
            };
            if (!items.some((i) => i.productId === p.productId)) {
              items.push(p);
            }
          }
        });
      } else {
        const p = {
          productId: Number(item.productId),
          quantity: 1,
          total: item.price.toString(),
        };
        if (!items.some((i) => i.productId === p.productId)) {
          items.push(p);
        }
      }
    });

    return items;
  }, [user.cart, products]);

  const handleSubmit = async (data: CheckoutFormData) => {
    if (!user.cart.length) return;
    const session = await getSession();
    if (!isAuthenticated() || !user.id) {
      return setRedirectTrigger(!redirectTrigger);
    }

    setIsPaymentLoading(true);
    try {
      if (hasChanges(user as UserDetails, data)) {
        await updateUserCheckoutDetails({
          variables: {
            input: {
              email: data.email,
              address: data.address,
              city: data.city,
              country: data.country,
              phoneNumber: data.phoneNumber,
              postcode: data.postcode,
              state: data.state,
            },
          },
        });
        const updatedUser = produce(user, (draft) => {
          draft.address = data.address;
          draft.city = data.city;
          draft.country = data.country;
          draft.phoneNumber = data.phoneNumber;
          draft.postcode = data.postcode;
          draft.state = data.state;
        });

        authDispatch({
          type: AuthActionTypes.SET_USER_DETAILS,
          payload: updatedUser,
        });
      }

      const transactId = "Tr-" + uuidv4().toString().slice(-6);

      const inputPayload = {
        customerId: decodeNumericId(user.id),
        billing: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phoneNumber,
          address1: data.address,
          city: data.city,
          postcode: data.postcode,
          country: data.country,
          state: data.state,
        },
        lineItems: lineItems,
        paymentMethod: "phonepe",
        transactionId: transactId,
        status: "PENDING",
        isPaid: false,
        coupons: payment.coupons,
      };

      const { data: orderData } = await client.mutate({
        mutation: CREATE_ORDER_MUTATION,
        variables: {
          input: inputPayload,
        },
        context: {
          headers: {
            Authorization: `Bearer ${(session as SessionObject).authToken}`,
          },
        },
      });

      const { orderId, order } = orderData.createOrder;
      const total = order.total
        ? Math.round(parseFloat(order.total.trim()))
        : 0;
      const status = order.status;
      if (status === OrderStatus.PENDING && orderId) {
        appDispatch({
          type: AppActionTypes.INITIATE_PAYMENT,
          payload: {
            orderId,
            transactionId: transactId,
            order,
          },
        });

        const payload = {
          merchantId: process.env.NEXT_PUBLIC_MERCHANT_ID,
          merchantTransactionId: transactId,
          merchantUserId: "MUID-" + user.id,
          amount: total * 100,
          redirectUrl: `${BASE_URL}${POST_STATUS_API}/${transactId}`,
          redirectMode: "POST",
          callbackUrl: `${BASE_URL}${POST_STATUS_API}/${transactId}`,
          mobileNumber: data.phoneNumber,
          paymentInstrument: {
            type: "PAY_PAGE",
          },
        };

        const dataPayload = JSON.stringify(payload);

        const dataBase64 = Buffer.from(dataPayload).toString("base64");

        const fullURL =
          dataBase64 + "/pg/v1/pay" + process.env.NEXT_PUBLIC_SALT_KEY;
        const dataSha256 = SHA256(fullURL);

        const checksum =
          dataSha256 + "###" + process.env.NEXT_PUBLIC_SALT_INDEX;

        const UAT_PAY_API_URL =
          "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";

        const response = await axios.post(
          UAT_PAY_API_URL,
          {
            request: dataBase64,
          },
          {
            headers: {
              accept: "application/json",
              "Content-Type": "application/json",
              "X-VERIFY": checksum,
            },
          }
        );

        const redirect = response.data.data.instrumentResponse.redirectInfo.url;
        router.push(redirect);
      }
    } catch (error) {
      toast({
        title: "Couldn't initiate payment",
        description: "Please give a valid phone number",
        variant: "destructive",
      });
    } finally {
      setIsPaymentLoading(false);
    }
  };

  const fetchStates = async (geoNameId: number) => {
    setLoadingStates(true);
    try {
      const response = await axios.get(
        `https://secure.geonames.org/childrenJSON?geonameId=${geoNameId.toString()}&username=${GEO_NAMES_USER_NAME}`
      );
      const data = response.data;
      const fetchedStates = data.geonames.map((state: any) => ({
        value: state.name,
        label: state.name,
        geoNameId: state.geonameId,
      }));
      setStates(fetchedStates);
    } catch (error) {
      toast({
        title: "Couldn't get the states",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoadingStates(false);
    }
  };

  const fetchCities = async (geoNameId: number) => {
    setLoadingCities(true);
    try {
      const response = await axios.get(
        `https://secure.geonames.org/childrenJSON?geonameId=${geoNameId.toString()}&username=${GEO_NAMES_USER_NAME}`
      );
      const data = response.data;
      const fetchedCities = data.geonames.map((city: any) => ({
        value: city.name,
        label: city.name,
      }));
      setCities(fetchedCities);
    } catch (error) {
      toast({
        title: "Couldn't get the cities",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoadingCities(false);
    }
  };

  useEffect(() => {
    if (user.country) {
      const geoNameId = countries.find(
        (c) => c.code === user.country
      )?.geoNameId;

      if (geoNameId) {
        fetchStates(geoNameId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.country, countries]);

  useEffect(() => {
    if (user.state) {
      const selectedState = states.find((state) => state.value === user.state);
      if (selectedState) {
        fetchCities(selectedState.geoNameId);
      }
    }
  }, [states, user.state]);

  const NoOptionsMessage = ({ message }: { message: string }) => (
    <div className="text-sm py-0.5">{message}</div>
  );

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className=" grid grid-cols-1 lg:grid-cols-3 gap-y-10 lg:gap-x-10 layout !pb-40"
        >
          <div className="col-span-2 space-y-4">
            <h1 className="text-3xl font-bold mb-8">Billing</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your first name"
                        className={twMerge(
                          form.formState.errors.firstName
                            ? "border-2 border-destructive"
                            : ""
                        )}
                        {...field}
                        readOnly
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your last name"
                        className={twMerge(
                          form.formState.errors.lastName
                            ? "border-2 border-destructive"
                            : ""
                        )}
                        {...field}
                        readOnly
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Your email"
                      className={twMerge(
                        form.formState.errors.email
                          ? "border-2 border-destructive"
                          : ""
                      )}
                      {...field}
                      readOnly
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className={twMerge(
                        form.formState.errors.phoneNumber
                          ? "border-2 border-destructive"
                          : ""
                      )}
                      placeholder="Your phone number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <CountrySelect
                  countries={countries}
                  field={field}
                  onCountryChange={fetchStates}
                  form={form}
                />
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-2 items-center">
                      State
                      {loadingStates ? (
                        <TbLoader3 size={20} className="animate-spin" />
                      ) : null}
                    </FormLabel>

                    <FormControl>
                      <Select
                        options={states}
                        placeholder={
                          states.length
                            ? "Search your state"
                            : "Select country first"
                        }
                        onChange={(selected: StateOption | null) => {
                          field.onChange(selected ? selected.value : "");
                          if (selected) {
                            fetchCities(selected.geoNameId);
                          }
                        }}
                        value={states.find(
                          (option) => option.label === field.value
                        )}
                        className={twMerge(
                          form.formState.errors.state
                            ? "border-2 border-destructive rounded-lg"
                            : ""
                        )}
                        styles={customDropDownStyles}
                        isSearchable
                        noOptionsMessage={() => (
                          <NoOptionsMessage message="No States found." />
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-2 items-center">
                      City
                      {loadingCities ? (
                        <TbLoader3 size={20} className="animate-spin" />
                      ) : null}
                    </FormLabel>
                    <FormControl>
                      <Select
                        options={cities}
                        placeholder={
                          cities.length
                            ? "Search your city"
                            : "Select state first"
                        }
                        onChange={(selected: CityOption | null) => {
                          field.onChange(selected ? selected.value : "");
                        }}
                        value={cities.find(
                          (option) => option.value === field.value
                        )}
                        className={twMerge(
                          form.formState.errors.city
                            ? "border-2 border-destructive rounded-lg"
                            : ""
                        )}
                        styles={customDropDownStyles}
                        isSearchable
                        noOptionsMessage={() => (
                          <NoOptionsMessage message="No Cities found." />
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="postcode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postcode</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your postcode"
                      className={twMerge(
                        form.formState.errors.postcode
                          ? "border-2 border-destructive"
                          : ""
                      )}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your address"
                      className={twMerge(
                        form.formState.errors.address
                          ? "border-2 border-destructive"
                          : ""
                      )}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="border rounded-md p-5 h-fit">
            <OrderSummary
              isCheckout
              stateProp={stateValue}
              setIsCouponLoading={setIsCouponLoading}
            />
            <div className="flex justify-center !mt-8">
              <Button
                type="submit"
                className="w-full max-w-96"
                loading={isPaymentLoading}
                disabled={isCouponLoading}
              >
                Proceed to Payment
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default CheckoutForm;
