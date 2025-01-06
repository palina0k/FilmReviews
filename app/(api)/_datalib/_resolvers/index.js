import { mergeResolvers } from '@graphql-tools/merge';

import User from './User.js';
import Review from './Review.js';
import Playlist from './Playlist.js';
import Movie from './Movie.js';
import Genre from './Genre.js';

const allResolvers = [];

const modules = [User, Review, Playlist, Movie, Genre];
modules.forEach((module) => {
  allResolvers.push(module);
});

const resolvers = mergeResolvers(allResolvers);

export default resolvers;
