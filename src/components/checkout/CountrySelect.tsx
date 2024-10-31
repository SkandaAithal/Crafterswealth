import React from "react";
import Select from "react-select";
import { CheckoutFormData, Country, CountryOption } from "@/lib/types/checkout";
import { FormItem, FormLabel, FormMessage } from "../ui/form";
import Image from "next/image";
import { customDropDownStyles } from "@/lib/constants";
import { twMerge } from "tailwind-merge";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";

interface CountrySelectProps {
  countries: Country[];
  field: ControllerRenderProps<CheckoutFormData, "country">;
  onCountryChange: (geoNameId: number) => Promise<void>;
  form: UseFormReturn<CheckoutFormData, undefined>;
}

const CountrySelect: React.FC<CountrySelectProps> = ({
  countries,
  field,
  onCountryChange,
  form,
}) => {
  const formatOptions = () => {
    return countries.map((country) => ({
      value: country.name,
      label: (
        <div className="flex items-center gap-2">
          <Image
            src={country.flag}
            alt={`${country.name} flag`}
            className="w-7 h-5"
            height={10}
            width={10}
          />
          {country.name}
        </div>
      ),
      countryCode: country.code,
      geoNameId: country.geoNameId,
    }));
  };

  const options = formatOptions();

  const handleCountryChange = (selected: CountryOption) => {
    field.onChange(selected ? selected.countryCode : null);
    if (selected) {
      onCountryChange(selected.geoNameId);
    }
  };

  return (
    <FormItem>
      <FormLabel>Country</FormLabel>
      <Select
        options={options}
        onChange={(selected) =>
          handleCountryChange(selected as unknown as CountryOption)
        }
        defaultValue={options.find(
          (option) => option.countryCode === field.value
        )}
        placeholder="Search country"
        styles={customDropDownStyles}
        isSearchable
        className={twMerge(
          form.formState.errors.country
            ? "border-2 border-destructive rounded-lg"
            : ""
        )}
      />
      <FormMessage />
    </FormItem>
  );
};

export default CountrySelect;
