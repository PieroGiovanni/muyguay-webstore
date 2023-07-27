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
    "fragment OrderProps on Order {\n  id\n  userId\n  paymentStatus\n  shippingStatus\n  products {\n    id\n    name\n    quantity\n    price\n  }\n  updatedAt\n  createdAt\n}": types.OrderPropsFragmentDoc,
    "fragment ProductCategoryProps on ProductCategory {\n  id\n  name\n  createdAt\n  updatedAt\n}": types.ProductCategoryPropsFragmentDoc,
    "fragment ProductProps on Product {\n  id\n  name\n  price\n  description\n  brandId\n  productTypeId\n  tags\n  isFeatured\n  createdAt\n  updatedAt\n  brand {\n    name\n  }\n  productType {\n    id\n    name\n    productCategoryId\n  }\n  images {\n    imageUrl\n    cloudinaryPublicId\n  }\n}": types.ProductPropsFragmentDoc,
    "fragment RegularError on FieldError {\n  field\n  message\n}": types.RegularErrorFragmentDoc,
    "fragment RegularUserInfo on UserInfo {\n  id\n  email\n  displayName\n}": types.RegularUserInfoFragmentDoc,
    "fragment RegularUserResponse on UserResponse {\n  errors {\n    ...RegularError\n  }\n  user {\n    ...RegularUserInfo\n  }\n}": types.RegularUserResponseFragmentDoc,
    "mutation AddGoogleUser($input: UserInput!) {\n  addGoogleUser(input: $input) {\n    ...RegularUserInfo\n  }\n}": types.AddGoogleUserDocument,
    "mutation CreateOrder($input: OrderInput!) {\n  createOrder(input: $input) {\n    id\n    userId\n    paymentStatus\n    shippingStatus\n    products {\n      id\n      quantity\n    }\n    updatedAt\n    createdAt\n  }\n}": types.CreateOrderDocument,
    "query GetImages {\n  getImages {\n    id\n    productId\n    colorId\n    imageUrl\n    createdAt\n    updatedAt\n    product {\n      name\n      price\n    }\n  }\n}": types.GetImagesDocument,
    "query GetOrdersByUserId($userId: Int!) {\n  getOrdersByUserId(userId: $userId) {\n    ...OrderProps\n  }\n}": types.GetOrdersByUserIdDocument,
    "query GetProduct($getProductId: Int!) {\n  getProduct(id: $getProductId) {\n    ...ProductProps\n  }\n}": types.GetProductDocument,
    "query GetProductCategories {\n  getProductCategories {\n    ...ProductCategoryProps\n  }\n}": types.GetProductCategoriesDocument,
    "query GetProducts {\n  getProducts {\n    ...ProductProps\n  }\n}": types.GetProductsDocument,
    "query GetUserByEmail($email: String!) {\n  getUserByEmail(email: $email) {\n    ...RegularUserInfo\n  }\n}": types.GetUserByEmailDocument,
    "mutation Login($email: String!, $password: String!) {\n  login(email: $email, password: $password) {\n    ...RegularUserResponse\n  }\n}": types.LoginDocument,
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
export function graphql(source: "fragment OrderProps on Order {\n  id\n  userId\n  paymentStatus\n  shippingStatus\n  products {\n    id\n    name\n    quantity\n    price\n  }\n  updatedAt\n  createdAt\n}"): (typeof documents)["fragment OrderProps on Order {\n  id\n  userId\n  paymentStatus\n  shippingStatus\n  products {\n    id\n    name\n    quantity\n    price\n  }\n  updatedAt\n  createdAt\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductCategoryProps on ProductCategory {\n  id\n  name\n  createdAt\n  updatedAt\n}"): (typeof documents)["fragment ProductCategoryProps on ProductCategory {\n  id\n  name\n  createdAt\n  updatedAt\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductProps on Product {\n  id\n  name\n  price\n  description\n  brandId\n  productTypeId\n  tags\n  isFeatured\n  createdAt\n  updatedAt\n  brand {\n    name\n  }\n  productType {\n    id\n    name\n    productCategoryId\n  }\n  images {\n    imageUrl\n    cloudinaryPublicId\n  }\n}"): (typeof documents)["fragment ProductProps on Product {\n  id\n  name\n  price\n  description\n  brandId\n  productTypeId\n  tags\n  isFeatured\n  createdAt\n  updatedAt\n  brand {\n    name\n  }\n  productType {\n    id\n    name\n    productCategoryId\n  }\n  images {\n    imageUrl\n    cloudinaryPublicId\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment RegularError on FieldError {\n  field\n  message\n}"): (typeof documents)["fragment RegularError on FieldError {\n  field\n  message\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment RegularUserInfo on UserInfo {\n  id\n  email\n  displayName\n}"): (typeof documents)["fragment RegularUserInfo on UserInfo {\n  id\n  email\n  displayName\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment RegularUserResponse on UserResponse {\n  errors {\n    ...RegularError\n  }\n  user {\n    ...RegularUserInfo\n  }\n}"): (typeof documents)["fragment RegularUserResponse on UserResponse {\n  errors {\n    ...RegularError\n  }\n  user {\n    ...RegularUserInfo\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation AddGoogleUser($input: UserInput!) {\n  addGoogleUser(input: $input) {\n    ...RegularUserInfo\n  }\n}"): (typeof documents)["mutation AddGoogleUser($input: UserInput!) {\n  addGoogleUser(input: $input) {\n    ...RegularUserInfo\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateOrder($input: OrderInput!) {\n  createOrder(input: $input) {\n    id\n    userId\n    paymentStatus\n    shippingStatus\n    products {\n      id\n      quantity\n    }\n    updatedAt\n    createdAt\n  }\n}"): (typeof documents)["mutation CreateOrder($input: OrderInput!) {\n  createOrder(input: $input) {\n    id\n    userId\n    paymentStatus\n    shippingStatus\n    products {\n      id\n      quantity\n    }\n    updatedAt\n    createdAt\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetImages {\n  getImages {\n    id\n    productId\n    colorId\n    imageUrl\n    createdAt\n    updatedAt\n    product {\n      name\n      price\n    }\n  }\n}"): (typeof documents)["query GetImages {\n  getImages {\n    id\n    productId\n    colorId\n    imageUrl\n    createdAt\n    updatedAt\n    product {\n      name\n      price\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetOrdersByUserId($userId: Int!) {\n  getOrdersByUserId(userId: $userId) {\n    ...OrderProps\n  }\n}"): (typeof documents)["query GetOrdersByUserId($userId: Int!) {\n  getOrdersByUserId(userId: $userId) {\n    ...OrderProps\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetProduct($getProductId: Int!) {\n  getProduct(id: $getProductId) {\n    ...ProductProps\n  }\n}"): (typeof documents)["query GetProduct($getProductId: Int!) {\n  getProduct(id: $getProductId) {\n    ...ProductProps\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetProductCategories {\n  getProductCategories {\n    ...ProductCategoryProps\n  }\n}"): (typeof documents)["query GetProductCategories {\n  getProductCategories {\n    ...ProductCategoryProps\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetProducts {\n  getProducts {\n    ...ProductProps\n  }\n}"): (typeof documents)["query GetProducts {\n  getProducts {\n    ...ProductProps\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetUserByEmail($email: String!) {\n  getUserByEmail(email: $email) {\n    ...RegularUserInfo\n  }\n}"): (typeof documents)["query GetUserByEmail($email: String!) {\n  getUserByEmail(email: $email) {\n    ...RegularUserInfo\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Login($email: String!, $password: String!) {\n  login(email: $email, password: $password) {\n    ...RegularUserResponse\n  }\n}"): (typeof documents)["mutation Login($email: String!, $password: String!) {\n  login(email: $email, password: $password) {\n    ...RegularUserResponse\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;