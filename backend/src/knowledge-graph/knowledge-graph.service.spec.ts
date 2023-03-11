import { Test, TestingModule } from '@nestjs/testing';
import { KnowledgeNodeService } from '../knowledge-node/knowledge-node.service';
import { KnowledgeEdgeService } from '../knowledge-edge/knowledge-edge.service';
import { KnowledgeGraphService } from './knowledge-graph.service';
import { KnowledgeEdgeType } from '../models/knowledge-edge.model';

describe('KnowledgeGraphService', () => {
  let service: KnowledgeGraphService;
  let nodeService: KnowledgeNodeService;
  let edgeService: KnowledgeEdgeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        KnowledgeGraphService,
        {
          provide: KnowledgeNodeService,
          useValue: {
            getNodes: jest.fn(() => []),
          },
        },
        {
          provide: KnowledgeEdgeService,
          useValue: {
            getEdges: jest.fn(() => []),
          },
        },
      ],
    }).compile();

    service = module.get<KnowledgeGraphService>(KnowledgeGraphService);
    nodeService = module.get<KnowledgeNodeService>(KnowledgeNodeService);
    edgeService = module.get<KnowledgeEdgeService>(KnowledgeEdgeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllNodesAndEdges', () => {
    it('should return a KnowledgeGraph object with nodes and edges arrays', async () => {
      const userId = 'test-user-id';
      const nodes = [
        {
          id: '1',
          label: 'Test Node 1',
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      const edges = [
        {
          from: '1',
          to: '2',
          type: KnowledgeEdgeType.HAS_KNOWLEDGE,
        },
      ];
      jest.spyOn(nodeService, 'getNodes').mockResolvedValue(nodes);
      jest.spyOn(edgeService, 'getEdges').mockResolvedValue(edges);

      const result = await service.getAllNodesAndEdges(userId);

      expect(result).toEqual({
        nodes,
        edges,
      });
      expect(result.nodes).toEqual(nodes);
      expect(result.edges).toEqual(edges);
    });
  });
});
