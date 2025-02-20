import { useFacebookLogin } from "../api/auth";
import { FacebookLoginComponent } from "./facebook-login";
import GoogleLogin from "./google-login";

export const Social = () => {
  const { facebookLogin, loading, clientPortalId } = useFacebookLogin();

  const onFacebookLogin = (response: {
    authResponse: { accessToken: string };
  }) => {
    response?.authResponse?.accessToken &&
      facebookLogin({
        variables: {
          clientPortalId,
          accessToken: response?.authResponse?.accessToken,
        },
      });
  };
  return (
    <div className="w-full space-y-4">
      <FacebookLoginComponent onSuccess={onFacebookLogin} isPending={loading} />

      <GoogleLogin isPending={loading} />
    </div>
  );
};
