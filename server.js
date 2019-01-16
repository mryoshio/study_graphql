const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Todo {
    id: ID!
    title: String!
  }

  type Query {
    todos: [Todo]
  }
`);

let fakeDatabase = [
  { id: '1', title: 'sample 1' },
  { id: '2', title: 'sample 2' }
];

const root = {
  todos: () => fakeDatabase
};

const app = express();
app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true, // NOTE: graph`i`ql
}));

app.listen(4000);
