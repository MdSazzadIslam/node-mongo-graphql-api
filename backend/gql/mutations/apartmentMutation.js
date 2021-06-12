const GraphQL = require("graphql");
const AppartmentResolver = require("../resolvers/appartmentResolver");
const verifyToken = require("../../middlewares/verifyToken");
const { GraphQLNonNull, GraphQLString, GraphQLInt } = GraphQL;

// lets import our user type
const ApartmentType = require("../types/apartmentType");

const createAppartment = () => {
  return {
    type: ApartmentType,
    description: "Creating a new appartment",

    args: {
      name: {
        type: new GraphQLNonNull(GraphQLString),
        description: "Name can't be left empty",
      },

      room: {
        type: new GraphQLNonNull(GraphQLInt),
        description: "Room can't be left empty",
      },

      address: {
        type: new GraphQLNonNull(GraphQLString),
        description: "Address can't be left empty",
      },
    },
    async resolve(parent, fields, context) {
      const user = await verifyToken(context.headers.authorization);
      if (user) {
        return await AppartmentResolver.createAppartment(fields, user);
      } else {
        throw new Error({
          message: "You must supply a JWT for authorization!",
        });
      }
    },
  };
};

module.exports = { createAppartment };
