import React, { useEffect } from "react";
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
} from "@/lib/types/common/checkout";
import Select from "react-select";
import { customDropDownStyles, GEO_NAMES_USER_NAME } from "@/lib/constants";
import { TbLoader3 } from "react-icons/tb";
import { toast } from "@/lib/hooks/use-toast";
import { useMutation } from "@apollo/client";
import { UPDATE_USER_CHECKOUT_DETAILS } from "@/lib/queries/users.query";
import { checkoutFormSchema, hasChanges } from "@/lib/utils";
import { AuthActionTypes, UserDetails } from "@/lib/types/common/user";
import { twMerge } from "tailwind-merge";

const CheckoutForm: React.FC<CheckoutProps> = ({ countries }) => {
  const { user, authDispatch } = useAuth();
  const [states, setStates] = React.useState<StateOption[]>([]);
  const [cities, setCities] = React.useState<CityOption[]>([]);
  const [loadingStates, setLoadingStates] = React.useState(false);
  const [loadingCities, setLoadingCities] = React.useState(false);
  const [updateUserCheckoutDetails, { loading }] = useMutation(
    UPDATE_USER_CHECKOUT_DETAILS
  );

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      phoneNumber: user.phoneNumber || "",
      address: user.address || "",
      city: user.city || "",
      state: user.state || "",
      country: user.country || "",
      postcode: user.postcode || "",
    },
  });

  const handleSubmit = async (data: CheckoutFormData) => {
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
      authDispatch({
        type: AuthActionTypes.SET_USER_DETAILS,
        payload: { ...user, ...data } as UserDetails,
      });
    }
  };

  const fetchStates = async (geoNameId: number) => {
    setLoadingStates(true);
    try {
      const response = await fetch(
        `http://api.geonames.org/childrenJSON?geonameId=${geoNameId.toString()}&username=${GEO_NAMES_USER_NAME}`
      );
      const data = await response.json();
      const fetchedStates = data.geonames.map((state: any) => ({
        value: state.name,
        label: state.name,
        geoNameId: state.geonameId,
      }));
      setStates(fetchedStates);
    } catch (error) {
      toast({
        title: "Couldn't get the states",
        description: "Please try to select country again",
        variant: "destructive",
      });
    } finally {
      setLoadingStates(false);
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
  }, [user.country]);

  useEffect(() => {
    if (user.state) {
      const selectedState = states.find((state) => state.value === user.state);
      if (selectedState) {
        fetchCities(selectedState.geoNameId);
      }
    }
  }, [states, user.state]);

  const fetchCities = async (geoNameId: number) => {
    setLoadingCities(true);
    try {
      const response = await fetch(
        `http://api.geonames.org/childrenJSON?geonameId=${geoNameId.toString()}&username=${GEO_NAMES_USER_NAME}`
      );
      const data = await response.json();
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

  const NoOptionsMessage = ({ message }: { message: string }) => (
    <div className="text-sm py-0.5">{message}</div>
  );

  return (
    <>
      <h1 className="text-3xl font-bold mb-8">Billing</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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
                        (option) => option.value === field.value
                      )}
                      className={twMerge(
                        form.formState.errors.state
                          ? "border-2 border-destructive rounded-lg"
                          : ""
                      )}
                      styles={customDropDownStyles}
                      isSearchable
                      noOptionsMessage={() => (
                        <NoOptionsMessage message="No options found." />
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
                        <NoOptionsMessage message="No options found." />
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
          <div className="flex justify-center !mt-10">
            <Button type="submit" className="w-full max-w-96" loading={loading}>
              Proceed to Payment
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default CheckoutForm;
