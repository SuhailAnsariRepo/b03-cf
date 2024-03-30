const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const resolvers = require('./resolvers');
const fs = require('fs');
const path = require('path');

const typeDefs = gql(fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8'));

const server = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
  await server.start();
  const app = express();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Error starting server:', err.message);
  process.exit(1);
});
