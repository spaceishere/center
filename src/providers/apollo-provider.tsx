"use client";

import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  split,
  ApolloProvider as ApolloProviderContainer,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { getCookie } from "cookies-next";

const httpLink: any = new HttpLink({
  uri: `${process.env.ERXES_API_URL}/graphql`,
  credentials: "include",
});

const authLink = setContext((_, { headers }) => {
  const cookie = `pos-config-token=${process.env.NEXT_PUBLIC_POS_TOKEN}`;
  const token = getCookie("token") || "";

  return {
    headers: {
      ...headers,
      "erxes-app-token": process.env.ERXES_APP_TOKEN,
      cookie,
      "Access-Control-Allow-Origin": `${process.env.ERXES_API_URL}/graphql`,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: `${process.env.WSS_ERXES_API_URL}`,
  }),
);

const httpLinkWithMiddleware = authLink.concat(httpLink);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLinkWithMiddleware,
);

const client = new ApolloClient({
  ssrMode: typeof window !== "undefined",
  cache: new InMemoryCache(),
  link: splitLink,
});

export const ApolloProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <ApolloProviderContainer client={client}>
      {children}
    </ApolloProviderContainer>
  );
};
