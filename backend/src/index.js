const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const graphQLHttp = require("express-graphql");
const { graphqlUploadExpress } = require("graphql-upload");

const app = express();

const server = require("http").Server(app);
const io = require("socket.io")(server);

const graphQLSchema = require("./graphQL/schema");
const graphQLResolvers = require("./graphQL/resolvers");

mongoose.connect(
  "mongodb+srv://rocketgram:rocketgram@cluster0-kkzfm.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(cors());

app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "uploads", "resized"))
);

app.use(
  "/graphql",
  graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
  graphQLHttp({
    schema: graphQLSchema,
    rootValue: graphQLResolvers,
    graphiql: true
  })
);

server.listen(3333);
