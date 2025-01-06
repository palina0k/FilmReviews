import gql from 'graphql-tag';

const typeDefs = gql`
  type Playlist {
    id: ID!
    name: String!
    user: User!
    movies: [Movie!]!
    isPublic: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  input CreatePlaylistInput {
    name: String!
    userId: ID!
    movieIds: [ID!]
    isPublic: Boolean!
  }

  input UpdatePlaylistInput {
    name: String
    movieIds: [ID!]
    isPublic: Boolean
  }

  type Query {
    playlist(id: ID!): Playlist
    playlistsByUser(userId: ID!): [Playlist]
  }

  type Mutation {
    createPlaylist(id: ID!, input: CreatePlaylistInput!): Playlist
    updatePlaylist(id: ID!, input: UpdatePlaylistInput!): Playlist
    deletePlaylist(is: ID!): Boolean
    addMovieToPlaylist(playlistId: ID!, movieId: ID!): Playlist
  }
`;
export default typeDefs;
