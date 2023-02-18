import { Inject, Injectable } from '@nestjs/common';
import supertokens from 'supertokens-node';
import { ConfigInjectionToken, AuthModuleConfig } from '../config.interface';
import * as SuperTokensConfig from '../../config';

@Injectable()
export class SupertokensService {
  constructor(@Inject(ConfigInjectionToken) private config: AuthModuleConfig) {
    supertokens.init({
      appInfo: config.appInfo,
      supertokens: {
        connectionURI: SuperTokensConfig.connectionUri,
        apiKey: SuperTokensConfig.apiKey,
      },
      recipeList: SuperTokensConfig.recipeList,
    });
  }
}
