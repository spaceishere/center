import { useEffect } from "react";
import { useSetAtom, useAtom, useAtomValue } from "jotai";
import { useQuery } from "@apollo/client";
import { queries } from "@/gql/auth";

import {
  currentUserAtom,
  loadingUserAtom,
  refetchCurrentUserAtom,
} from "@/features/auth/store/auth";

export const useCurrentUser = (onCompleted?: (data: any) => void) => {
  const setCurrentUser = useSetAtom(currentUserAtom);
  const [loading, setLoading] = useAtom(loadingUserAtom);
  const [refetchUser, setRefetchUser] = useAtom(refetchCurrentUserAtom);

  const { data, refetch } = useQuery(queries.currentUser, {
    onCompleted: (data) => {
      if (data) {
        const { clientPortalCurrentUser } = data;
        setCurrentUser(clientPortalCurrentUser);
        setLoading(false);
        onCompleted && onCompleted(clientPortalCurrentUser);
      }
    },
  });

  useEffect(() => {
    if (refetchUser) {
      refetch();
      setRefetchUser(false);
    }
  }, [refetchUser, refetch, setRefetchUser, refetch]);

  const { clientPortalCurrentUser: currentUser } = data || {};

  return {
    currentUser,
    loading,
    setLoading,
  };
};
