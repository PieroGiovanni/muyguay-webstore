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
    "query GetImages {\n  getImages {\n    id\n    productId\n    colorId\n    imageUrl\n    createdAt\n    updatedAt\n  }\n}": types.GetImagesDocument,
    "query GetProducts {\n  getProducts {\n    id\n    name\n    price\n    description\n    brandId\n    productTypeId\n    tags\n    isFeatured\n    createdAt\n    updatedAt\n    brand {\n      name\n    }\n    productType {\n      name\n    }\n  }\n}": types.GetProductsDocument,
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
export function graphql(source: "query GetImages {\n  getImages {\n    id\n    productId\n    colorId\n    imageUrl\n    createdAt\n    updatedAt\n  }\n}"): (typeof documents)["query GetImages {\n  getImages {\n    id\n    productId\n    colorId\n    imageUrl\n    createdAt\n    updatedAt\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetProducts {\n  getProducts {\n    id\n    name\n    price\n    description\n    brandId\n    productTypeId\n    tags\n    isFeatured\n    createdAt\n    updatedAt\n    brand {\n      name\n    }\n    productType {\n      name\n    }\n  }\n}"): (typeof documents)["query GetProducts {\n  getProducts {\n    id\n    name\n    price\n    description\n    brandId\n    productTypeId\n    tags\n    isFeatured\n    createdAt\n    updatedAt\n    brand {\n      name\n    }\n    productType {\n      name\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;