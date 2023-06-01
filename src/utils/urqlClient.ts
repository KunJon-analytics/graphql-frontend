import { fetchExchange } from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";
import { NextUrqlClientConfig } from "next-urql";

import {
  ChangePasswordMutation,
  ChangePasswordMutationVariables,
  CreatePostMutation,
  CreatePostMutationVariables,
  LoginMutation,
  LoginMutationVariables,
  LogoutMutation,
  LogoutMutationVariables,
  MeDocument,
  MeQuery,
  PostsDocument,
  PostsQuery,
  RegisterMutation,
  RegisterMutationVariables,
} from "../gql/graphql";

const getUrqlClient: NextUrqlClientConfig = (_ssr, ctx) => {
  return {
    url: "http://localhost:4000/graphql",
    exchanges: [
      cacheExchange({
        keys: {
          UserResponse: (data) => data.__typename,
          FieldError: (data) => data.__typename,
          PaginatedPosts: (data) => null,
        },
        updates: {
          Mutation: {
            login: (
              result: LoginMutation,
              args: LoginMutationVariables,
              cache,
              info
            ) => {
              cache.updateQuery({ query: MeDocument }, (data) => {
                let newData: MeQuery;
                newData = { ...data, me: result.login };

                return newData;
              });
            },
            register: (
              result: RegisterMutation,
              args: RegisterMutationVariables,
              cache,
              info
            ) => {
              cache.updateQuery({ query: MeDocument }, (data) => {
                let newData: MeQuery;
                newData = { ...data, me: result.register };

                return newData;
              });
            },
            logout: (
              result: LogoutMutation,
              args: LogoutMutationVariables,
              cache,
              info
            ) => {
              cache.updateQuery({ query: MeDocument }, (data) => {
                let newData: MeQuery;
                newData = { ...data, me: null };

                return newData;
              });
            },
            changePassword: (
              result: ChangePasswordMutation,
              args: ChangePasswordMutationVariables,
              cache,
              info
            ) => {
              cache.updateQuery({ query: MeDocument }, (data) => {
                let newData: MeQuery;
                newData = { ...data, me: result.changePassword };

                return newData;
              });
            },
            createPost: (
              result: CreatePostMutation,
              args: CreatePostMutationVariables,
              cache,
              info
            ) => {
              cache.invalidate("Query", "posts", { limit: 3 });
            },
          },
        },
      }),
      _ssr,
      fetchExchange,
    ],
    fetchOptions: { credentials: "include" },
  };
};

export default getUrqlClient;
