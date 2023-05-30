import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { Formik, Form } from "formik";
import { useMutation } from "urql";

import getUrqlClient from "../utils/urqlClient";
import { Layout } from "../components/Layout";
import { InputField } from "../components/InputField";
import { ForgotPasswordDocument } from "../gql/graphql";
import { validateEmail } from "./register";

const ForgotPassword: React.FC<{}> = ({}) => {
  const [{ data, fetching }, forgotPassword] = useMutation(
    ForgotPasswordDocument
  );

  const complete = data?.forgotPassword && !fetching;

  return (
    <Layout variant="small">
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values) => {
          await forgotPassword(values);
        }}
      >
        {({ isSubmitting }) =>
          complete ? (
            <Box>
              if an account with that email exists, we sent you can email
            </Box>
          ) : (
            <Form>
              <InputField
                name="email"
                label="Email"
                validator={validateEmail}
                type="email"
              />
              <Button
                mt={4}
                type="submit"
                isLoading={isSubmitting}
                colorScheme="teal"
              >
                forgot password
              </Button>
            </Form>
          )
        }
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(getUrqlClient, { ssr: false })(ForgotPassword);
