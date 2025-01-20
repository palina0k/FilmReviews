import Users from '../_services/Users.js';
import bcrypt from 'bcrypt';

const resolvers = {
  User: {
    playlists: ({ id }) => Users.getPlaylists({ id }),
    reviews: ({ id }) => Users.getReviews({ id }),
  },
  Query: {
    user: (_, { id }) => Users.find({ id }).then((user) => {
      const {password, ...rest} = user;
      return rest;
    }),
    users: (_, { ids }) => Users.findMany({ ids }).then((users) => 
      users.map(({password, ...rest}) => rest)
    ),
    findUserByEmail: (_, { email }) => Users.findByEmail({ email }).then((user) => {
      if(!user) throw new Error('User not found.');
      const { password, ...rest } = user;
      return rest;
    }),
  },
  Mutation: {
    createUser: (_, { input }) => Users.create({ input }),
    updateUser: (_, { id, input }) => Users.update({ id, input }),
    deleteUser: (_, { id }) => Users.delete({ id }),
    loginUser: async (_, { email, password }) => {
      try {
        // Find user by email
        const user = await Users.findByEmail({ email });
        if (!user) {
          throw new Error('Invalid email or password.');
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new Error('Invalid email or password.');
        }

        // Exclude password from response
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
      } catch (error) {
        console.error('Error during login:', error);
        throw new Error('An error ocurred while logging in.');
      }
    },
  },
};

export default resolvers;
