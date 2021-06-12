"use strict";
const express = require("express");
require("dotenv").config({ path: "./.env" }); //to load .env variables from env file
const logger = require("morgan"); //HTTP request logger middleware that generates request logs
const fs = require("fs");
const path = require("path");
const { graphqlHTTP } = require("express-graphql"); //will set up our GraphQL HTTP server.

const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
// let's import the schema file we just created
const GraphQLSchema = require("./gql");

const getUser = (token) => {
  try {
    if (token) {
      return jwt.verify(token, process.env.JWT_SECRECT_KEY);
    }
    return null;
  } catch (error) {
    return null;
  }
};

const main = async () => {
  await connectDB(); //calling database connection

  //Initializing app
  const app = express();
  app.use(express.json());

  //Bodyparser middleware
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  //morgan only use for developement purpose
  if (process.env.NODE_ENV === "development") {
    app.use(logger("dev"));
  }

  //create a write stream(in append mode)
  var accessLogStream = fs.createWriteStream(
    path.join(__dirname, "/logs/access.log"),
    { flags: "a" }
  );
  //setup the logger
  app.use(logger("combined", { stream: accessLogStream }));

  ////////////////GraphQL server///////////////////////
  app.use(
    "/graphql",
    graphqlHTTP((req) => ({
      schema: GraphQLSchema,
      context: req.context,
      graphiql: process.env.NODE_ENV === "development",
      pretty: true,
      context: ({ req }) => {
        const token = req.get("Authorization") || "";
        return { user: getUser(token.replace("Bearer", "")) };
      },
    }))
  );
  // =========== GraphQL server end ========== //

  app.listen(process.env.PORT, () => {
    console.log(
      `⚡️[server]: running at https://localhost:${process.env.PORT}  ${process.env.NODE_ENV}`
    );
  });
};

main().catch((err) => {
  console.log(err);
});
