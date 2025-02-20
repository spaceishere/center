import { useSetAtom } from "jotai";
import { useRouter, useSearchParams } from "next/navigation";
import { BaseMutationOptions, useMutation } from "@apollo/client";
import { toast } from "sonner";
import { setCookie, deleteCookie } from "cookies-next";

import { fbLogout } from "@/lib/facebook";
import { onError } from "@/lib/utils";
import { mutations } from "@/gql/auth";

import {
  loadingUserAtom,
  refetchCurrentUserAtom,
} from "@/features/auth/store/auth";
import { useEffect } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";

const clientPortalId = process.env.CLIENT_PORTAL_ID;

interface ILoginData {
  token?: string;
  refetchToken?: string;
}

const useLoginCallback = () => {
  const router = useRouter();
  const from = useSearchParams().get("from");
  const triggerRefetchUser = useSetAtom(refetchCurrentUserAtom);
  const setLoadingUser = useSetAtom(loadingUserAtom);

  return {
    loginCallback: (
      { token, refetchToken }: ILoginData,
      callback?: () => void,
    ) => {
      if (token) {
        setCookie("token", token);
        setCookie("refetchToken", refetchToken || "");
        triggerRefetchUser(true);
        setLoadingUser(true);
        toast.success("Сайн байна уу?", {
          description: "Та амжилттай нэвтэрлээ",
          style: { color: "white", backgroundColor: "green" },
        });
        window.location.reload();
        !!callback && callback();
      }
    },
  };
};

export const useLogin = (onCompleted?: () => void) => {
  const { loginCallback } = useLoginCallback();

  const [login, { loading, data }] = useMutation(mutations.login, {
    onCompleted: ({ clientPortalLogin }) => {
      loginCallback(clientPortalLogin, onCompleted);
    },
    onError: (err) => {
      if (err?.graphQLErrors?.[0]?.message) {
        toast.error(err.graphQLErrors[0].message);
      } else {
        onError(err);
      }
    },
  });

  useEffect(() => {
    if (data) {
      loginCallback(data.clientPortalLogin, onCompleted);
    }
  }, [data]);

  return { login, loading, clientPortalId };
};

export const useGoogleLogin = (onGoogleError: any) => {
  const { loginCallback } = useLoginCallback();
  const { currentUser } = useCurrentUser();

  const [googleLogin, { loading }] = useMutation(mutations.googleLogin, {
    onCompleted({ clientPortalGoogleAuthentication }) {
      if (currentUser) return;

      loginCallback(clientPortalGoogleAuthentication);
    },
    onError: (err) => {
      if (err.graphQLErrors?.[0]?.message) {
        // toast.error(err.graphQLErrors[0].message);
      } else {
        // onError(err);
      }
      // onGoogleError();
    },
  });
  return { googleLogin, loading, clientPortalId };
};

export const useFacebookLogin = () => {
  const { loginCallback } = useLoginCallback();
  const [facebookLogin, { loading }] = useMutation(mutations.fbLogin, {
    onCompleted({ clientPortalFacebookAuthentication }) {
      loginCallback(clientPortalFacebookAuthentication);
    },
    onError: (err) => {
      if (err.graphQLErrors?.[0]?.message) {
        toast.error(err.graphQLErrors[0].message);
      } else {
        onError(err);
      }
    },
  });
  return { facebookLogin, loading, clientPortalId };
};

export const useRegister = (
  onCompleted?: BaseMutationOptions["onCompleted"],
) => {
  const [register, { loading }] = useMutation(mutations.createUser, {
    onCompleted: (data) => {
      !!onCompleted && onCompleted(data);
    },
    onError: (err) => {
      if (err?.graphQLErrors?.[0]?.message) {
        toast.error(err.graphQLErrors[0].message);
      } else {
        onError(err);
      }
    },
  });

  return { register, loading, clientPortalId };
};

export const useUserEdit = () => {
  const setRefetchUser = useSetAtom(refetchCurrentUserAtom);
  const [editUser, { loading }] = useMutation(mutations.userEdit, {
    onCompleted() {
      setRefetchUser(true);
      toast.success("Хувийн мэдээлэл шинэчлэгдсэн");
    },
    onError: (err) => {
      if (err.graphQLErrors[0].message) {
        toast.error(err.graphQLErrors[0].message);
      } else {
        onError(err);
      }
    },
  });

  return { loading, editUser };
};

export const useForgotPassword = () => {
  const [forgotPassword, { loading, data }] = useMutation(
    mutations.forgotPassword,
    {
      onError: (err) => {
        if (err.graphQLErrors[0].message) {
          toast.error(err.graphQLErrors[0].message);
        } else {
          onError(err);
        }
      },
    },
  );

  const { clientPortalForgotPassword: success } = data || {};

  return { loading, forgotPassword, clientPortalId, success };
};

export const useChangePassword = () => {
  const [changePassword, { loading, data }] = useMutation(
    mutations.userChangePassword,
    {
      onError: (err) => {
        if (err.graphQLErrors[0].message) {
          toast.error(err.graphQLErrors[0].message);
        } else {
          onError(err);
        }
      },
    },
  );

  const { clientPortalUserChangePassword: success } = data || {};

  return { loading, changePassword, clientPortalId, success };
};

export const useResetPassword = () => {
  const [resetPassword, { loading, data }] = useMutation(
    mutations.resetPassword,
    {
      onError: (err) => {
        if (err.graphQLErrors[0].message) {
          toast.error(err.graphQLErrors[0].message);
        } else {
          onError(err);
        }
      },
    },
  );

  const { clientPortalResetPassword: success } = data || {};

  return { loading, resetPassword, clientPortalId, success };
};

export const useLogout = () => {
  const router = useRouter();

  const triggerRefetchUser = useSetAtom(refetchCurrentUserAtom);
  const [logout, { loading }] = useMutation(mutations.logout, {
    async onCompleted() {
      triggerRefetchUser(true);
      window.location.reload();
    },
    onError: async (err) => {
      if (err.graphQLErrors[0].message) {
        toast.error(err.graphQLErrors[0].message);
      } else {
        onError(err);
      }
      await fbLogout();
    },
  });

  const handleLogout = async () => {
    deleteCookie("token");
    deleteCookie("refetchToken");
    await logout();
    fbLogout();
    router.push("/");
  };

  return { loading, logout: handleLogout };
};
