import { Test, TestingModule } from '@nestjs/testing';
import { KnowledgeNodeController } from './knowledge-node.controller';
import { KnowledgeNodeService } from './knowledge-node.service';
import { KnowledgeNode } from '../models/knowledge-node.model';
import { SessionContainer } from 'supertokens-node/recipe/session';

jest.mock('neo4j-driver/lib/driver');

describe('NodesController', () => {
  let controller: KnowledgeNodeController;
  let service: KnowledgeNodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KnowledgeNodeController],
      providers: [
        KnowledgeNodeService,
        {
          provide: 'Driver',
          useValue: {
            session: jest.fn(),
            close: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<KnowledgeNodeController>(KnowledgeNodeController);
    service = module.get<KnowledgeNodeService>(KnowledgeNodeService);
  });

  describe('GET /nodes', () => {
    it('should call the service method with no arguments when no parentNodeIds or root flag is provided', async () => {
      const session: SessionContainer = { getUserId: () => 'user1' } as any;
      const serviceSpy = jest.spyOn(service, 'getNodes').mockResolvedValue([]);

      await controller.getNodes(session, null, null);

      expect(serviceSpy).toHaveBeenCalledWith('user1');
    });

    it('should call the service method with parentNodeIds when parentNodeIds is provided', async () => {
      const session: SessionContainer = { getUserId: () => 'user1' } as any;
      const parentNodeIds = ['1', '2'];
      const serviceSpy = jest
        .spyOn(service, 'getNodesByParentIds')
        .mockResolvedValue([]);

      await controller.getNodes(session, parentNodeIds, null);

      expect(serviceSpy).toHaveBeenCalledWith('user1', parentNodeIds);
    });

    it('should call the service method to get root nodes when root flag is provided', async () => {
      const session: SessionContainer = { getUserId: () => 'user1' } as any;
      const serviceSpy = jest
        .spyOn(service, 'getRootNodes')
        .mockResolvedValue([]);

      await controller.getNodes(session, null, true);

      expect(serviceSpy).toHaveBeenCalledWith('user1');
    });
  });

  describe('POST /nodes', () => {
    it('should call the service method to create a new node and return the result', async () => {
      const session: SessionContainer = { getUserId: () => 'user1' } as any;
      const requestBody = {
        id: '1',
        label: 'New Node',
        completed: false,
        parentId: '1',
      };
      const expectedResult: KnowledgeNode = {
        id: '7',
        label: 'New Node',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const serviceSpy = jest
        .spyOn(service, 'createNode')
        .mockResolvedValue(expectedResult);

      const result = await controller.createNode(session, requestBody);

      expect(serviceSpy).toHaveBeenCalledWith('user1', requestBody);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('PUT /nodes/:id', () => {
    it('should call the service method to update an existing node and return the result', async () => {
      const session: SessionContainer = { getUserId: () => 'user1' } as any;
      const nodeId = '7';
      const requestBody = {
        label: 'Updated Node',
        completed: true,
      };
      const expectedResult: KnowledgeNode = {
        id: '7',
        label: 'Updated Node',
        completed: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const serviceSpy = jest
        .spyOn(service, 'updateNode')
        .mockResolvedValue(expectedResult);

      const result = await controller.updateNode(session, nodeId, requestBody);
      expect(serviceSpy).toHaveBeenCalledWith('user1', nodeId, requestBody);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('DELETE /nodes/:id', () => {
    it('should call the service method to delete an existing node and return the result', async () => {
      const session: SessionContainer = { getUserId: () => 'user1' } as any;
      const nodeId = '7';
      const serviceSpy = jest
        .spyOn(service, 'deleteNode')
        .mockResolvedValue(true);

      const result = await controller.deleteNode(session, nodeId);

      expect(serviceSpy).toHaveBeenCalledWith('user1', nodeId);
      expect(result).toBe(true);
    });
  });
});
