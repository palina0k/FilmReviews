import gql from 'graphql-tag';

const typeDefs = gql`
  type Genre {
    id: ID!
    name: String!
    movies: [Movie!]!
  }
  # not updated below this

  input GenreInput {
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