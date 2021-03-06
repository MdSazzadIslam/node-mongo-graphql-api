"use strict";
const GraphQL = require("graphql");
const { GraphQLObjectType, GraphQLSchema } = GraphQL;

// importing all the queries
const UserQuery = require("./queries/userQueries");
const appartmentQueries = require("./queries/appartmentQueries");
// import the  mutations
const UserMutation = require("./mutations/userMutation");
const ApartmentMutation = require("./mutations/apartmentMutation");

// lets define our root query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "This is the default root query provided by the backend",
  fields: {
    // User
    users: UserQuery.getAll(),
    user: UserQuery.getById(),
    profile: UserQuery.profile(),
    //Appartment
    appartments: appartmentQueries.getAll(),
    appartment: appartmentQueries.getById(),
    favAppartment: appartmentQueries.getFavoriteAppartment(),
    apartmentByFilter: appartmentQueries.getAppartmentByFilters(),
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

    //Apartment
    createAppartment: ApartmentMutation.createAppartment(),
    updateAppartment: ApartmentMutation.updateAppartment(),
  },
});

// export the schema
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
