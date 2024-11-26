import gql from 'graphql-tag';

const typeDefs = gql`
  type Like {
    id: ID!
    user: String!
    review: Review!
    createdAt: String!
  }
  # not updated below this

  input LikeInput {
    name: String!
  }

  type Query {
    playlist(id: ID!): Playlist
    playlists: [Playlist]
  }

  type Mutation {
    createPlaylist(userId: ID!, input: PlaylistInput!): Playlist
    addSong(playlistId: ID!, songId: ID!): Boolean
  }
`;
export default typeDefs;