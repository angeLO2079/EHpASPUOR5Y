// 代码生成时间: 2025-10-11 01:46:18
import { ApolloServer, gql } from 'apollo-server';

// Define the type for the query
const typeDefs = gql`
  type Query {
    random(min: Int, max: Int): Float
  }
`;

// Resolvers map the operation names to the functions that contain the logic
// to fetch the query results.
const resolvers = {
  Query: {
    random: (_parent: any, args: { min: number; max: number }) => {
      // Error handling for invalid range
      if (args.min >= args.max) {
        throw new Error('max must be greater than min');
      }
      // Generate a random number within the provided range
      return Math.random() * (args.max - args.min) + args.min;
    },
  },
};

// Instantiate Apollo Server with type definitions and resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // Other configurations can be added here
});

// Start the server and listen on port 4000
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});