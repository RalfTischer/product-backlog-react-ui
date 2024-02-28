import React, { useState, useEffect } from 'react';
import TaskTable from './components/TaskTable';

function App() {
  // TODO: Read tasks
  const tasks = [];
  return (
    <div>
      <h1>Product Backlog</h1>
      <TaskTable tasks={ tasks }/>
    </div>
  );
}

export default App;