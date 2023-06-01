/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "fragment PostSnippet on Post {\n  id\n  createdAt\n  updatedAt\n  title\n  points\n  textSnippet\n  voteStatus\n  creator {\n    id\n    username\n  }\n}": types.PostSnippetFragmentDoc,
    "fragment RegularError on FieldError {\n  field\n  message\n}": types.RegularErrorFragmentDoc,
    "fragment RegularPost on Post {\n  ...PostSnippet\n}": types.RegularPostFragmentDoc,
    "fragment RegularUser on User {\n  id\n  username\n}": types.RegularUserFragmentDoc,
    "fragment RegularUserResponse on UserResponse {\n  errors {\n    ...RegularError\n  }\n  user {\n    ...RegularUser\n  }\n}": types.RegularUserResponseFragmentDoc,
    "mutation ChangePassword($newPassword: String!, $token: String!) {\n  changePassword(newPassword: $newPassword, token: $token) {\n    ...RegularUserResponse\n  }\n}": types.ChangePasswordDocument,
    "mutation CreatePost($input: PostInput!) {\n  createPost(input: $input) {\n    ...RegularPost\n  }\n}": types.CreatePostDocument,
    "mutation DeletePost($deletePostId: Float!) {\n  deletePost(id: $deletePostId)\n}": types.DeletePostDocument,
    "mutation ForgotPassword($email: String!) {\n  forgotPassword(email: $email)\n}": types.ForgotPasswordDocument,
    "mutation Login($password: String!, $usernameOrEmail: String!) {\n  login(password: $password, usernameOrEmail: $usernameOrEmail) {\n    ...RegularUserResponse\n  }\n}": types.LoginDocument,
    "mutation Logout {\n  logout\n}": types.LogoutDocument,
    "mutation Register($options: UsernamePasswordInput!) {\n  register(options: $options) {\n    ...RegularUserResponse\n  }\n}": types.RegisterDocument,
    "mutation Vote($value: Int!, $postId: Int!) {\n  vote(value: $value, postId: $postId)\n}": types.VoteDocument,
    "query Me {\n  me {\n    ...RegularUserResponse\n  }\n}": types.MeDocument,
    "query Post($id: Float!) {\n  post(id: $id) {\n    ...PostSnippet\n  }\n}": types.PostDocument,
    "query Posts($limit: Int!, $cursor: String) {\n  posts(limit: $limit, cursor: $cursor) {\n    posts {\n      ...RegularPost\n    }\n    hasMore\n  }\n}": types.PostsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment PostSnippet on Post {\n  id\n  createdAt\n  updatedAt\n  title\n  points\n  textSnippet\n  voteStatus\n  creator {\n    id\n    username\n  }\n}"): (typeof documents)["fragment PostSnippet on Post {\n  id\n  createdAt\n  updatedAt\n  title\n  points\n  textSnippet\n  voteStatus\n  creator {\n    id\n    username\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment RegularError on FieldError {\n  field\n  message\n}"): (typeof documents)["fragment RegularError on FieldError {\n  field\n  message\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment RegularPost on Post {\n  ...PostSnippet\n}"): (typeof documents)["fragment RegularPost on Post {\n  ...PostSnippet\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment RegularUser on User {\n  id\n  username\n}"): (typeof documents)["fragment RegularUser on User {\n  id\n  username\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment RegularUserResponse on UserResponse {\n  errors {\n    ...RegularError\n  }\n  user {\n    ...RegularUser\n  }\n}"): (typeof documents)["fragment RegularUserResponse on UserResponse {\n  errors {\n    ...RegularError\n  }\n  user {\n    ...RegularUser\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ChangePassword($newPassword: String!, $token: String!) {\n  changePassword(newPassword: $newPassword, token: $token) {\n    ...RegularUserResponse\n  }\n}"): (typeof documents)["mutation ChangePassword($newPassword: String!, $token: String!) {\n  changePassword(newPassword: $newPassword, token: $token) {\n    ...RegularUserResponse\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreatePost($input: PostInput!) {\n  createPost(input: $input) {\n    ...RegularPost\n  }\n}"): (typeof documents)["mutation CreatePost($input: PostInput!) {\n  createPost(input: $input) {\n    ...RegularPost\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation DeletePost($deletePostId: Float!) {\n  deletePost(id: $deletePostId)\n}"): (typeof documents)["mutation DeletePost($deletePostId: Float!) {\n  deletePost(id: $deletePostId)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ForgotPassword($email: String!) {\n  forgotPassword(email: $email)\n}"): (typeof documents)["mutation ForgotPassword($email: String!) {\n  forgotPassword(email: $email)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Login($password: String!, $usernameOrEmail: String!) {\n  login(password: $password, usernameOrEmail: $usernameOrEmail) {\n    ...RegularUserResponse\n  }\n}"): (typeof documents)["mutation Login($password: String!, $usernameOrEmail: String!) {\n  login(password: $password, usernameOrEmail: $usernameOrEmail) {\n    ...RegularUserResponse\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Logout {\n  logout\n}"): (typeof documents)["mutation Logout {\n  logout\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Register($options: UsernamePasswordInput!) {\n  register(options: $options) {\n    ...RegularUserResponse\n  }\n}"): (typeof documents)["mutation Register($options: UsernamePasswordInput!) {\n  register(options: $options) {\n    ...RegularUserResponse\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Vote($value: Int!, $postId: Int!) {\n  vote(value: $value, postId: $postId)\n}"): (typeof documents)["mutation Vote($value: Int!, $postId: Int!) {\n  vote(value: $value, postId: $postId)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Me {\n  me {\n    ...RegularUserResponse\n  }\n}"): (typeof documents)["query Me {\n  me {\n    ...RegularUserResponse\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Post($id: Float!) {\n  post(id: $id) {\n    ...PostSnippet\n  }\n}"): (typeof documents)["query Post($id: Float!) {\n  post(id: $id) {\n    ...PostSnippet\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Posts($limit: Int!, $cursor: String) {\n  posts(limit: $limit, cursor: $cursor) {\n    posts {\n      ...RegularPost\n    }\n    hasMore\n  }\n}"): (typeof documents)["query Posts($limit: Int!, $cursor: String) {\n  posts(limit: $limit, cursor: $cursor) {\n    posts {\n      ...RegularPost\n    }\n    hasMore\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;