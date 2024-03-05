const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const { graphqlHTTP } = require('express-graphql'); // This one is for Express GraphQL
const schema = require('./graphql-schema');
const resolvers = require('./resolvers');
const Admin = require('./models/admin_model')
const routers = require('./router/router');
const bcrypt = require('bcrypt');
require('./connection');

const app = express();
app.use(cors());
app.use(express.json()); // Do this So that my server can accept json
app.use(express.urlencoded({ extended: true }));


// Router for my uploads and stuffs
app.use('/', routers);



const strength = 10; // Higher number is higher hashing strength
const password = 'Devotion@2024';

(async () => {
  try {
    const hashedPassword = await bcrypt.hash(password, strength);

    const userData = {
      username: 'admin',
      password: hashedPassword,
    };

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

async function startApolloServer() {
  await server.start();
  server.applyMiddleware({ app, path: '/graphql-serve' });
}

startApolloServer();

// Handler for Serverless Function
exports.handler = async (req, res) => {
  try {
    await server.createHandler({ path: '/graphql-serve' })(req, res);
  } catch (error) {
    console.error('Error in GraphQL handler:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`);
// });
