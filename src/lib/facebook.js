export const initFacebookSdk = () => {
  return new Promise((resolve, reject) => {
    // Load the Facebook SDK asynchronously
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: process.env.NEXT_PUBLIC_FACEBOOK_ID,
        cookie: true,
        xfbml: true,
        version: "v20.0",
      });
      // Resolve the promise when the SDK is loaded
      resolve();
    };
  });
};

export const getFacebookLoginStatus = () => {
  return new Promise((resolve, reject) => {
    window.FB.getLoginStatus((response) => {
      resolve(response);
    });
  });
};

export const fbLogin = () => {
  return new Promise((resolve) => {
    window.FB.login((response) => {
      resolve(response);
    });
  });
};
export const fbLogout = () => {
  return new Promise((resolve) =>
    window?.FB?.logout((response) => {
      window?.FB?.Auth?.setAuthResponse(null, "unknown");
      resolve(response);
    })
  );
};
