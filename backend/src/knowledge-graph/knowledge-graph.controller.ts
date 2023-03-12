import {
  Body,
  Controller,
  Get,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { KnowledgeGraph } from '../models/knowledge-graph.model';
import { KnowledgeGraphService } from './knowledge-graph.service';
import { NodesAndEdgesDiff } from 'src/types/diff';

@ApiTags('Knowledge Graph')
@Controller('graph')
@UseGuards(new AuthGuard())
@ApiBearerAuth()
export class KnowledgeGraphController {
  constructor(private readonly knowledgeGraphService: KnowledgeGraphService) {}

  @ApiOkResponse({ type: KnowledgeGraph })
  @Get()
  async getAllNodesAndEdges(
    @Session() session: SessionContainer,
  ): Promise<KnowledgeGraph> {
    const userId = session.getUserId();
    return this.knowledgeGraphService.getAllNodesAndEdges(userId);
  }

  @ApiOkResponse({ type: KnowledgeGraph })
  @Post('diff')
  async postDiff(
    @Session() session: SessionContainer,
    @Body() diff: NodesAndEdgesDiff,
  ): Promise<KnowledgeGraph> {
    const userId = session.getUserId();
    await this.knowledgeGraphService.postDiff(userId, diff);
    return this.knowledgeGraphService.getAllNodesAndEdges(userId);
  }
}
