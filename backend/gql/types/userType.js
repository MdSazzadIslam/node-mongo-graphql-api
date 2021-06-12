"use strict";

const GraphQL = require("graphql");
const { GraphQLString, GraphQLBoolean } = GraphQL;

const UserType = new GraphQL.GraphQLObjectType({
  name: "User",
  description: "User type for managing all the users in our application.",

  fields: () => ({
    id: {
      type: GraphQLString,
      description: "ID of the user, Generated automatically by MongoDB",
    },
    name: {
      type: GraphQLString,
      description: "Full name of the user",
    },
    email: {
      type: GraphQLString,
      description: "Email of the user",
    },
    password: {
      type: GraphQLString,
      description: "Password of the user,must be valid and unique",
    },

    status: {
      type: GraphQLBoolean,
      description:
        "Status of the user, whether active or disabled. For this application status will be active by default",
    },

    role: {
      type: GraphQLString,
      description: "User type for permission purpose",
    },

    token: {
      type: GraphQLString,
      description: "Status of the user, whether active or disabled",
    },

    createdAt: {
      type: GraphQLString,
      description:
        "Generate system to allow user to have secure resource access",
    },
    updatedAt: {
      type: GraphQLString,
      description: "Date and time when this users account was last updated",
    },
  }),
});

module.exports = UserType;
