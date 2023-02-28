import { Test, TestingModule } from '@nestjs/testing';
import { Driver } from 'neo4j-driver-core';
import {
  KnowledgeEdge,
  KnowledgeEdgeType,
} from '../models/knowledge-edge.model';
import { KnowledgeEdgeController } from './knowledge-edge.controller';
import { KnowledgeEdgeService } from './knowledge-edge.service';

jest.mock('neo4j-driver/lib/driver');

describe('KnowledgeEdgeController', () => {
  let controller: KnowledgeEdgeController;
  let service: KnowledgeEdgeService;
  const sourceStub = 'node1';
  const targetStub = 'node2';
  const typeStub = KnowledgeEdgeType.BEFORE_KNOWLEDGE;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        KnowledgeEdgeService,
        {
          provide: 'Driver',
          useValue: {
            session: jest.fn(),
            close: jest.fn(),
          },
        },
      ],
      controllers: [KnowledgeEdgeController],
    }).compile();

    controller = module.get<KnowledgeEdgeController>(KnowledgeEdgeController);
    service = module.get<KnowledgeEdgeService>(KnowledgeEdgeService);
  });

  describe('getEdges', () => {
    it('should call edgeService.getEdges with the correct parameter', async () => {
      const nodeIds = ['node1', 'node2'];
      jest.spyOn(service, 'getEdges').mockResolvedValue([]);
      await controller.getEdges(nodeIds);
      expect(service.getEdges).toHaveBeenCalledWith(nodeIds);
    });
  });

  describe('createEdge', () => {
    it('should call edgeService.connect with the correct parameters', async () => {
      jest.spyOn(service, 'connect').mockResolvedValue(true);
      await controller.createEdge(sourceStub, targetStub, typeStub);
      expect(service.connect).toHaveBeenCalledWith(
        sourceStub,
        targetStub,
        typeStub,
      );
    });

    it('should return true when edge is successfully created', async () => {
      jest.spyOn(service, 'connect').mockResolvedValue(true);
      const result = await controller.createEdge(
        sourceStub,
        targetStub,
        typeStub,
      );
      expect(result).toBe(true);
    });

    it('should return false when edge creation fails', async () => {
      jest.spyOn(service, 'connect').mockResolvedValue(false);
      const result = await controller.createEdge(
        sourceStub,
        targetStub,
        typeStub,
      );
      expect(result).toBe(false);
    });
  });

  describe('deleteEdge', () => {
    it('should call edgeService.disconnect with the correct parameters', async () => {
      jest.spyOn(service, 'disconnect').mockResolvedValue(true);

      const result = await controller.deleteEdge(
        sourceStub,
        targetStub,
        typeStub,
      );
      expect(service.disconnect).toHaveBeenCalledWith(
        sourceStub,
        targetStub,
        typeStub,
      );
      expect(result).toBe(true);
    });
  });
});
