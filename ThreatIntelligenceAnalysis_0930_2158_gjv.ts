// 代码生成时间: 2025-09-30 21:58:32
 * ThreatIntelligenceAnalysis.ts
 *
 * This TypeScript program, built with APOLLO framework,
 * performs threat intelligence analysis.
 *
 * @author Your Name
 * @date Today's Date
 */

import { ApolloServer } from 'apollo-server';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { GraphQLError } from 'graphql';
import { formatError as formatApolloError } from 'apollo-server-errors';

// Load GraphQL type definitions and resolvers from the schema directory
const typeDefs = loadFilesSync('src/schema/**/*.graphql');
const resolvers = mergeResolvers(loadFilesSync('src/resolvers/**/*.ts'));

// Merge type definitions and resolvers
const schema = makeExecutableSchema({
  typeDefs: mergeTypeDefs(typeDefs),
  resolvers,
});

// Error handling function to format errors
const formatError = (error: GraphQLError) => {
  if (error.originalError) {
    return error.originalError.message;
  }
  return error.message;
};

// Create ApolloServer instance
const server = new ApolloServer({
  schema,
  formatError: formatApolloError,
  // Custom error formatting
  formatResponse: (response) => {
    if (response.errors) {
      response.errors = response.errors.map(formatError);
    }
    return response;
  },
  // Enable tracing for better performance insights
  tracing: true,
  // Enable cache control for improved caching
  cacheControl: {
    defaultMaxAge: 1000 * 60 * 5, // 5 minutes
  },
});

// Start the server
server.listen().then(({ url }) => {
  console.log(`🚀 Server is running at ${url}`);
}).catch((error) => {
  console.error('Server failed to start:', error);
});
