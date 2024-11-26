import gql from 'graphql-tag';

const typeDefs = gql`
  type Movie {
    id: ID!
    title: String!
    description: String
    releaseDate: String!
    genres: [Genre!]
    reviews: [Review]
    rating: Float
  }

  input CreateMovieInput {
    title: String!
    description: String
    releaseDate: String!
    genres: [String!]
  }

  input UpdateMovieInput {
    title: String
    description: String
    releaseDate: String
    genres: [String!]
  }

  type Query {
    movie(id: ID!): Movie
    movies(id: [ID]!): [Movie]
  }

  type Mutation {
    createUser(input: CreateMovieInput!): Movie
    updateMovie(id: ID!, input: UpdateMovieInput!): Movie
    deleteUser(id: ID!): Boolean
  }
`;
export default typeDefs;