import React from 'react';
import ListEdit from './ListEdit';
import ListDislay from './ListDisplay';

const List = ({ myKey,
                myList,
                editable,
                actionable, 
                handleDelete,
                handleMove,
                handleEdit,
                handleCancelEdit,
                handleActionable, 
                handleSave
                 }) => {

  if (!myList) {
    return null;
  }

  if (editable) {
    return <ListEdit 
            myKey={myKey}
            myList={myList}
            actionable={actionable} 
            handleSave={handleSave}
            handleActionable={handleActionable} 
            handleCancelEdit={handleCancelEdit}
    />
  } else {
    return <ListDislay
            myKey={myKey}
            myList={myList}
            actionable={actionable} 
            handleDelete={handleDelete}
            handleMove={handleMove}
            handleEdit={handleEdit}
            handleActionable={handleActionable} 
    />
  }
};

export default List;
