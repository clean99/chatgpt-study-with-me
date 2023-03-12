import { Test, TestingModule } from '@nestjs/testing';
import { KnowledgeGraphController } from './knowledge-graph.controller';
import { KnowledgeGraphService } from './knowledge-graph.service';
import { KnowledgeGraph } from '../models/knowledge-graph.model';
import { SessionContainer } from 'supertokens-node/recipe/session';

describe('KnowledgeGraphController', () => {
  let controller: KnowledgeGraphController;
  let service: KnowledgeGraphService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KnowledgeGraphController],
      providers: [
        {
          provide: KnowledgeGraphService,
          useValue: {
            getAllNodesAndEdges: jest.fn(() => new KnowledgeGraph([], [])),
          },
        },
      ],
    }).compile();

    controller = module.get<KnowledgeGraphController>(KnowledgeGraphController);
    service = module.get<KnowledgeGraphService>(KnowledgeGraphService);
  });

  describe('getAllNodesAndEdges', () => {
    it('should return a KnowledgeGraph object', async () => {
      const userId = 'test-user-id';
      const knowledgeGraph = new KnowledgeGraph([], []);
      const session: SessionContainer = { getUserId: () => userId } as any;
      jest
        .spyOn(service, 'getAllNodesAndEdges')
        .mockResolvedValue(knowledgeGraph);

      const result = await controller.getAllNodesAndEdges(session);

      expect(result).toBe(knowledgeGraph);
      expect(service.getAllNodesAndEdges).toHaveBeenCalledWith(userId);
    });
  });
});
