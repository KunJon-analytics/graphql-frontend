import { useEffect } from "react";

import { useRouter } from "next/router";
import { useQuery } from "urql";

import { MeDocument } from "../gql/graphql";

export const useIsAuth = () => {
  const [{ data, fetching: loading }, _] = useQuery({ query: MeDocument });
  const router = useRouter();
  useEffect(() => {
    if (!loading && !data?.me) {
      router.replace("/login?next=" + router.pathname);
    }
  }, [loading, data, router]);
};
