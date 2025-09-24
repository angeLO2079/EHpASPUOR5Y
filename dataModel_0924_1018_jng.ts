// 代码生成时间: 2025-09-24 10:18:50
 * to ensure code maintainability and scalability.
 */

import { ApolloServer, gql } from 'apollo-server';

// Define a sample data model with type definitions
interface UserData {
  id: string;
  name: string;
  email: string;
}

// Sample data to simulate a database
const users: UserData[] = [
  { id: '1', name: 'John Doe', email: 'john.doe@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com' },
];

// Define a type for the Query
type Query = {
  getUser: UserData;
},

// Define the type definitions
const typeDefs = gql`
  type Query {
    getUser(id: ID!): UserData
  }

  type UserData {
    id: ID!
    name: String
    email: String
  }
`;

// Resolver map defines the techniques for fetching the types defined in the schema
const resolvers = {
  Query: {
    getUser: (_, { id }) => {
      const user = users.find(u => u.id === id);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    },
  },
};

// Create Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the server
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
