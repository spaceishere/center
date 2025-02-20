"use server";

import { getClient } from "@/gql/apollo-client";
import { gql } from "@apollo/client";
import { TProductDetail } from "../types";

export const getProductDetail = async (
  _id: string,
): Promise<TProductDetail> => {
  const { data } = await getClient().query({
    query,
    variables: {
      _id,
    },
  });

  const { poscProductDetail: product } = data || {};

  return product;
};

export const getMetaProductDetail = async (
  _id: string,
): Promise<{ name: string }> => {
  const { data } = await getClient().query({
    query: metadataQuery,
    variables: {
      _id,
    },
  });

  const { poscProductDetail: product } = data || {};

  return product;
};

const query = gql`
  query ProductDetail($_id: String) {
    poscProductDetail(_id: $_id) {
      _id
      name
      category {
        name
        _id
      }
      attachment {
        url
      }
      description
      shortName
      unitPrice

      remainder
      remainders
      tagIds
      code
    }
  }
`;

const metadataQuery = gql`
  query ProductDetail($_id: String) {
    poscProductDetail(_id: $_id) {
      name
    }
  }
`;
