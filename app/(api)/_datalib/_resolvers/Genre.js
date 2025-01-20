import Genres from '../_services/Genres.js';

const resolvers = {
    Genre: {
        movies: ({ id }) => Genres.getMovies({ id }),
        reviews: ({ id }) => Genres.getReviews({ id }),
    },
    Query: {
        genre: (_, { id } ) => Genres.find({ id }),
        genres: (_, { ids }) => Genres.findMany({ ids }),
    },
    Mutation: {
        createGenre: (_, { input }) => Genres.create({ input }),
        deleteGenre: (_, { id }) => Genres.delete({ id }),
    },
};

export default resolvers;