import gql from 'graphql-tag';

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    reviews: [Review!]!
    playlists: [Playlist!]!
    createdAt: String!
    updatedAt: String!
  }

  input CreateUserInput {
    username: String!
    email: String!
    password: String!
  }

  input UpdateUserInput {
    username: String
    email: String
    password: String
  }

  type Query {
    user(id: ID!): User
    users(ids: [ID]!): [User]
    findUserByEmail(email: String!): User
  }

  type Mutation {
    createUser(input: CreateUserInput!): User
    updateUser(id: ID!, input: UpdateUserInput!): User
    deleteUser(id: ID!): Boolean
    loginUser(email: String!, password: String!): User
  }
`;
export default typeDefs;
