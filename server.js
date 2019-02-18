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

  input TodoInput {
    title: String!
  }

  type Mutation {
    addTodo(input: TodoInput): Todo
  }
`);

let fakeDatabase = [];

const root = {
  todos: () => fakeDatabase,

  addTodo: ({input}) => {
    const todo = {
      id: new Date().getTime().toString(),
      title: input.title
    }
    fakeDatabase.push(todo);
    return todo;
  }
};


const app = express();
app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true, // NOTE: graph`i`ql
}));

app.listen(4000);
