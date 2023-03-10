import ThirdPartyPasswordless from 'supertokens-node/recipe/thirdpartypasswordless';
import Session from 'supertokens-node/recipe/session';
import Dashboard from 'supertokens-node/recipe/dashboard';
// import { TwilioService } from 'supertokens-node/recipe/thirdpartypasswordless/smsdelivery';
import { sendValidationEmail } from './email';

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
    emailDelivery: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      override: (originalImplementation) => {
        return {
          ...originalImplementation,
          sendEmail: sendValidationEmail,
        };
      },
    },
    // smsDelivery: {
    //   service: new TwilioService({
    //     twilioSettings: {
    //       accountSid: process.env.SID,
    //       authToken: process.env.SID_TOKEN,

    //       // give either from or messagingServiceSid
    //       messagingServiceSid: process.env.SID_MESSAGE,
    //     },
    //   }),
    // },
    providers: [
      // We have provided you with development keys which you can use for testing.
      // IMPORTANT: Please replace them with your own OAuth keys for production use.
      ThirdPartyPasswordless.Google({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
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
