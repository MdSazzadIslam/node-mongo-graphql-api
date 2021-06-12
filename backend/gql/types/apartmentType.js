const GraphQL = require("graphql");
const { GraphQLString, GraphQLID, GraphQLBoolean } = GraphQL;

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
