import { useMemo, useState } from "react";

import { useQuery } from "urql";
import { PostsDocument } from "../gql/graphql";
import { withUrqlClient } from "next-urql";
import getUrqlClient from "../utils/urqlClient";
import {
  Stack,
  Flex,
  Heading,
  Link,
  Box,
  Text,
  Button,
} from "@chakra-ui/react";
import NextLink from "next/link";

import { Layout } from "../components/Layout";

const limit = 3;

const Index = () => {
  const [cursor, setCursor] = useState<string>(null);
  const [{ fetching: loading, data, error }, fetchMore] = useQuery({
    query: PostsDocument,
    variables: useMemo(() => {
      return { limit, cursor };
    }, [cursor]),
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
          {data.posts.posts.slice(0, limit).map((p) => (
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
                <Text>Creator: {p.creator.username}</Text>
              </Box>
            </Flex>
          ))}
        </Stack>
      )}
      {data && data.posts.hasMore ? (
        <Flex>
          <Button
            onClick={() => {
              setCursor(
                data.posts.posts[data.posts.posts.length - 1].createdAt
              );
              fetchMore({
                requestPolicy: "network-only",
              });
            }}
            isLoading={loading}
            m="auto"
            my={8}
          >
            load more
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(getUrqlClient, { ssr: true })(Index);
