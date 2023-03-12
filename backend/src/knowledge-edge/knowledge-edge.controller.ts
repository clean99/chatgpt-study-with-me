import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  KnowledgeEdge,
  KnowledgeEdgeType,
} from '../models/knowledge-edge.model';
import { KnowledgeEdgeService } from './knowledge-edge.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import {
  CreateKnowledgeEdgeDto,
  DeleteKnowledgeEdgeDto,
} from './knowledge-edge.dto';

@Controller('edges')
@UseGuards(new AuthGuard())
@ApiBearerAuth()
@ApiTags('Knowledge Edges')
export class KnowledgeEdgeController {
  constructor(private readonly edgeService: KnowledgeEdgeService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Success', type: [KnowledgeEdge] })
  @ApiQuery({
    name: 'nodeIds',
    description: 'A list of IDs of nodes to retrieve edges for',
    required: false,
  })
  async getEdges(
    @Query('nodeIds') nodeIds: string[],
  ): Promise<KnowledgeEdge[]> {
    const edges = await this.edgeService.getEdges(nodeIds);
    return edges;
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Created', type: Boolean })
  @ApiBody({ type: CreateKnowledgeEdgeDto })
  async createEdge(
    @Body('from') from: string,
    @Body('to') to: string,
    @Body('type') type?: KnowledgeEdgeType,
  ): Promise<boolean> {
    return await this.edgeService.connect(from, to, type);
  }

  @Delete()
  @ApiResponse({ status: 200, description: 'Success', type: Boolean })
  @ApiBody({ type: DeleteKnowledgeEdgeDto })
  async deleteEdge(
    @Body('from') from: string,
    @Body('to') to: string,
    @Body('type') type?: KnowledgeEdgeType,
  ): Promise<boolean> {
    const success = await this.edgeService.disconnect(from, to, type);
    return success;
  }
}
