"use strict";

const GraphQL = require("graphql");
const { GraphQLString, GraphQLID, GraphQLBoolean, GraphQLList } = GraphQL;

var Location = [
  {
    city: GraphQLString,
    formattedAddress: GraphQLString,
    country: GraphQLString,
    zipCode: GraphQLString,
    streetName: GraphQLString,
    countryCode: GraphQLString,
  },
];

const LocationType = new GraphQL.GraphQLObjectType({
  name: "Location",
  description: "Location type",
  fields: () => ({
    coordinates: {
      type: [],
      description: "We will get from api",
    },

    country: {
      type: GraphQLString,
      description: "We will get from api",
    },

    city: {
      type: GraphQLString,
      description: "We will get from api",
    },

    streetName: {
      type: GraphQLString,
      description: "We will get from api",
    },

    streetNumber: {
      type: GraphQLString,
      description: "We will get from api",
    },

    formattedAddress: {
      type: GraphQLString,
      description: "We will get from api",
    },

    countryCode: {
      type: GraphQLString,
      description: "We will get from api",
    },
  }),
});

const AppartmentType = new GraphQL.GraphQLObjectType({
  name: "Appartment",
  description: "Appartment type",

  fields: () => ({
    id: {
      type: GraphQLString,
      description: "ID of the apartment, Generated automatically by MongoDB",
    },
    name: {
      type: GraphQLString,
      description: "Name of the appartment",
    },

    description: {
      type: GraphQLString,
      description: "Details of the appartment",
    },

    room: {
      type: GraphQLID,
      description: "Number of bedroom",
    },

    address: {
      type: GraphQLString,
      description: "Appartment location",
    },

    favorite: {
      type: GraphQLBoolean,
      description:
        "By default all the apartment will be true which mean favorite",
    },

    location: {
      type: GraphQLString,
      description: "location will get from api",
    },

    userId: {
      type: GraphQLString,
      description: "We will get this id from token",
    },
  }),
});

module.exports = AppartmentType;
