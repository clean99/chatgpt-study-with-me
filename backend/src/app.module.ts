import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ChatgptModule } from './chatgpt/chatgpt.module';
import { GqlModule } from './gql/gql.module';
import { KnowledgeNodeModule } from './knowledge-node/knowledge-node.module';
import { KnowledgeEdgeModule } from './knowledge-edge/knowledge-edge.module';
import { KnowledgeGraphModule } from './knowledge-graph/knowledge-graph.module';
import * as SuperTokensConfig from './config';

@Module({
  imports: [
    AuthModule.forRoot({
      // try.supertokens.com is for demo purposes. Replace this with the address of your core instance (sign up on supertokens.com), or self host a core.
      connectionURI: SuperTokensConfig.connectionUri,
      // apiKey: "IF YOU HAVE AN API KEY FOR THE CORE, ADD IT HERE",
      appInfo: SuperTokensConfig.appInfo,
    }),
    UserModule,
    ChatgptModule,
    GqlModule,
    KnowledgeNodeModule,
    KnowledgeEdgeModule,
    KnowledgeGraphModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
