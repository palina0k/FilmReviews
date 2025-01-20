import gql from 'graphql-tag';

const typeDefs = gql`
  type Movie {
    id: ID!
    title: String!
    description: String
    releaseDate: String
    reviews: [Review!]!
    genres: [Genre!]!
    createdAt: String!
    updatedAt: String!
  }

  input CreateMovieInput {
    title: String!
    description: String
    releaseDate: String
  }

  input UpdateMovieInput {
    title: String
    description: String
    releaseDate: String
  }

  type Query {
    movie(id: ID!): Movie
    movies(id: [ID]!): [Movie]
    searchMovies(search: String!): [Movie!]!
  }

  type Mutation {
    createMovie(input: CreateMovieInput!): Movie
    updateMovie(id: ID!, input: UpdateMovieInput!): Movie
    deleteMovie(id: ID!): Boolean
  }
`;
export default typeDefs;