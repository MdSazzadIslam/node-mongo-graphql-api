const GraphQL = require("graphql");
const AppartmentResolver = require("../resolvers/appartmentResolver");
const verifyToken = require("../../middlewares/verifyToken");
const { GraphQLList, GraphQLString, GraphQLNonNull } = GraphQL;
// import the user type we created
const AppartmentType = require("../types/apartmentType");

const getAll = () => {
  return {
    type: new GraphQLList(AppartmentType),
    description: "This will return all the appartments present in the database",
    async resolve(parent, args, context, info) {
      const user = await verifyToken(context.headers.authorization);
      if (user) {
        return await AppartmentResolver.getAll({});
      } else {
        throw new Error({
          message: "You must supply a JWT for authorization!",
        });
      }
    },
  };
};

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
        return await AppartmentResolver.getById({ id: args.id });
      } else {
        throw new Error({
          message: "You must supply a JWT for authorization!",
        });
      }
    },
  };
};

const getFavoriteAppartment = () => {
  return {
    type: new GraphQLList(AppartmentType),
    description:
      "This will return all the favorite appartments present in the database",
    async resolve(parent, args, context, info) {
      const user = await verifyToken(context.headers.authorization);
      if (user) {
        return await AppartmentResolver.getFavoriteAppartment({});
      } else {
        throw new Error({
          message: "You must supply a JWT for authorization!",
        });
      }
    },
  };
};

module.exports = { getAll, getById, getFavoriteAppartment };
