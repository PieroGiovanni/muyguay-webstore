/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: { input: any; output: any; }
  /** GraphQL Scalar representing the Prisma.Decimal type, based on Decimal.js library. */
  Decimal: { input: any; output: any; }
};

export type Brand = {
  __typename?: 'Brand';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Customer = {
  __typename?: 'Customer';
  address?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastName: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phoneNumber: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CustomerInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
};

export type Image = {
  __typename?: 'Image';
  colorId?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  imageUrl: Scalars['String']['output'];
  productId: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCategory: ProductCategory;
  createCustomer: Customer;
};


export type MutationCreateCategoryArgs = {
  name: Scalars['String']['input'];
};


export type MutationCreateCustomerArgs = {
  input: CustomerInput;
};

export type Product = {
  __typename?: 'Product';
  brand: Brand;
  brandId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  isFeatured: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Decimal']['output'];
  productType: ProductType;
  productTypeId: Scalars['Int']['output'];
  tags: Array<Scalars['Int']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type ProductCategory = {
  __typename?: 'ProductCategory';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ProductType = {
  __typename?: 'ProductType';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  productCategoryId: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Query = {
  __typename?: 'Query';
  getCategories: Array<ProductCategory>;
  getCustomer: Customer;
  getCustomers: Array<Customer>;
  getImages: Array<Image>;
  getProduct: Product;
  getProducts: Array<Product>;
  hello: Scalars['String']['output'];
};

export type GetImagesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetImagesQuery = { __typename?: 'Query', getImages: Array<{ __typename?: 'Image', id: number, productId: number, colorId?: number | null, imageUrl: string, createdAt: any, updatedAt: any }> };

export type GetProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductsQuery = { __typename?: 'Query', getProducts: Array<{ __typename?: 'Product', id: number, name: string, price: any, description?: string | null, brandId: number, productTypeId: number, tags: Array<number>, isFeatured: boolean, createdAt: any, updatedAt: any, brand: { __typename?: 'Brand', name: string }, productType: { __typename?: 'ProductType', name: string } }> };


export const GetImagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetImages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getImages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"colorId"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetImagesQuery, GetImagesQueryVariables>;
export const GetProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"brandId"}},{"kind":"Field","name":{"kind":"Name","value":"productTypeId"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"isFeatured"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"brand"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"productType"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetProductsQuery, GetProductsQueryVariables>;