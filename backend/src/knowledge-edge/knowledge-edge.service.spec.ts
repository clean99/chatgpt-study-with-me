import { Test, TestingModule } from '@nestjs/testing';
import { Driver } from 'neo4j-driver';
import {
  KnowledgeEdge,
  KnowledgeEdgeType,
} from '../models/knowledge-edge.model';
import { KnowledgeEdgeService } from './knowledge-edge.service';

jest.mock('neo4j-driver/lib/driver');

describe('KnowledgeEdgeService', () => {
  let service: KnowledgeEdgeService;
  let driver: Driver;

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
    }).compile();

    service = module.get<KnowledgeEdgeService>(KnowledgeEdgeService);
    driver = module.get<Driver>('Driver');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getEdges', () => {
    const nodeIds = ['1', '2'];
    const generateGetRecord = (key: string) => (path: string) => {
      if (path === 'from') return '1' + key;
      if (path === 'to') return '2' + key;
      if (path === 'type') return 'HAS_KNOWLEDGE';
    };
    it('should return an empty array when no edges exist between the provided nodes', async () => {
      // Arrange
      const session = {
        run: jest.fn().mockResolvedValue({ records: [] }),
        close: jest.fn(),
      };
      driver.session = jest.fn().mockReturnValue(session);

      // Act
      const result = await service.getEdges(nodeIds);

      // Assert
      expect(result).toEqual([]);
      expect(driver.session).toHaveBeenCalled();
      expect(session.run).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ nodeIds }),
      );
      expect(session.close).toHaveBeenCalled();
    });

    it('should return an array of edges when edges exist between the provided nodes', async () => {
      // Arrange
      const records = [
        {
          get: generateGetRecord('1'),
        },
        { get: generateGetRecord('2') },
      ];
      const session = {
        run: jest.fn().mockResolvedValue({ records }),
        close: jest.fn(),
      };
      driver.session = jest.fn().mockReturnValue(session);

      // Act
      const result = await service.getEdges(nodeIds);

      // Assert
      expect(result).toEqual([
        new KnowledgeEdge('11', '21', KnowledgeEdgeType.HAS_KNOWLEDGE),
        new KnowledgeEdge('12', '22', KnowledgeEdgeType.HAS_KNOWLEDGE),
      ]);
      expect(driver.session).toHaveBeenCalled();
      expect(session.run).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ nodeIds }),
      );
      expect(session.close).toHaveBeenCalled();
    });
  });

  describe('connect', () => {
    it('should return true when the query creates a new relationship', async () => {
      const from = 'node1';
      const to = 'node2';
      const type = KnowledgeEdgeType.HAS_KNOWLEDGE;

      const txRunMock = jest.fn().mockResolvedValue({
        records: [{ get: () => ({ toNumber: () => 1 }) }],
      });

      const executeWriteMock = jest
        .fn()
        .mockImplementation(
          async (callback) => await callback({ run: txRunMock }),
        );
      driver.session = jest.fn().mockReturnValue({
        executeWrite: executeWriteMock,
        close: jest.fn(),
      } as any);

      const result = await service.connect(from, to, type);

      expect(executeWriteMock).toHaveBeenCalledWith(expect.any(Function));
      expect(txRunMock).toHaveBeenCalledWith(expect.any(String), {
        from,
        to,
        type,
      });
      expect(result).toBe(true);
    });

    it('should return false when the query does not create a new relationship', async () => {
      const from = 'node1';
      const to = 'node2';
      const type = KnowledgeEdgeType.HAS_KNOWLEDGE;

      const txRunMock = jest.fn().mockResolvedValue({
        records: [{ get: () => ({ toNumber: () => 0 }) }],
      });

      const executeWriteMock = jest
        .fn()
        .mockImplementation(
          async (callback) => await callback({ run: txRunMock }),
        );

      driver.session = jest.fn().mockReturnValue({
        executeWrite: executeWriteMock,
        close: jest.fn(),
      } as any);

      const result = await service.connect(from, to, type);

      expect(executeWriteMock).toHaveBeenCalledWith(expect.any(Function));
      expect(txRunMock).toHaveBeenCalledWith(expect.any(String), {
        from,
        to,
        type,
      });
      expect(result).toBe(false);
    });
  });

  describe('disconnect', () => {
    const from = 'node1';
    const to = 'node2';
    const type = KnowledgeEdgeType.HAS_KNOWLEDGE;
    it('should delete the edge and return true', async () => {
      // Arrange
      const session = {
        executeWrite: jest.fn().mockResolvedValue({
          records: [
            {
              get: () => ({
                toNumber: () => 1,
              }),
            },
          ],
        }),
        close: jest.fn(),
      };
      driver.session = jest.fn().mockReturnValue(session);

      // Act
      const result = await service.disconnect(from, to, type);

      // Assert
      expect(driver.session).toHaveBeenCalled();
      expect(session.executeWrite).toHaveBeenCalledWith(expect.any(Function));
      expect(session.close).toHaveBeenCalled();
      expect(result).toBe(true);
    });

    it('should not delete the edge and return false when edge is not found', async () => {
      // Arrange
      const session = {
        executeWrite: jest.fn().mockResolvedValue({
          records: [
            {
              get: () => ({
                toNumber: () => 0,
              }),
            },
          ],
        }),
        close: jest.fn(),
      };

      driver.session = jest.fn().mockReturnValue(session);

      // Act
      const result = await service.disconnect(from, to, type);

      // Assert
      expect(driver.session).toHaveBeenCalled();
      expect(session.executeWrite).toHaveBeenCalledWith(expect.any(Function));
      expect(session.close).toHaveBeenCalled();
      expect(result).toBe(false);
    });
  });
});
