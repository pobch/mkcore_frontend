import Promise from 'bluebird';
import queryString from 'query-string';

function init(appId) {
  return new Promise((resolve) => {
    if (typeof window.FB !== 'undefined') {
      setTimeout(() => resolve(), 100);
      return;
    }

    window.fbAsyncInit = () => {
      window.FB.init({
        appId,
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v3.1',
      });

      resolve();
    };

    (function initSDK(d, s, id) {
      const fjs = d.getElementsByTagName(s)[0];

      if (d.getElementById(id)) return;
      const js = d.createElement(s); js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  });
}

function connect(appId, redirectURI) {
  const q = queryString.stringify({
    client_id: appId,
    redirect_uri: redirectURI,
    scope: 'public_profile,email',
  });

  window.location.href = `https://www.facebook.com/v3.1/dialog/oauth?${q}`;
}

export default {
  init,
  connect,
};
