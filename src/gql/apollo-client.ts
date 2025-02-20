import {
  ApolloClient,
  ApolloLink,
  concat,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { cookies } from "next/headers";

import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

export const { getClient } = registerApolloClient(() => {
  const httpLink = new HttpLink({
    uri: `${process.env.ERXES_API_URL}/graphql`,
  });

  const authLink = new ApolloLink((operation, forward) => {
    const cookie = `pos-config-token=${process.env.NEXT_PUBLIC_POS_TOKEN}`;
    const token = cookies().get("token");

    operation.setContext({
      headers: {
        "erxes-app-token": process.env.ERXES_APP_TOKEN,
        authorization: token?.value ? `Bearer ${token.value}` : "",
        cookie,
      },
    });

    return forward(operation);
  });

  return new ApolloClient({
    link: concat(authLink, httpLink),
    cache: new InMemoryCache({
      addTypename: false,
    }),
  });
});
