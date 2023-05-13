const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const { typeDefs } = require("./typeDefs");
const { resolvers } = require("./resolvers");

const { connectDB } = require("./db");

const app = express();
connectDB()

app.get("/", (req, res) => res.send("welcome to my api"));

app.use("*", (req, res) => res.status(404).send("Not Found"));

module.exports = app;

async function start() {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  app.listen(8080, () => {
    console.log("Server on port", 8080);
  });
}

start();
