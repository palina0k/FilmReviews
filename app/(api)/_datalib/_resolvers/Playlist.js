import Playlists from '../_services/Playlists.js';

const resolvers = {
    Playlist: {
      user: ({ userId }) => Playlists.getUser({ userId }),
      movies: ({ id }) => Playlists.getMovies({ id }),
    },
    Query: {
      playlist: (_, { id }) => Playlists.find({ id }),
      playlistsByUser: (_, { userId }) => Playlists.findMany({ userId }),
      searchPlaylists: (_, { search }) => Playlists.search({ search }),
    },
    Mutation: {
      createPlaylist: (_, { input }) => Playlists.create({ input }),
      updatePlaylist: (_, {id, input }) => Playlists.update({ id, input }),
      deletePlaylist: (_, { id }) => Playlists.delete({ id }),
      addMovieToPlaylist: (_, { playlistId, movieId }) => Playlists.addMovie({ playlistId, movieId }),
    },
  };
  
  export default resolvers;
