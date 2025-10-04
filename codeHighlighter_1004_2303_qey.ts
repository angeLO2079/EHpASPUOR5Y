// 代码生成时间: 2025-10-04 23:03:35
// Import necessary modules and dependencies from APOLLO
import { gql, makeExecutableSchema } from 'apollo-server-express';
import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';
import * as Prism from 'prismjs';
import * as PrismLoader from 'prismjs/components/';

// Define GraphQL type definitions for the code syntax highlighter
const typeDefs: gql = gql`
  type Query {
    """
    Get syntax highlighted code for a given language.
    """
    highlightCode(language: String!, code: String!): String
  }
`;

// Define resolvers for the GraphQL schema
const resolvers = {
  Query: {
    highlightCode: async (_, { language, code }) => {
      try {
        // Check if the language is supported by PrismJS
        if (!Prism.languages.hasOwnProperty(language)) {
          throw new Error('Unsupported language');
        }
        const PrismLanguage: any = PrismLoader(language);
        Prism.languages[language] = PrismLanguage;
        return Prism.highlight(code, Prism.languages[language], language);
      } catch (error) {
        // Handle any errors that occur during highlight processing
        console.error(error);
        throw new Error('Failed to highlight code');
      }
    },
  },
};

// Create the GraphQL executable schema with type definitions and resolvers
const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Export the schema to be used by the Apollo Server
export { schema };