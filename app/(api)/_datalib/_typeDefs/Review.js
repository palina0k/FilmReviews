import gql from 'graphql-tag';

const typeDefs = gql`
  type Review {
    id: ID!
    user: User!
    movie: Movie!
    content: String
    genres: [Genre!]!
    rating: Int!
    createdAt: String!
  }

  input CreateReviewInput {
    userId: ID!
    movieId: ID!
    content: String
    rating: Int!
  }

  type Query {
    review(id: ID!): Review
    reviews(ids: [ID]!): [Review]
  }

  type Mutation {
    createReview(input: CreateReviewInput!): Review
    deleteReview(id: ID!): Boolean
  }
`;
export default typeDefs;