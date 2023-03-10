import { Test, TestingModule } from '@nestjs/testing';
import { KnowledgeNodeService } from './knowledge-node.service';
import { Driver } from 'neo4j-driver';

jest.mock('neo4j-driver/lib/driver');

describe('KnowledgeNodeService', () => {
  let service: KnowledgeNodeService;
  let mockDriver: jest.Mocked<Driver>;
  const mockGetGenerator = (key: string) =>
    jest.fn((field) => {
      if (field === 'id') return 'node-id' + key;
      if (field === 'label') return 'Node Title' + key;
      if (field === 'completed') return false;
      if (field === 'parentId') return null;
      if (field === 'createdAt') return new Date('2022-02-25T12:00:00.000Z');
      if (field === 'updatedAt') return new Date('2022-02-25T12:00:00.000Z');
    });
  const mockRecordGenerator = (key: string) => ({
    id: 'node-id' + key,
    label: 'Node Title' + key,
    completed: false,
    createdAt: new Date('2022-02-25T12:00:00.000Z'),
    updatedAt: new Date('2022-02-25T12:00:00.000Z'),
  });
  const userId = 'user-id';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<KnowledgeNodeService>(KnowledgeNodeService);
    mockDriver = module.get<Driver>('Driver') as jest.Mocked<Driver>;
  });

  describe('getNodes', () => {
    it('should return an array of knowledge nodes', async () => {
      // Arrange
      const records = [
        {
          get: jest.fn(mockGetGenerator('1')),
        },
      ];
      const session = {
        run: jest.fn().mockResolvedValue({ records }),
        close: jest.fn(),
      };
      (mockDriver.session as jest.Mock).mockReturnValue(session);

      // Act
      const result = await service.getNodes(userId);

      // Assert
      expect(mockDriver.session).toHaveBeenCalledTimes(1);
      expect(session.run).toHaveBeenCalledTimes(1);
      expect(session.run).toHaveBeenCalledWith(
        `MATCH (user:User {id: $userId})-[:HAS_KNOWLEDGE_NODE]->(node:KnowledgeNode)
       RETURN node.id as id, node.label as label, node.completed as completed, node.createdAt as createdAt, node.updatedAt as updatedAt`,
        { userId },
      );
      expect(session.close).toHaveBeenCalledTimes(1);
      expect(result).toEqual([mockRecordGenerator('1')]);
    });
  });
  describe('getNodesByParentIds', () => {
    it('should return an array of KnowledgeNode objects that have the specified parentIds', async () => {
      const mockRecords = [
        {
          get: mockGetGenerator('1'),
        },
        {
          get: mockGetGenerator('2'),
        },
      ];
      const mockResult = {
        records: mockRecords,
      };

      const session = {
        run: jest.fn().mockResolvedValue(mockResult),
        close: jest.fn(),
      };
      (mockDriver.session as jest.Mock).mockReturnValue(session);

      const nodes = await service.getNodesByParentIds('user-id', [
        'parent-id-1',
        'parent-id-2',
      ]);

      expect(mockDriver.session).toHaveBeenCalled();
      expect(session.run).toHaveBeenCalledWith(
        `MATCH (user:User {id: $userId})-[:HAS_KNOWLEDGE_NODE]->(node:KnowledgeNode)-[:KNOWLEDGE_NODE_RELATION]->(parent:KnowledgeNode)
       WHERE parent.id IN $parentNodeIds
       RETURN node.id as id, node.label as label, node.completed as completed, node.createdAt as createdAt, node.updatedAt as updatedAt`,
        { userId: 'user-id', parentNodeIds: ['parent-id-1', 'parent-id-2'] },
      );
      expect(session.close).toHaveBeenCalledWith();
      expect(nodes).toEqual([
        mockRecordGenerator('1'),
        mockRecordGenerator('2'),
      ]);
    });
  });

  describe('getRootNodes', () => {
    it('should return an array of root knowledge nodes', async () => {
      // Arrange
      const records = [
        {
          get: mockGetGenerator('1'),
        },
      ];
      const session = {
        run: jest.fn().mockResolvedValue({ records }),
        close: jest.fn(),
      };
      (mockDriver.session as jest.Mock).mockReturnValue(session);

      // Act
      const result = await service.getRootNodes(userId);

      // Assert
      expect(mockDriver.session).toHaveBeenCalledTimes(1);
      expect(session.run).toHaveBeenCalledTimes(1);
      expect(session.run).toHaveBeenCalledWith(
        `MATCH (user:User {id: $userId})-[:HAS_KNOWLEDGE_NODE]->(node:KnowledgeNode)
       WHERE NOT (node)-[:KNOWLEDGE_NODE_RELATION]->()
       RETURN node.id as id, node.label as label, node.completed as completed, node.createdAt as createdAt, node.updatedAt as updatedAt`,
        { userId },
      );
      expect(session.close).toHaveBeenCalledTimes(1);
      expect(result).toEqual([mockRecordGenerator('1')]);
    });
  });

  describe('updateNode', () => {
    it('should update a knowledge node and return the updated node', async () => {
      // Arrange
      const nodeId = 'node-id';
      const nodeData = {
        label: 'Updated Title',
        completed: true,
      };
      const record = {
        get: mockGetGenerator('1'),
      };
      const session = {
        run: jest.fn().mockResolvedValue({ records: [record] }),
        close: jest.fn(),
      };
      (mockDriver.session as jest.Mock).mockReturnValue(session);

      // Act
      const result = await service.updateNode(userId, nodeId, nodeData);

      // Assert
      expect(mockDriver.session).toHaveBeenCalledTimes(1);
      expect(session.run).toHaveBeenCalledTimes(1);
      expect(session.close).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockRecordGenerator('1'));
    });
  });
  describe('deleteNode', () => {
    it('should delete a node and return true', async () => {
      const session = {
        run: jest
          .fn()
          .mockResolvedValue({ summary: { counters: { nodesDeleted: 1 } } }),
        close: jest.fn(),
      };
      (mockDriver.session as jest.Mock).mockReturnValue(session);

      const result = await service.deleteNode('user-id', 'node-id');

      expect(mockDriver.session).toHaveBeenCalled();
      expect(session.run).toHaveBeenCalledWith(
        `MATCH (user:User {id: $userId})-[:HAS_KNOWLEDGE_NODE]->(node:KnowledgeNode {id: $nodeId})
       DETACH DELETE node`,
        { userId: 'user-id', nodeId: 'node-id' },
      );
      expect(session.close).toHaveBeenCalled();
      expect(result).toEqual(true);
    });

    it('should return false if no node was deleted', async () => {
      const session = {
        run: jest
          .fn()
          .mockResolvedValue({ summary: { counters: { nodesDeleted: 0 } } }),
        close: jest.fn(),
      };
      (mockDriver.session as jest.Mock).mockReturnValue(session);

      const result = await service.deleteNode('user-id', 'node-id');

      expect(mockDriver.session).toHaveBeenCalled();
      expect(session.run).toHaveBeenCalledWith(
        `MATCH (user:User {id: $userId})-[:HAS_KNOWLEDGE_NODE]->(node:KnowledgeNode {id: $nodeId})
       DETACH DELETE node`,
        { userId: 'user-id', nodeId: 'node-id' },
      );
      expect(session.close).toHaveBeenCalled();
      expect(result).toEqual(true);
    });
  });

  describe('postDiff', () => {
    it('should delete nodes', async () => {
      const deletedNodes = ['1', '2', '3'];
      const deleteNodeMock = jest.spyOn(service, 'deleteNode');
      deleteNodeMock.mockImplementation(() => Promise.resolve(true));
      const session = {
        run: jest.fn(),
        close: jest.fn(),
      };
      (mockDriver.session as jest.Mock).mockReturnValue(session);

      await service.postDiff(userId, {
        added: [],
        deleted: deletedNodes,
        updated: [],
      });

      expect(deleteNodeMock).toHaveBeenCalledTimes(deletedNodes.length);
      for (const nodeId of deletedNodes) {
        expect(deleteNodeMock).toHaveBeenCalledWith(userId, nodeId);
      }
    });

    it('should create nodes', async () => {
      const addedNodes = [
        {
          id: '1',
          label: 'node 1',
          completed: false,
        },
        {
          id: '2',
          label: 'node 2',
          completed: true,
        },
      ];
      const createNodeMock = jest.spyOn(service, 'createNode');
      createNodeMock.mockImplementation(() => Promise.resolve(addedNodes[0]));
      const session = {
        run: jest.fn(),
        close: jest.fn(),
      };
      (mockDriver.session as jest.Mock).mockReturnValue(session);

      await service.postDiff(userId, {
        added: addedNodes,
        deleted: [],
        updated: [],
      });

      expect(createNodeMock).toHaveBeenCalledTimes(addedNodes.length);
      for (const node of addedNodes) {
        expect(createNodeMock).toHaveBeenCalledWith(userId, {
          id: node.id,
          label: node.label,
          completed: node.completed,
        });
      }
    });

    it('should update nodes', async () => {
      const updatedNodes = [
        {
          id: '1',
          label: 'new label',
          completed: false,
        },
        {
          id: '2',
          label: 'updated label',
          completed: true,
        },
      ];
      const updateNodeMock = jest.spyOn(service, 'updateNode');
      updateNodeMock.mockImplementation(() => Promise.resolve(updatedNodes[0]));
      const session = {
        run: jest.fn(),
        close: jest.fn(),
      };
      (mockDriver.session as jest.Mock).mockReturnValue(session);

      await service.postDiff(userId, {
        added: [],
        deleted: [],
        updated: updatedNodes,
      });

      expect(updateNodeMock).toHaveBeenCalledTimes(updatedNodes.length);
      for (const node of updatedNodes) {
        expect(updateNodeMock).toHaveBeenCalledWith(userId, node.id, {
          label: node.label,
          completed: node.completed,
        });
      }
    });
  });
});
