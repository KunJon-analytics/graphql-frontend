import { useQuery } from "urql";
import { PostsDocument } from "../gql/graphql";
import { withUrqlClient } from "next-urql";
import getUrqlClient from "../utils/urqlClient";
import { Stack, Flex, Heading, Link, Box, Text } from "@chakra-ui/react";
import NextLink from "next/link";

import { Layout } from "../components/Layout";

const Index = () => {
  const [{ fetching: loading, data, error }, _] = useQuery({
    query: PostsDocument,
  });

  if (!loading && !data?.posts) {
    return (
      <div>
        <div>you got query failed for some reason</div>
        <div>{error?.message}</div>
      </div>
    );
  }

  return (
    <Layout>
      {!data?.posts && loading ? (
        <div>loading...</div>
      ) : (
        <Stack spacing={8}>
          {data.posts.map((p) => (
            <Flex key={p.id} p={5} shadow="md" borderWidth="1px">
              <Box flex={1}>
                <Link as={NextLink} href={`/post/${p.id}`} mr={2}>
                  <Heading fontSize="xl">{p.title}</Heading>
                </Link>
                {/* <NextLink href="/post/[id]" as={`/post/${p.id}`}>
                  <Link>
                    <Heading fontSize="xl">{p.title}</Heading>
                  </Link>
                </NextLink> */}
                <Text>{p.text}</Text>
              </Box>
            </Flex>
          ))}
        </Stack>
      )}
    </Layout>
  );
};

export default withUrqlClient(getUrqlClient, { ssr: true })(Index);
