const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLID,
} = require('graphql');

const movies = [
  { id: 1, name: 'Pulp Fiction', genre: 'Crime', directorId: 1 },
  { id: 2, name: '1984', genre: 'Sci-fi', directorId: 2 },
  { id: 3, name: 'V for vendetta', genre: 'Sci-fi', directorId: 3 },
  { id: 4, name: 'Snatch', genre: 'Crime-comedy', directorId: 4 },
];

const directors = [
  { id: 1, name: 'Tarantino', age: 55 },
  { id: 2, name: 'Radford', age: 72 },
  { id: 3, name: 'McTeigue', age: 51 },
  { id: 4, name: 'Ritchie', age: 50 },
];

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    director: {
      type: DirectorType,
      resolve(parent, args) {
        return directors.find((director) => director.id == parent.id);
      },
    },
  }),
});

const DirectorType = new GraphQLObjectType({
  name: 'Director',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return movies.find((movie) => movie.id == args.id);
      },
    },

    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return directors.find((director) => director.id == args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: Query,
});
