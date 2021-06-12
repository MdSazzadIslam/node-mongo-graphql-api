"use strict";
const GraphQL = require("graphql");
const { GraphQLObjectType, GraphQLSchema } = GraphQL;

// import the user query file we created
const UserQuery = require("./queries/userQueries");

// import the user mutation file we created
const UserMutation = require("./mutations/userMutation");

// lets define our root query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "This is the default root query provided by the backend",
  fields: {
    // User
    users: UserQuery.getAll(),
    user: UserQuery.getById(),
    profile: UserQuery.profile(),
  },
});

// lets define our root mutation
const RootMutation = new GraphQLObjectType({
  name: "Mutation",
  description: "Default mutation provided by the backend APIs",
  fields: {
    // User
    login: UserMutation.login(),
    registration: UserMutation.registration(),
  },
});

// export the schema
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
