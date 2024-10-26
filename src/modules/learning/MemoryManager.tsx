// src/modules/learning/MemoryManager.tsx

import { Pinecone } from '@pinecone-database/pinecone';

export interface Embedding {
  vector: number[];
  metadata: Record<string, string | number | boolean>;
}

const client = new Pinecone();

/**
 * Ensures the example index is created if it doesn't already exist
 */
async function ensureIndexExists() {
  const indexName = 'example-index';
  const existingIndexes = (await client.listIndexes()) as unknown as string[];
  if (!existingIndexes.includes(indexName)) {
    await client.createIndex({
      name: indexName,
      dimension: 2,
      metric: 'cosine',
      spec: {
        serverless: {
          cloud: 'aws',
          region: 'us-east-1',
        },
      },
    });
  }
}

/**
 * Stores an embedding in the Pinecone vector database within a specified namespace.
 */
async function storeEmbedding(embedding: Embedding, namespace: string): Promise<boolean> {
  await ensureIndexExists();
  const index = client.index('example-index');
  await index.namespace(namespace).upsert([
    {
      id: `vec-${Date.now()}`,
      values: embedding.vector,
      metadata: embedding.metadata,
    },
  ]);
  return true;
}

/**
 * Retrieves embeddings similar to a given query vector within a specified namespace.
 */
async function retrieveEmbeddings(query: number[], namespace: string): Promise<Embedding[]> {
  await ensureIndexExists();
  const index = client.index('example-index');
  const response = await index.namespace(namespace).query({
    topK: 5,
    vector: query,
    includeValues: true,
    includeMetadata: true,
  });
  return response.matches.map(match => ({
    vector: match.values,
    metadata: match.metadata as Record<string, string | number | boolean>,
  }));
}

/**
 * Deletes the example index when no longer needed.
 */
async function deleteIndex() {
  const indexName = 'example-index';
  await client.deleteIndex(indexName);
}

// Define specific types for action parameters
type ManageMemoryParams =
  | { action: 'storeEmbedding'; embedding: Embedding; namespace: string }
  | { action: 'retrieveEmbeddings'; query: number[]; namespace: string }
  | { action: 'deleteIndex' };

/**
 * Helper function for exhaustive type checking.
 */
function assertNever(x: never): never {
  throw new Error(`Unexpected action type: ${x}`);
}

/**
 * Wrapper function to manage memory operations.
 */
export async function manageMemory(params: ManageMemoryParams): Promise<boolean | Embedding[] | void> {
  switch (params.action) {
    case 'storeEmbedding':
      return await storeEmbedding(params.embedding, params.namespace);
    case 'retrieveEmbeddings':
      return await retrieveEmbeddings(params.query, params.namespace);
    case 'deleteIndex':
      return await deleteIndex();
    default:
      return assertNever(params); // Ensures exhaustive check
  }
}
