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

  input AddMovieToPlaylistInput {
    movie: CreateMovieInput!
    review: CreateReviewInput!
  }

  type Query {
    playlist(id: ID!): Playlist
    playlistsByUser(userId: ID!): [Playlist]
    searchPlaylists(search: String!): [Playlist!]!
  }

  type Mutation {
    createPlaylist( input: CreatePlaylistInput!): Playlist
    updatePlaylist(id: ID!, input: UpdatePlaylistInput!): Playlist
    deletePlaylist(id: ID!): Boolean
    addMovieToPlaylist(playlistId: String!, movieId: String!): Playlist
  }
`;
export default typeDefs;
