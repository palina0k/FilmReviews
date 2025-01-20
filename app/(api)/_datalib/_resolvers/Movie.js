import Movies from '../_services/Movies.js'

const resolvers = {
     Movie: {
      reviews: ({ id }) => Movies.getReviews({ id }),  
      genres: ({ id }) => Movies.getGenres({ id }),
     },
     Query: {
        movie: (_, { id }) => Movies.find({ id }),
        movies: (_, { ids }) => Movies.findMany({ ids }),
        searchMovies: (_, { search }) => Movies.search({ search }),
     },
     Mutation: {
        createMovie: (_, { input }) => Movies.create({ input }),
        updateMovie: (_, { id, input }) => Movies.update({ id, input }),
        deleteMovie: (_, { id }) => Movies.delete({ id }),
     },
};

export default resolvers;