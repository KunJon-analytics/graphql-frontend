import React from "react";

import { Box, Button, Textarea } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { useMutation } from "urql";

import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { CreatePostDocument } from "../gql/graphql";
import { useIsAuth } from "../utils/useIsAuth";
import getUrqlClient from "../utils/urqlClient";

const CreatePost: React.FC<{}> = ({}) => {
  const router = useRouter();
  useIsAuth();
  const [_, createPost] = useMutation(CreatePostDocument);
  return (
    <Layout variant="small">
      <Formik
        initialValues={{ title: "", text: "" }}
        onSubmit={async (values) => {
          const { error } = await createPost({ input: values });
          if (!error) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="title" label="Title" />
            <Box mt={4}>
              <InputField textarea name="text" label="Body" />
            </Box>
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              colorScheme="teal"
            >
              create post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(getUrqlClient, { ssr: false })(CreatePost);
