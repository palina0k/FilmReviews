import gql from 'graphql-tag';

const typeDefs = gql`
  type Playlist {
    id: ID!
    name: String!
    description: String
    movies: [Movie]
    creator: User!
    isPrivate: Boolean!
    createdAt: String!
    updatedAt: String
  }

  input createPlaylistInput {
    name: String!
    description: String
    movieIds: [ID!]!
    isPrivate: Boolean!
  }

  input UpdatePlaylistInput {
    name: String
    description: String
    movieIds: [ID!]
    isPrivate: Boolean
  }

  type Query {
    playlist(id: ID!): Playlist
    playlistsByUser(userId: ID!): [Playlist]
  }

  type Mutation {
    createPlaylist(userId: ID!, input: CreatePlaylistInput!): Playlist
    updatePlaylist(userId: ID!, input: UpdatePlaylistInput!): Playlist
    addSong(playlistId: ID!): Boolean
  }
`;
export default typeDefs;
