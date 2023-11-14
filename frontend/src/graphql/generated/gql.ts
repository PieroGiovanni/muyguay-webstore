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
    "fragment BrandProps on Brand {\n  id\n  name\n  updatedAt\n  createdAt\n}": types.BrandPropsFragmentDoc,
    "fragment OrderProps on Order {\n  id\n  userId\n  userName\n  paymentStatus\n  shippingStatus\n  products {\n    id\n    name\n    quantity\n    price\n  }\n  total\n  updatedAt\n  createdAt\n}": types.OrderPropsFragmentDoc,
    "fragment ProductCategoryProps on ProductCategory {\n  id\n  name\n  createdAt\n  updatedAt\n}": types.ProductCategoryPropsFragmentDoc,
    "fragment ProductProps on Product {\n  id\n  name\n  price\n  description\n  brandId\n  productCategoryId\n  tags\n  isFeatured\n  createdAt\n  updatedAt\n  stock\n  brand {\n    name\n  }\n  productCategory {\n    id\n    name\n  }\n  images {\n    imageUrl\n    cloudinaryPublicId\n  }\n}": types.ProductPropsFragmentDoc,
    "fragment RegularError on FieldError {\n  field\n  message\n}": types.RegularErrorFragmentDoc,
    "fragment RegularProductData on Product {\n  id\n  name\n  price\n}": types.RegularProductDataFragmentDoc,
    "fragment RegularUserInfo on UserInfo {\n  id\n  email\n  displayName\n  userType\n}": types.RegularUserInfoFragmentDoc,
    "fragment RegularUserResponse on UserResponse {\n  errors {\n    ...RegularError\n  }\n  user {\n    ...RegularUserInfo\n  }\n}": types.RegularUserResponseFragmentDoc,
    "fragment UserProps on User {\n  id\n  email\n  displayName\n  password\n  phoneNumber\n  address\n  createdAt\n  updatedAt\n}": types.UserPropsFragmentDoc,
    "mutation AddGoogleUser($input: UserInput!) {\n  addGoogleUser(input: $input) {\n    ...RegularUserInfo\n  }\n}": types.AddGoogleUserDocument,
    "mutation AddProductImage($imageInput: ImageInput!) {\n  addProductImage(imageInput: $imageInput) {\n    productId\n    imageUrl\n  }\n}": types.AddProductImageDocument,
    "mutation CreateOrder($input: OrderInput!) {\n  createOrder(input: $input) {\n    id\n    userId\n    paymentStatus\n    shippingStatus\n    products {\n      id\n      quantity\n    }\n    updatedAt\n    createdAt\n  }\n}": types.CreateOrderDocument,
    "mutation CreateProduct($productInput: ProductInput!) {\n  createProduct(productInput: $productInput) {\n    ...ProductProps\n  }\n}": types.CreateProductDocument,
    "mutation Register($input: UserInput!) {\n  register(input: $input) {\n    ...RegularUserResponse\n  }\n}": types.RegisterDocument,
    "mutation UpdateOrder($input: UpdateOrderInput!) {\n  updateOrder(input: $input) {\n    ...OrderProps\n  }\n}": types.UpdateOrderDocument,
    "mutation UpdateProduct($productInput: ProductInput!, $id: Int!) {\n  updateProduct(productInput: $productInput, id: $id) {\n    ...ProductProps\n  }\n}": types.UpdateProductDocument,
    "mutation UpdateUser($input: UpdateInput!) {\n  updateUser(input: $input) {\n    ...UserProps\n  }\n}": types.UpdateUserDocument,
    "query GetBrands {\n  getBrands {\n    ...BrandProps\n  }\n}": types.GetBrandsDocument,
    "query GetFeaturedProducts {\n  getFeaturedProducts {\n    ...ProductProps\n  }\n}": types.GetFeaturedProductsDocument,
    "query GetFilteredProducts($limit: Int!, $cursor: Int, $orderBy: String, $categoryId: Int, $query: String) {\n  getFilteredProducts(\n    limit: $limit\n    cursor: $cursor\n    orderBy: $orderBy\n    categoryId: $categoryId\n    query: $query\n  ) {\n    hasMore\n    products {\n      ...ProductProps\n    }\n  }\n}": types.GetFilteredProductsDocument,
    "query GetImages {\n  getImages {\n    id\n    productId\n    colorId\n    imageUrl\n    createdAt\n    updatedAt\n    product {\n      name\n      price\n    }\n  }\n}": types.GetImagesDocument,
    "query GetNewProducts($quantity: Int!) {\n  getNewProducts(quantity: $quantity) {\n    ...ProductProps\n  }\n}": types.GetNewProductsDocument,
    "query GetOrders {\n  getOrders {\n    ...OrderProps\n  }\n}": types.GetOrdersDocument,
    "query GetOrdersByUserId($userId: Int!) {\n  getOrdersByUserId(userId: $userId) {\n    ...OrderProps\n  }\n}": types.GetOrdersByUserIdDocument,
    "query GetProduct($id: Int!) {\n  getProduct(id: $id) {\n    ...ProductProps\n  }\n}": types.GetProductDocument,
    "query GetProductCategories {\n  getProductCategories {\n    ...ProductCategoryProps\n  }\n}": types.GetProductCategoriesDocument,
    "query GetProducts {\n  getProducts {\n    ...ProductProps\n  }\n}": types.GetProductsDocument,
    "query GetProductsData {\n  getProducts {\n    ...RegularProductData\n  }\n}": types.GetProductsDataDocument,
    "query GetUserByEmail($email: String!) {\n  getUserByEmail(email: $email) {\n    ...RegularUserInfo\n  }\n}": types.GetUserByEmailDocument,
    "query GetUserById($id: Int!) {\n  getUserById(id: $id) {\n    ...UserProps\n  }\n}": types.GetUserByIdDocument,
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
export function graphql(source: "fragment BrandProps on Brand {\n  id\n  name\n  updatedAt\n  createdAt\n}"): (typeof documents)["fragment BrandProps on Brand {\n  id\n  name\n  updatedAt\n  createdAt\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment OrderProps on Order {\n  id\n  userId\n  userName\n  paymentStatus\n  shippingStatus\n  products {\n    id\n    name\n    quantity\n    price\n  }\n  total\n  updatedAt\n  createdAt\n}"): (typeof documents)["fragment OrderProps on Order {\n  id\n  userId\n  userName\n  paymentStatus\n  shippingStatus\n  products {\n    id\n    name\n    quantity\n    price\n  }\n  total\n  updatedAt\n  createdAt\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductCategoryProps on ProductCategory {\n  id\n  name\n  createdAt\n  updatedAt\n}"): (typeof documents)["fragment ProductCategoryProps on ProductCategory {\n  id\n  name\n  createdAt\n  updatedAt\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductProps on Product {\n  id\n  name\n  price\n  description\n  brandId\n  productCategoryId\n  tags\n  isFeatured\n  createdAt\n  updatedAt\n  stock\n  brand {\n    name\n  }\n  productCategory {\n    id\n    name\n  }\n  images {\n    imageUrl\n    cloudinaryPublicId\n  }\n}"): (typeof documents)["fragment ProductProps on Product {\n  id\n  name\n  price\n  description\n  brandId\n  productCategoryId\n  tags\n  isFeatured\n  createdAt\n  updatedAt\n  stock\n  brand {\n    name\n  }\n  productCategory {\n    id\n    name\n  }\n  images {\n    imageUrl\n    cloudinaryPublicId\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment RegularError on FieldError {\n  field\n  message\n}"): (typeof documents)["fragment RegularError on FieldError {\n  field\n  message\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment RegularProductData on Product {\n  id\n  name\n  price\n}"): (typeof documents)["fragment RegularProductData on Product {\n  id\n  name\n  price\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment RegularUserInfo on UserInfo {\n  id\n  email\n  displayName\n  userType\n}"): (typeof documents)["fragment RegularUserInfo on UserInfo {\n  id\n  email\n  displayName\n  userType\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment RegularUserResponse on UserResponse {\n  errors {\n    ...RegularError\n  }\n  user {\n    ...RegularUserInfo\n  }\n}"): (typeof documents)["fragment RegularUserResponse on UserResponse {\n  errors {\n    ...RegularError\n  }\n  user {\n    ...RegularUserInfo\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment UserProps on User {\n  id\n  email\n  displayName\n  password\n  phoneNumber\n  address\n  createdAt\n  updatedAt\n}"): (typeof documents)["fragment UserProps on User {\n  id\n  email\n  displayName\n  password\n  phoneNumber\n  address\n  createdAt\n  updatedAt\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation AddGoogleUser($input: UserInput!) {\n  addGoogleUser(input: $input) {\n    ...RegularUserInfo\n  }\n}"): (typeof documents)["mutation AddGoogleUser($input: UserInput!) {\n  addGoogleUser(input: $input) {\n    ...RegularUserInfo\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation AddProductImage($imageInput: ImageInput!) {\n  addProductImage(imageInput: $imageInput) {\n    productId\n    imageUrl\n  }\n}"): (typeof documents)["mutation AddProductImage($imageInput: ImageInput!) {\n  addProductImage(imageInput: $imageInput) {\n    productId\n    imageUrl\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateOrder($input: OrderInput!) {\n  createOrder(input: $input) {\n    id\n    userId\n    paymentStatus\n    shippingStatus\n    products {\n      id\n      quantity\n    }\n    updatedAt\n    createdAt\n  }\n}"): (typeof documents)["mutation CreateOrder($input: OrderInput!) {\n  createOrder(input: $input) {\n    id\n    userId\n    paymentStatus\n    shippingStatus\n    products {\n      id\n      quantity\n    }\n    updatedAt\n    createdAt\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateProduct($productInput: ProductInput!) {\n  createProduct(productInput: $productInput) {\n    ...ProductProps\n  }\n}"): (typeof documents)["mutation CreateProduct($productInput: ProductInput!) {\n  createProduct(productInput: $productInput) {\n    ...ProductProps\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Register($input: UserInput!) {\n  register(input: $input) {\n    ...RegularUserResponse\n  }\n}"): (typeof documents)["mutation Register($input: UserInput!) {\n  register(input: $input) {\n    ...RegularUserResponse\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateOrder($input: UpdateOrderInput!) {\n  updateOrder(input: $input) {\n    ...OrderProps\n  }\n}"): (typeof documents)["mutation UpdateOrder($input: UpdateOrderInput!) {\n  updateOrder(input: $input) {\n    ...OrderProps\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateProduct($productInput: ProductInput!, $id: Int!) {\n  updateProduct(productInput: $productInput, id: $id) {\n    ...ProductProps\n  }\n}"): (typeof documents)["mutation UpdateProduct($productInput: ProductInput!, $id: Int!) {\n  updateProduct(productInput: $productInput, id: $id) {\n    ...ProductProps\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateUser($input: UpdateInput!) {\n  updateUser(input: $input) {\n    ...UserProps\n  }\n}"): (typeof documents)["mutation UpdateUser($input: UpdateInput!) {\n  updateUser(input: $input) {\n    ...UserProps\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetBrands {\n  getBrands {\n    ...BrandProps\n  }\n}"): (typeof documents)["query GetBrands {\n  getBrands {\n    ...BrandProps\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetFeaturedProducts {\n  getFeaturedProducts {\n    ...ProductProps\n  }\n}"): (typeof documents)["query GetFeaturedProducts {\n  getFeaturedProducts {\n    ...ProductProps\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetFilteredProducts($limit: Int!, $cursor: Int, $orderBy: String, $categoryId: Int, $query: String) {\n  getFilteredProducts(\n    limit: $limit\n    cursor: $cursor\n    orderBy: $orderBy\n    categoryId: $categoryId\n    query: $query\n  ) {\n    hasMore\n    products {\n      ...ProductProps\n    }\n  }\n}"): (typeof documents)["query GetFilteredProducts($limit: Int!, $cursor: Int, $orderBy: String, $categoryId: Int, $query: String) {\n  getFilteredProducts(\n    limit: $limit\n    cursor: $cursor\n    orderBy: $orderBy\n    categoryId: $categoryId\n    query: $query\n  ) {\n    hasMore\n    products {\n      ...ProductProps\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetImages {\n  getImages {\n    id\n    productId\n    colorId\n    imageUrl\n    createdAt\n    updatedAt\n    product {\n      name\n      price\n    }\n  }\n}"): (typeof documents)["query GetImages {\n  getImages {\n    id\n    productId\n    colorId\n    imageUrl\n    createdAt\n    updatedAt\n    product {\n      name\n      price\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetNewProducts($quantity: Int!) {\n  getNewProducts(quantity: $quantity) {\n    ...ProductProps\n  }\n}"): (typeof documents)["query GetNewProducts($quantity: Int!) {\n  getNewProducts(quantity: $quantity) {\n    ...ProductProps\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetOrders {\n  getOrders {\n    ...OrderProps\n  }\n}"): (typeof documents)["query GetOrders {\n  getOrders {\n    ...OrderProps\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetOrdersByUserId($userId: Int!) {\n  getOrdersByUserId(userId: $userId) {\n    ...OrderProps\n  }\n}"): (typeof documents)["query GetOrdersByUserId($userId: Int!) {\n  getOrdersByUserId(userId: $userId) {\n    ...OrderProps\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetProduct($id: Int!) {\n  getProduct(id: $id) {\n    ...ProductProps\n  }\n}"): (typeof documents)["query GetProduct($id: Int!) {\n  getProduct(id: $id) {\n    ...ProductProps\n  }\n}"];
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
export function graphql(source: "query GetProductsData {\n  getProducts {\n    ...RegularProductData\n  }\n}"): (typeof documents)["query GetProductsData {\n  getProducts {\n    ...RegularProductData\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetUserByEmail($email: String!) {\n  getUserByEmail(email: $email) {\n    ...RegularUserInfo\n  }\n}"): (typeof documents)["query GetUserByEmail($email: String!) {\n  getUserByEmail(email: $email) {\n    ...RegularUserInfo\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetUserById($id: Int!) {\n  getUserById(id: $id) {\n    ...UserProps\n  }\n}"): (typeof documents)["query GetUserById($id: Int!) {\n  getUserById(id: $id) {\n    ...UserProps\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Login($email: String!, $password: String!) {\n  login(email: $email, password: $password) {\n    ...RegularUserResponse\n  }\n}"): (typeof documents)["mutation Login($email: String!, $password: String!) {\n  login(email: $email, password: $password) {\n    ...RegularUserResponse\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;