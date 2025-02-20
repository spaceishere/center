import { gql, useQuery } from "@apollo/client";
import { TCarProduct } from "../types";

export const useCarProducts = () => {
  const { data, loading } = useQuery<{ poscProducts: TCarProduct[] }>(query, {
    variables: {
      ids: [
        // 1.
        "bDh6jrLaeAioi3FFD",
        // 2.
        "zMDP7u8nnsdYbcjeR",
        // 3.
        "R5gYWvFamrHmBp7jP",
        // 4.
        "BiKEti5WEcLk65RX5",
        // 5.
        "AslnPqoElYPFkrYaDo5pU",
        // 6.
        "G5JSwTnHxxCaGxQ26",
        // 7.
        "MjHoFQkprBkpzgEjK",
        // 8.
        "y7vrYM55pQgCnCRLo",
        // 9.
        "3oLxGfeeocfyoXFMg",
        // 10.
        "AslnPqoElYPFkrYaDo5pU",
        // 11.
        "fWj3jpHXkZARyYwbK",
        // 12.
        "f8bNSAkA58LF8fLim",
      ],
    },
  });

  let products: TCarProduct[] = data?.poscProducts || [];

  return {
    products,
    loading,
  };
};

const query = gql`
  query poscProducts($ids: [String]) {
    poscProducts(ids: $ids) {
      _id
      name
      unitPrice
    }
  }
`;
