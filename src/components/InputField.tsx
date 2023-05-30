import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/react";
import { Field } from "formik";
import React from "react";

export type fieldValidator = (value: string) => string;

interface Props {
  name: string;
  label: string;
  textarea?: boolean;
  validator?: fieldValidator;
  type?: React.HTMLInputTypeAttribute;
}

export const InputField: React.FC<Props> = ({
  name,
  validator,
  label,
  type,
  textarea,
}) => {
  return (
    <Field name={name} validate={validator}>
      {({ field, form }) => (
        <FormControl isInvalid={form.errors[name] && form.touched[name]}>
          <FormLabel>{label}</FormLabel>
          {textarea ? (
            <Textarea {...field} placeholder={name} />
          ) : (
            <Input {...field} type={type || "text"} placeholder={name} />
          )}
          <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};
