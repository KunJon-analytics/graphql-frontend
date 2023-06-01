import React from "react";
import { Box, IconButton } from "@chakra-ui/react";
import NextLink from "next/link";
import { useMutation, useQuery } from "urql";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

import { DeletePostDocument, MeDocument } from "../gql/graphql";

interface EditDeletePostButtonsProps {
  id: number;
  creatorId: number;
}

export const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({
  id,
  creatorId,
}) => {
  const [{ data: meData }] = useQuery({ query: MeDocument });
  const [_, deletePost] = useMutation(DeletePostDocument);

  if (meData?.me?.user?.id !== creatorId) {
    return null;
  }

  return (
    <Box>
      <IconButton
        as={NextLink}
        href={`/post/edit/${id}`}
        mr={4}
        icon={<EditIcon />}
        aria-label="Edit Post"
      />
      <IconButton
        icon={<DeleteIcon />}
        aria-label="Delete Post"
        onClick={() => {
          deletePost({
            deletePostId: id,
          });
        }}
      />
    </Box>
  );
};
