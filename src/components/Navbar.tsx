import React from "react";
import { Box, Link, Flex, Button, Heading } from "@chakra-ui/react";
import NextLink from "next/link";
import { useQuery, useMutation } from "urql";
import { WithUrqlProps, withUrqlClient } from "next-urql";

import { MeDocument, LogoutDocument } from "../gql/graphql";
import getUrqlClient from "../utils/urqlClient";

const Navbar: React.FC<WithUrqlProps> = (props) => {
  const [logoutResult, logout] = useMutation(LogoutDocument);
  const [{ fetching, data }, _] = useQuery({
    query: MeDocument,
  });

  let body = null;

  // data is loading
  if (fetching) {
    // user not logged in
  } else if (!data?.me?.user) {
    body = (
      <>
        <Link as={NextLink} href="/login" mr={2}>
          login
        </Link>

        <Link as={NextLink} href="/register">
          register
        </Link>
      </>
    );
    // user is logged in
  } else {
    body = (
      <Flex align="center">
        <Button as={NextLink} href="/create-post" mr={4}>
          create post
        </Button>
        <Box mr={2}>{data.me.user?.username}</Box>
        <Button
          onClick={async () => {
            await logout({});
          }}
          isLoading={logoutResult.fetching}
          variant="link"
        >
          logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex zIndex={1} position="sticky" top={0} bg="tan" p={4}>
      <Flex flex={1} m="auto" align="center" maxW={800}>
        <Link as={NextLink} href="/">
          <Heading>Graphql</Heading>
        </Link>
        <Box ml={"auto"}>{body}</Box>
      </Flex>
    </Flex>
  );
};

export default withUrqlClient(
  getUrqlClient,
  { ssr: false } // Enables server-side rendering using `getInitialProps`
)(Navbar);
