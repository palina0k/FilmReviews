import Reviews from '../_services/Reviews.js';

const resolvers = {
    Review: {
        user: ({ userId }) => Reviews.getUser({ userId }),
        movie: ({movieId }) => Reviews.getMovie({ movieId }),
        genres: ({ id }) => Reviews.getGenres({ id }),
    },
    Query: {
        review: (_, { id }) => Reviews.find({ id }),
        reviews: (_, { ids }) => Reviews.findMany({ ids }),
    },
    Mutation: {
        createReview: (_, { input }) => Reviews.create({ input }),
        deleteReview: (_, { id }) => Reviews.delete({ id }),
    },
};

export default resolvers;