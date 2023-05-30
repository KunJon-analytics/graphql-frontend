import React, { useState } from "react";
import { NextPage } from "next";
import NextLink from "next/link";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import { Box, Button, Link, Flex } from "@chakra-ui/react";
import { useMutation } from "urql";
import { useRouter } from "next/router";

import { ChangePasswordDocument } from "../../gql/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import { InputField } from "../../components/InputField";
import getUrqlClient from "../../utils/urqlClient";
import { Layout } from "../../components/Layout";
import { validatePassword } from "../register";

const ChangePassword: NextPage = () => {
  const router = useRouter();
  const [_, changePassword] = useMutation(ChangePasswordDocument);
  const [tokenError, setTokenError] = useState("");
  return (
    <Layout variant="small">
      <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await changePassword({
            newPassword: values.newPassword,
            token:
              typeof router.query.token === "string" ? router.query.token : "",
          });

          if (response.data?.changePassword.errors) {
            const errorMap = toErrorMap(response.data.changePassword.errors);
            if ("token" in errorMap) {
              setTokenError(errorMap.token);
            }
            setErrors(errorMap);
          } else if (response.data?.changePassword.user) {
            // worked
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="newPassword"
              label="New Password"
              validator={validatePassword}
              type="password"
            />
            {tokenError ? (
              <Flex>
                <Box mr={2} style={{ color: "red" }}>
                  {tokenError}
                </Box>
                <NextLink href="/forgot-password">
                  <Link>click here to get a new one</Link>
                </NextLink>
              </Flex>
            ) : null}
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              colorScheme="teal"
            >
              change password
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(getUrqlClient, { ssr: false })(ChangePassword);
