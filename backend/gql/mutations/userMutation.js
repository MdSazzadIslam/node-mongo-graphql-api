const GraphQL = require("graphql");
const UserResolver = require("../resolvers/userResolver");

const { GraphQLNonNull, GraphQLString } = GraphQL;

// lets import our user type
const UserType = require("../types/userType");

const login = () => {
  return {
    type: UserType,
    description: "User authentication",

    args: {
      email: {
        type: new GraphQLNonNull(GraphQLString),
        description: "Email be left empty",
      },
      password: {
        type: new GraphQLNonNull(GraphQLString),
        description: "Enter password, will be automatically hashed",
      },
    },
    async resolve(parent, fields) {
      return await UserResolver.login(fields);
    },
  };
};

const registration = () => {
  return {
    type: UserType,
    description: "User authentication",

    args: {
      name: {
        type: new GraphQLNonNull(GraphQLString),
        description: "Name be left empty",
      },

      email: {
        type: new GraphQLNonNull(GraphQLString),
        description: "Email be left empty",
      },
      password: {
        type: new GraphQLNonNull(GraphQLString),
        description: "Enter password, will be automatically hashed",
      },
    },
    async resolve(parent, fields) {
      return await UserResolver.registration(fields);
    },
  };
};

module.exports = { login, registration };
