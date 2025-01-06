import gql from 'graphql-tag';

const typeDefs = gql`
  type Genre {
    id: ID!
    name: String!
    movies: [Movie!]!
    reviews: [Review!]!
  }

  input CreateGenreInput {
    name: String!
  }

  type Query {
    genre(id: ID!): Genre
    genres(ids: [ID]!): [Genre]
  }

  type Mutation {
    createGenre(input: CreateGenreInput!): Genre
    deleteGenre(id: ID!): Boolean
  }
`;
export default typeDefs;