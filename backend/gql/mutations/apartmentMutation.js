"use strict";

const GraphQL = require("graphql");
const ApartmentController = require("../../controllers/apartmentController");
const verifyToken = require("../../middlewares/verifyToken");
const { GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLBoolean } = GraphQL;

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

      description: {
        type: new GraphQLNonNull(GraphQLString),
        description: "Description can't be left empty",
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
    async resolve(parent, args, context) {
      const user = await verifyToken(context.headers.authorization);
      if (user) {
        return await ApartmentController.createAppartment(args, user.id);
      } else {
        throw new Error({
          msg: "You must supply a JWT for authorization!",
        });
      }
    },
  };
};

const updateAppartment = () => {
  return {
    type: ApartmentType,
    description: "Updating appartment",

    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
        description: "Id can't be left empty",
      },

      name: {
        type: GraphQLString,
      },

      description: {
        type: GraphQLString,
      },

      room: {
        type: GraphQLInt,
      },

      address: {
        type: GraphQLString,
      },

      favorite: {
        type: GraphQLBoolean,
      },
    },
    async resolve(parent, args, context, info) {
      const user = await verifyToken(context.headers.authorization);
      if (user) {
        return await ApartmentController.updateAppartment(args, user.id);
      } else {
        throw new Error({
          msg: "You must supply a JWT for authorization!",
        });
      }
    },
  };
};

module.exports = { createAppartment, updateAppartment };
