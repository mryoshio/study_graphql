import React, { Component } from 'react';
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo';

const TODOS_QUERY = gql`
  query TodosQuery {
    todos {
      id,
      title
    }
  }
`;

const ADD_MUTATION = gql`
  mutation AddMutation($input: TodoInput) {
    addTodo(input: $input) {
      title
    }
  }
`;

class TodoList extends Component {
  state = { title: '' }

  render() {
    if (this.props.data && this.props.data.loading) {
      return <div>Loading...</div>
    }

    const todoList = this.props.data.todos;

    return (
        <div>
        <input type="text" value={this.state.title}
          onChange={e => this.setState({title: e.target.value})} />

        <button type="submit" onClick={() => this._addTodo()}>Add</button>

        {todoList.map(todo => <p key={todo.id}>{todo.title}</p>)}
        </div>
    )
  }

  _addTodo = () => {
    this.props.addMutation({
      variables: {
        input: {
          title: this.state.title
        }
      },
      refetchQueries: [{ query: TODOS_QUERY }],
    }).then(({data}) => console.log(data.addTodo));
    this.setState({ title: '' })
  }
}

export default compose(
  graphql(TODOS_QUERY),
  graphql(ADD_MUTATION, { name: 'addMutation' })
)(TodoList);
