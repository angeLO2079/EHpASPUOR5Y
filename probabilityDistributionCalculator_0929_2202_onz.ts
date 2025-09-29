// 代码生成时间: 2025-09-29 22:02:49
import { ApolloServer } from 'apollo-server';
import { gql } from 'apollo-server-core';
import { DocumentNode } from 'graphql';

// Define the GraphQL schema
const typeDefs: DocumentNode = gql"""
  type Query {
    normalDistribution(mean: Float!, standardDeviation: Float!, value: Float!): Float
    binomialDistribution(n: Int!, p: Float!, k: Int!): Float
    poissonDistribution(lambda: Float!, k: Int!): Float
  }
""";

// Define the resolvers
const resolvers = {
  Query: {
    normalDistribution: (_parent, args) => {
      const { mean, standardDeviation, value } = args;
      const z = (value - mean) / standardDeviation;
      return 1 / (standardDeviation * Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * z * z);
    },
    binomialDistribution: (_parent, args) => {
      const { n, p, k } = args;
      if (k < 0 || k > n) {
        throw new Error('k must be between 0 and n');
      }
      const binomialCoefficient = Math.factorial(n) / (Math.factorial(k) * Math.factorial(n - k));
      const probability = Math.pow(p, k) * Math.pow(1 - p, n - k);
      return binomialCoefficient * probability;
    },
    poissonDistribution: (_parent, args) => {
      const { lambda, k } = args;
      if (k < 0) {
        throw new Error('k must be a non-negative integer');
      }
      return Math.exp(-lambda) * Math.pow(lambda, k) / Math.factorial(k);
    }
  }
};

// Create the ApolloServer instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true
});

// Start the server
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});