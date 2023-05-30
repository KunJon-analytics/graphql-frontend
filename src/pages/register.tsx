import React from "react";

import { Form, Formik } from "formik";
import { Button } from "@chakra-ui/react";
import { useMutation } from "urql";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";

import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { RegisterDocument } from "../gql/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import Navbar from "../components/Navbar";
import getUrqlClient from "../utils/urqlClient";

const validateUsername = (value: string) => {
  let error: string;
  if (!value) {
    error = "username is required";
  }
  return error;
};

export const validatePassword = (value: string) => {
  let error: string;
  if (!value) {
    error = "password is required";
  }
  return error;
};

const Register = () => {
  const [_, register] = useMutation(RegisterDocument);
  const router = useRouter();

  return (
    <>
      <Navbar pageProps={null} />
      <Wrapper variant="small">
        <Formik
          initialValues={{ username: "", password: "", email: "" }}
          onSubmit={async (values, { setErrors, setSubmitting }) => {
            try {
              const result = await register({ options: values });

              setSubmitting(false);
              if (result.data.register.errors) {
                setErrors(toErrorMap(result.data.register.errors));
              } else if (result.data.register.user) {
                // worked
                router.push("/");
              }
            } catch (error) {
              console.log(error);
            }
          }}
        >
          {(props) => (
            <Form>
              <InputField
                name="username"
                label="Username"
                validator={validateUsername}
              />
              <InputField name="email" label="Email" type="email" />
              <InputField
                name="password"
                label="Password"
                validator={validatePassword}
                type="password"
              />

              <Button
                mt={4}
                colorScheme="teal"
                isLoading={props.isSubmitting}
                type="submit"
              >
                Register
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </>
  );
};

export default withUrqlClient(
  getUrqlClient,
  { ssr: false } // Enables server-side rendering using `getInitialProps`
)(Register);
