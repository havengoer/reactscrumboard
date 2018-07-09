import React from 'react';
import RowHeader from './RowHeader.jsx';
import RowBody from './RowBody.jsx';

const Row = props => {
  return (
    <div>
      <RowHeader columnHeader={props.columnHeader} />
      <RowBody tasks={props.tasks} boardId={props.boardId} />
    </div>
  );
};

export default Row;
