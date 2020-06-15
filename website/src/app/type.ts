export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type Ave = {
  __typename?: 'Ave';
  id: Scalars['ID'];
  sci: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  rank?: Maybe<Scalars['String']>;
  defaultImage?: Maybe<Scalars['String']>;
  images?: Maybe<Array<Maybe<Scalars['String']>>>;
  extinct?: Maybe<Scalars['Boolean']>;
  inatId: Scalars['Int'];
  wiki?: Maybe<Scalars['String']>;
  descp?: Maybe<Scalars['String']>;
  speciesCount?: Maybe<Scalars['Int']>;
  parent?: Maybe<Ave>;
};

export type Country = {
  __typename?: 'Country';
  id: Scalars['ID'];
  code: Scalars['ID'];
  name: Scalars['String'];
  short?: Maybe<Scalars['String']>;
  model?: Maybe<Model>;
  flag?: Maybe<Scalars['String']>;
  inatId: Scalars['Int'];
};

export type List = {
  __typename?: 'List';
  id: Scalars['ID'];
  name: Scalars['String'];
  items: Array<Maybe<Ave>>;
};

export type Model = {
  __typename?: 'Model';
  path?: Maybe<Scalars['String']>;
  level?: Maybe<Scalars['Float']>;
  fontHeight?: Maybe<Scalars['Float']>;
  fontSize?: Maybe<Scalars['Float']>;
};

export type Observation = {
  __typename?: 'Observation';
  id: Scalars['ID'];
  date?: Maybe<Scalars['Date']>;
  quality?: Maybe<Scalars['String']>;
  coord?: Maybe<Array<Maybe<Scalars['Float']>>>;
  images?: Maybe<Array<Maybe<Scalars['String']>>>;
  createdAt?: Maybe<Scalars['Date']>;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  ave?: Maybe<Ave>;
  countries?: Maybe<Array<Maybe<Country>>>;
  observations?: Maybe<Array<Maybe<Observation>>>;
  user?: Maybe<User>;
};

export type QueryAveArgs = {
  id: Scalars['ID'];
};

export type QueryCountriesArgs = {
  codes?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type QueryObservationsArgs = {
  ids: Array<Maybe<Scalars['Int']>>;
};

export type QueryUserArgs = {
  id: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  descp?: Maybe<Scalars['String']>;
  inatId?: Maybe<Scalars['Int']>;
};
