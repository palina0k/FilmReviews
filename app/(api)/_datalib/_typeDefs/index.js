import { mergeTypeDefs } from '@graphql-tools/merge';

import User from './User.js';
import Review from './Review.js';
import Playlist from './Playlist.js';
import Movie from './Movie.js';
import Genre from './Genre.js';

const allTypeDefs = [];

const modules = [User, Review, Playlist, Movie, Genre];
modules.forEach((module) => {
  allTypeDefs.push(module);
});

const typeDefs = mergeTypeDefs(allTypeDefs);

export default typeDefs;
