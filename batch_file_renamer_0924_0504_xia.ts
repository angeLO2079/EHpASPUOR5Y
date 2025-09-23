// 代码生成时间: 2025-09-24 05:04:20
 * It is designed to be extensible and maintainable using TypeScript and the APOLLO framework.
 */

import { ApolloServer } from 'apollo-server';
import { readFileSync } from 'fs';
import { join } from 'path';
import { makeExecutableSchema } from 'graphql-tools';
import { fileLoader, mergeTypes } from 'merge-graphql-schemas';
import { ensureDir } from 'fs-extra';
import { promisify } from 'util';
import glob from 'glob-promise';

// Define GraphQL types and resolvers
const typeDefs = mergeTypes(fileLoader(join(__dirname, './schema')));

// Define resolvers
const resolvers = {
  Query: {
    renameFiles: async (_, { directory, pattern }: { directory: string; pattern: string }) => {
      try {
        // Ensure the directory exists
        await ensureDir(directory);

        // Find all files in the specified directory matching the pattern
        const files = await glob(`${directory}/**/*`, { nodir: true });

        // Rename files based on the pattern
        for (const file of files) {
          const stats = await promisify(readdir)(file, { withFileTypes: true });
          const newFilename = pattern.replace('{filename}', file.split('/').pop());
          const newFilePath = join(directory, newFilename);
          await promisify(rename)(file, newFilePath);
        }

        return 'Files renamed successfully';
      } catch (error) {
        throw new Error(`Error renaming files: ${error.message}`);
      }
    },
  },
};

// Create Apollo Server instance
const server = new ApolloServer({
  schema: makeExecutableSchema({ typeDefs, resolvers }),
});

// Start the server
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
