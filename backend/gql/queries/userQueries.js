const GraphQL = require("graphql");
const auth = require("../../middlewares/isAuthenticated");
const UserResolver = require("../resolvers/userResolver");

const { GraphQLList, GraphQLString, GraphQLNonNull } = GraphQL;

// import the user type we created
const UserType = require("../types/userType");

const getAll = () => {
  return {
    type: new GraphQLList(UserType),
    description: "This will return all the users present in the database",
    async resolve(parent, args, context, info) {
      return await UserResolver.getAll({});
    },
  };
};

const getById = () => {
  return {
    type: UserType,
    description:
      "This will return data of a single users based on the id provided",
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
        description: "Please enter user id",
      },
    },
    async resolve(parent, args, context, info) {
      return await UserResolver.getById({ id: args.id });
    },
  };
};

const profile = () => {
  return {
    type: UserType,
    description: "This will return current user profile details",
    async resolve(parent, args, context, info) {
      if (auth.isAuthenticated(context)) {
        return await context.user;
      }
    },
  };
};

module.exports = { getAll, getById, profile };
