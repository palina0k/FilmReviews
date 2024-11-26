import gql from 'graphql-tag';

const typeDefs = gql`
  type Review {
    id: ID!
    content: String!
    rating: Int!
    author: User!
    movie: Movie!
    likes: Int!
    createdAt: String!
    updatedAt: String!
  }

  input CreateReviewInput {
    movieId: ID!
    content: String!
    rating: Int!
  }
  
  input UpdateReviewInput {
    content: String
    rating: Int
  }

  type Query {
    review(id: ID!): Review
    reviewsByMovie(movieId: ID!): [Review]
    reviewsByUser(userId: ID!): [Review]
  }

  type Mutation {
    createReview(input: CreateReviewInput!): Review
    updateReview(id: ID!, input: updateReviewInput!): Review
    deleteReview(id: ID!): Boolean
    likeReview(id: ID!): Review
  }
`;
export default typeDefs;