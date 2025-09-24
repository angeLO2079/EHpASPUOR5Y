// 代码生成时间: 2025-09-24 21:23:14
import { ApolloServer, gql } from 'apollo-server';
import { formatError } from 'apollo-errors';

// Define the schema for the API
const typeDefs = gql"""
  type Query {
    greet(name: String): Greeting
  }

  type Greeting {
    message: String
  }
""";

// Define the resolvers for the API
const resolvers = {
  Query: {
    greet: async (_, { name }) => {
      if (!name) {
        // Handle the error case where name is not provided
        throw new Error('Name is required for greeting');
      }
      return {
        message: `Hello, ${name}!`,
      };
    },
  },
};

// Create an instance of ApolloServer with the typeDefs and resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (error) => {
    // Format error messages to be more informative
    return new Error("Internal Server Error");
  },
  context: () => ({
    // You can attach any additional context here if needed
  }),
});

// Start the server
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
