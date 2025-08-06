const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema'); // your GraphQL schema file

const app = express();
const PORT = 4000;

// ✅ Hardcoded MongoDB URI
const mongoURI = 'mongodb+srv://vrushabhscalar:SSGfDN2ihjU2NDUz@cluster0.kmvxjcl.mongodb.net/blogDB?retryWrites=true&w=majority';

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ GraphQL Endpoint
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true, // enables GraphiQL interface in browser
}));

// ✅ MongoDB connection
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ Connected to MongoDB');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });

// ✅ Test route
app.get('/', (req, res) => {
  res.send('API is working ✅');
});

// ✅ Start server
app.listen(PORT, () => {
  console.log('🟢 Starting backend server...');
  console.log(`🚀 Server is listening on port ${PORT}`);
});
