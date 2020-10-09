const express = require('express');
const graphqlHTTP = require('express-graphql');
const { GraphQLSchema } = require('graphql');
const { queryType } = require('./query.js');

const port = 5000;
const app = express();

app.get('/hello', (req, res) => {
    res.send("hello");
}); 

// Define the Schema
const schema = new GraphQLSchema({ query: queryType });

//Setup the nodejs GraphQL server
app.use(
 "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true
 })
);

app.listen(port);
console.log(`Server Running at localhost:${port}`);