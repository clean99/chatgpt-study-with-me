import ThirdPartyPasswordless from 'supertokens-node/recipe/thirdpartypasswordless';
import Session from 'supertokens-node/recipe/session';
import Dashboard from 'supertokens-node/recipe/dashboard';

export const appInfo = {
  // Learn more about this on https://supertokens.com/docs/thirdpartypasswordless/appinfo
  appName: 'Studywithme',
  apiDomain: process.env.API_DOMAIN ?? 'http://localhost:3001',
  websiteDomain: process.env.WEBSITE_DOMAIN ?? 'http://localhost:3000',
  apiBasePath: '/auth',
  websiteBasePath: '/auth',
};

export const connectionUri = process.env.CONNECTION_URI ?? '';
export const apiKey = process.env.AUTH_API_KEY ?? '';

export const recipeList = [
  ThirdPartyPasswordless.init({
    providers: [
      // We have provided you with development keys which you can use for testing.
      // IMPORTANT: Please replace them with your own OAuth keys for production use.
      ThirdPartyPasswordless.Google({
        clientId:
          '1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com',
        clientSecret: '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',
      }),
      ThirdPartyPasswordless.Github({
        clientSecret: process.env.GITHUB_SECRET,
        clientId: process.env.GITHUB_ID,
      }),
    ],
    contactMethod: 'EMAIL_OR_PHONE',
    flowType: 'USER_INPUT_CODE_AND_MAGIC_LINK',
  }),
  Session.init(),
  Dashboard.init({
    apiKey: process.env.AUTH_API_KEY,
  }),
];
