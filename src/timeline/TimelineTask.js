import React from 'react';
import './timeline.scss'; // Ensure styles are applied

const TimelineTask = ({ name, width, left, top, color, start, end }) => {
  return (
    <div className="gantt-task" style={{ width: `${width}%`, left: `${left}%`, top: `${top}px`, backgroundColor: color }}>
      <span className="task-name">{name}</span>
      <span className="task-dates">{`${start} - ${end}`}</span>
    </div>
  );
};

export default TimelineTask;
