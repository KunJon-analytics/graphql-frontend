import { utimes } from "fs";
import { useQuery } from "urql";

import { PostDocument } from "../gql/graphql";
import { useGetIntId } from "./useGetIntId";

export const useGetPostFromUrl = () => {
  const intId = useGetIntId();
  const [result] = useQuery({
    query: PostDocument,
    variables: { id: intId },
    pause: intId === -1,
  });
  return result;
};
