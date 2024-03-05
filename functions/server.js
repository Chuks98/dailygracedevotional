const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const schema = require('./graphql-schema');
const resolvers = require('./resolvers');
const Admin = require('./models/admin_model')
const routers = require('./router/router');
const bcrypt = require('bcrypt');
require('./connection');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', routers);

const strength = 10;
const password = 'Devotion@2024';
(async () => {
  try {
    const hashedPassword = await bcrypt.hash(password, strength);
    const userData = { username: 'admin', password: hashedPassword, };
    const newAdmin = new Admin(userData);
    const savedAdmin = await newAdmin.save();
    console.log('User record successfully saved:', savedAdmin);
  } catch (error) {
    console.error(error);
  }
})();

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

exports.graphql = onRequest(async (req, res) => {
  try {
    await server.start();
    server.applyMiddleware({ app, path: '/graphql-server' });
    await server.createHandler({ path: '/graphql-server' })(req, res);
  } catch (error) {
    console.error('Error starting server:', error);
    res.status(500).send('Error starting server');
  }
});