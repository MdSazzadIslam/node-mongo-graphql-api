"use strict";

const GraphQL = require("graphql");
const ApartmentController = require("../../controllers/apartmentController");
const verifyToken = require("../../middlewares/verifyToken");
const { GraphQLList, GraphQLString, GraphQLNonNull } = GraphQL;
// import the user type we created
const AppartmentType = require("../types/apartmentType");

//to display all the records
const getAll = () => {
  return {
    type: new GraphQLList(AppartmentType),
    description: "This will return all the appartments present in the database",
    async resolve(parent, args, context, info) {
      const user = await verifyToken(context.headers.authorization);
      if (user) {
        return await ApartmentController.getAll();
      } else {
        throw new Error({
          msg: "You must supply a JWT for authorization!",
        });
      }
    },
  };
};

//to display single record
const getById = () => {
  return {
    type: AppartmentType,
    description:
      "This will return data of a single appartment based on the id provided",
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
        description: "Please enter user id",
      },
    },
    async resolve(parent, args, context, info) {
      const user = await verifyToken(context.headers.authorization);
      if (user) {
        return await ApartmentController.getById(args.id);
      } else {
        throw new Error({
          msg: "You must supply a JWT for authorization!",
        });
      }
    },
  };
};

//to get favorite appartment
const getFavoriteAppartment = () => {
  return {
    type: new GraphQLList(AppartmentType),
    description:
      "This will return all the favorite appartments present in the database",
    async resolve(parent, args, context, info) {
      const user = await verifyToken(context.headers.authorization);
      if (user) {
        return await ApartmentController.getFavoriteAppartment({});
      } else {
        throw new Error({
          msg: "You must supply a JWT for authorization!",
        });
      }
    },
  };
};

//to display single record
const getAppartmentByFilters = () => {
  return {
    type: new GraphQLList(AppartmentType),
    description:
      "This will return data of a single appartment based on the id provided",
    args: {
      id: {
        type: GraphQLString,
      },

      city: {
        type: GraphQLString,
      },

      country: {
        type: GraphQLString,
      },

      room: {
        type: GraphQLString,
      },

      streetName: {
        type: GraphQLString,
      },

      streetNumber: {
        type: GraphQLString,
      },

      formattedAddress: {
        type: GraphQLString,
      },

      countryCode: {
        type: GraphQLString,
      },
    },
    async resolve(parent, args, context, info) {
      const user = await verifyToken(context.headers.authorization);
      if (user) {
        return await ApartmentController.getAppartmentByFilters(args);
      } else {
        throw new Error({
          msg: "You must supply a JWT for authorization!",
        });
      }
    },
  };
};

module.exports = {
  getAll,
  getById,
  getFavoriteAppartment,
  getAppartmentByFilters,
};
