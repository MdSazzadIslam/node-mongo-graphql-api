"use strict";

const GraphQL = require("graphql");
const {
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull,
} = GraphQL;

const LocationType = new GraphQL.GraphQLObjectType({
  name: "Location",
  description: "Location type",
  fields: () => ({
    coordinates: {
      type: new GraphQLList(GraphQLString),
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
      type: new GraphQLNonNull(GraphQLString),
      description: "Name of the appartment",
    },

    description: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Details of the appartment",
    },

    room: {
      type: new GraphQLNonNull(GraphQLID),
      description: "Number of bedroom",
    },

    address: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Appartment location",
    },

    favorite: {
      type: GraphQLBoolean,
      description:
        "By default all the apartment will be true which mean favorite",
      defaultValue: true,
    },

    location: {
      type: LocationType,
      description: "location will get from api",
    },

    userId: {
      type: GraphQLString,
      description: "We will get this id from token",
    },
  }),
});

module.exports = AppartmentType;
