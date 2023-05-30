import React from "react";

import { Form, Formik } from "formik";
import { Button, Box, Flex, Link } from "@chakra-ui/react";
import { useMutation } from "urql";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";

import { InputField } from "../components/InputField";
import { LoginDocument } from "../gql/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import getUrqlClient from "../utils/urqlClient";
import { Layout } from "../components/Layout";

const validateUsername = (value: string) => {
  let error: string;
  if (!value) {
    error = "username is required";
  }
  return error;
};

const validatePassword = (value: string) => {
  let error: string;
  if (!value) {
    error = "password is required";
  }
  return error;
};

const Login = () => {
  const [_, login] = useMutation(LoginDocument);
  const router = useRouter();

  return (
    <Layout variant="small">
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values, { setErrors, setSubmitting }) => {
          try {
            const result = await login(values);
            // The result is almost identical to `updateTodoResult` with the exception
            // of `result.fetching` not being set.
            // It is an OperationResult.
            setSubmitting(false);
            if (result.data.login.errors) {
              setErrors(toErrorMap(result.data.login.errors));
            } else if (result.data.login.user) {
              // worked
              if (typeof router.query.next === "string") {
                router.push(router.query.next);
              } else {
                // worked
                router.push("/");
              }
            }
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {(props) => (
          <Form>
            <InputField
              name="usernameOrEmail"
              label="Username or Email"
              validator={validateUsername}
            />
            <Box>
              <InputField
                name="password"
                label="Password"
                validator={validatePassword}
                type="password"
              />
            </Box>
            <Flex mt={2}>
              <Link as={NextLink} ml="auto" href="/forgot-password">
                forgot password?
              </Link>
            </Flex>

            <Button
              mt={4}
              colorScheme="teal"
              isLoading={props.isSubmitting}
              type="submit"
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(
  getUrqlClient,
  { ssr: false } // Enables server-side rendering using `getInitialProps`
)(Login);
