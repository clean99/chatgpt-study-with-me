import neo4j from 'neo4j-driver';

export const neo4jProviderFactory = async () => {
  const { NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD } = process.env;

  return neo4j.driver(
    NEO4J_URI,
    neo4j.auth.basic(NEO4J_USERNAME, NEO4J_PASSWORD),
  );
};
