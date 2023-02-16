import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  AccountNumber: any;
  BigInt: any;
  Byte: any;
  CategoryNameType: any;
  CountryCode: any;
  Cuid: any;
  Currency: any;
  DID: any;
  Date: any;
  DateTime: any;
  Duration: any;
  EmailAddress: any;
  GUID: any;
  HSL: any;
  HSLA: any;
  HexColorCode: any;
  Hexadecimal: any;
  IBAN: any;
  IP: any;
  IPv4: any;
  IPv6: any;
  ISBN: any;
  ISO8601Duration: any;
  JSON: any;
  JSONObject: any;
  JWT: any;
  Latitude: any;
  LocalDate: any;
  LocalEndTime: any;
  LocalTime: any;
  Locale: any;
  Long: any;
  Longitude: any;
  MAC: any;
  NegativeFloat: any;
  NegativeInt: any;
  NonEmptyString: any;
  NonNegativeFloat: any;
  NonNegativeInt: any;
  NonPositiveFloat: any;
  NonPositiveInt: any;
  ObjectID: any;
  PhoneNumber: any;
  Port: any;
  PositiveFloat: any;
  PositiveInt: any;
  PostalCode: any;
  RGB: any;
  RGBA: any;
  RoutingNumber: any;
  SafeInt: any;
  SemVer: any;
  Time: any;
  TimeZone: any;
  Timestamp: any;
  URL: any;
  USCurrency: any;
  UUID: any;
  UnsignedFloat: any;
  UnsignedInt: any;
  UtcOffset: any;
  Void: any;
};

export type Attribute = {
  __typename?: 'Attribute';
  avocadoId: Scalars['ID'];
  createdAt: Scalars['String'];
  deletedAt: Scalars['String'];
  description: Scalars['String'];
  hardiness: Scalars['String'];
  id: Scalars['ID'];
  shape: Scalars['String'];
  taste: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  access_token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type Avocado = {
  __typename?: 'Avocado';
  attributes?: Maybe<Attribute>;
  createdAt: Scalars['String'];
  deletedAt: Scalars['String'];
  id: Scalars['ID'];
  image: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
  sku: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Category = {
  __typename?: 'Category';
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  image: Scalars['String'];
  name: Scalars['String'];
  products?: Maybe<Array<Maybe<Product>>>;
};

export type CreateAvocadoDto = {
  description?: InputMaybe<Scalars['String']>;
  hardiness?: InputMaybe<Scalars['String']>;
  image: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
  shape?: InputMaybe<Scalars['String']>;
  sku: Scalars['String'];
  taste?: InputMaybe<Scalars['String']>;
};

export type CreateCategoryDto = {
  image: Scalars['String'];
  name: Scalars['CategoryNameType'];
};

export type CreateProductDto = {
  categoryId: Scalars['ID'];
  description: Scalars['String'];
  image: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addAvocado?: Maybe<Avocado>;
  addCategory?: Maybe<Category>;
  addProduct?: Maybe<Product>;
  deleteProduct?: Maybe<Scalars['ID']>;
  login?: Maybe<AuthResponse>;
  updateProduct?: Maybe<Product>;
};


export type MutationAddAvocadoArgs = {
  dto: CreateAvocadoDto;
};


export type MutationAddCategoryArgs = {
  dto: CreateCategoryDto;
};


export type MutationAddProductArgs = {
  dto: CreateProductDto;
};


export type MutationDeleteProductArgs = {
  id: Scalars['ID'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUpdateProductArgs = {
  dto: UpdateProductDto;
  id: Scalars['ID'];
};

export type Product = {
  __typename?: 'Product';
  category: Category;
  categoryId: Scalars['ID'];
  createdAt: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['ID'];
  image: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  avocado?: Maybe<Avocado>;
  avocados: Array<Avocado>;
  category?: Maybe<Category>;
  product?: Maybe<Product>;
  products: Array<Product>;
};


export type QueryAvocadoArgs = {
  id: Scalars['ID'];
};


export type QueryCategoryArgs = {
  id: Scalars['ID'];
};


export type QueryProductArgs = {
  id: Scalars['ID'];
};

export type UpdateProductDto = {
  categoryId?: InputMaybe<Scalars['ID']>;
  description?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['Float']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['ID'];
  role: Scalars['String'];
};

export type GetAllAvosQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllAvosQuery = { __typename?: 'Query', avocados: Array<{ __typename?: 'Avocado', id: string, image: string, name: string, createdAt: string, sku: string, price: number, attributes?: { __typename?: 'Attribute', description: string, taste: string, shape: string, hardiness: string } | null }> };

export type GetAvoQueryVariables = Exact<{
  avocadoId: Scalars['ID'];
}>;


export type GetAvoQuery = { __typename?: 'Query', avocado?: { __typename?: 'Avocado', id: string, image: string, name: string, createdAt: string, sku: string, price: number, attributes?: { __typename?: 'Attribute', description: string, taste: string, shape: string, hardiness: string } | null } | null };

export type AddAvocadoMutationVariables = Exact<{
  dto: CreateAvocadoDto;
}>;


export type AddAvocadoMutation = { __typename?: 'Mutation', addAvocado?: { __typename?: 'Avocado', image: string, name: string, createdAt: string, sku: string, price: number, attributes?: { __typename?: 'Attribute', description: string, taste: string, shape: string, hardiness: string } | null } | null };


export const GetAllAvos = gql`
    query GetAllAvos {
  avocados {
    id
    image
    name
    createdAt
    sku
    price
    attributes {
      description
      taste
      shape
      hardiness
    }
  }
}
    `;
export const GetAvo = gql`
    query GetAvo($avocadoId: ID!) {
  avocado(id: $avocadoId) {
    id
    image
    name
    createdAt
    sku
    price
    attributes {
      description
      taste
      shape
      hardiness
    }
  }
}
    `;
export const AddAvocado = gql`
    mutation AddAvocado($dto: CreateAvocadoDto!) {
  addAvocado(dto: $dto) {
    image
    name
    createdAt
    sku
    price
    attributes {
      description
      taste
      shape
      hardiness
    }
  }
}
    `;