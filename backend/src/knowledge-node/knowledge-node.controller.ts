import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Session,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { KnowledgeNode } from '../models/knowledge-node.model';
import { KnowledgeNodeService } from './knowledge-node.service';
import { SessionContainer } from 'supertokens-node/recipe/session';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { KnowledgeNodeDto } from './knowledge-node.dto';

@ApiTags('nodes')
@Controller('nodes')
@UseGuards(new AuthGuard())
@ApiBearerAuth()
export class KnowledgeNodeController {
  constructor(private readonly nodesService: KnowledgeNodeService) {}

  @Get()
  @ApiOperation({
    summary: 'Get knowledge nodes',
    description:
      'Returns a list of knowledge nodes. You can filter by parent node IDs or return only root nodes.',
  })
  @ApiQuery({
    name: 'parentNodeIds',
    description: 'An array of parent node IDs',
    type: String,
    isArray: true,
    required: false,
  })
  @ApiQuery({
    name: 'root',
    description: 'Whether to return only root nodes',
    type: Boolean,
    required: false,
  })
  @ApiResponse({ status: 200, description: 'Success', type: [KnowledgeNode] })
  async getNodes(
    @Session() session: SessionContainer,
    @Query('parentNodeIds') parentNodeIds?: string[],
    @Query('root') root?: boolean,
  ): Promise<KnowledgeNode[]> {
    const userId = session.getUserId();
    if (parentNodeIds) {
      return this.nodesService.getNodesByParentIds(userId, parentNodeIds);
    } else if (root) {
      return this.nodesService.getRootNodes(userId);
    } else {
      return this.nodesService.getNodes(userId);
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create a knowledge node' })
  @ApiBody({ type: KnowledgeNodeDto })
  @ApiResponse({
    status: 201,
    description: 'The created knowledge node',
    type: KnowledgeNode,
  })
  async createNode(
    @Session() session: SessionContainer,
    @Body() requestBody: KnowledgeNodeDto,
  ): Promise<KnowledgeNode> {
    const userId = session.getUserId();
    return this.nodesService.createNode(userId, requestBody);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a knowledge node' })
  @ApiBody({ type: KnowledgeNodeDto })
  @ApiResponse({
    status: 200,
    description: 'The updated knowledge node',
    type: KnowledgeNode,
  })
  async updateNode(
    @Session() session: SessionContainer,
    @Param('id') id: string,
    @Body() requestBody: Partial<KnowledgeNodeDto>,
  ): Promise<KnowledgeNode> {
    const userId = session.getUserId();
    return this.nodesService.updateNode(userId, id, requestBody);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a knowledge node' })
  @ApiResponse({
    status: 204,
    description: 'The knowledge node has been deleted',
    type: Boolean,
  })
  @ApiResponse({ status: 404, description: 'The knowledge node was not found' })
  async deleteNode(
    @Session() session: SessionContainer,
    @Param('id') id: string,
  ): Promise<boolean> {
    const userId = session.getUserId();
    return this.nodesService.deleteNode(userId, id);
  }
}
