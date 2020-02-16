import React from 'react';

import AddTodo from './containers/AddTodo'
import VisibleTodoList from './containers/VisibleTodoList';
import Footer from './components/Footer'

const App: React.FC = () => {
  return (
    <React.Fragment>
      <AddTodo />
      <VisibleTodoList/>
      <Footer />
    </React.Fragment>
  );
}

export default App;
