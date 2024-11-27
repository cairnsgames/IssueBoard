import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BoardContext } from '../provider/boardprovider';
import './timeline.scss';
import TimelineTask from './TimelineTask';

const Timeline = () => {
  const { epics } = useContext(BoardContext);

  // Use only updated epics for tasks
  const tasks = epics.map(epic => ({
    id: epic.id,
    name: epic.name,
    start: epic.start,
    end: epic.end,
    color: epic.backgroundcolor,
  }));

  // Find the earliest start date to calculate left positions
  const earliestStart = Math.min(...tasks.map(task => task.start.getTime()));
  const dayWidth = 2; // Width in pixels for one day
  const minTaskWidth = 20; // Minimum width for tasks to prevent overlap
  const taskHeight = 40; // Height of each task

  // Function to get all Mondays from the earliest start date
  const getMondays = (startDate) => {
    const mondays = [];
    const date = new Date(startDate);
    // Set date to the first Monday on or after the start date
    date.setDate(date.getDate() + (1 + 7 - date.getDay()) % 7);
    
    while (date.getTime() <= Date.now()) {
      mondays.push(new Date(date));
      date.setDate(date.getDate() + 7); // Move to the next Monday
    }
    return mondays;
  };

  const mondays = getMondays(earliestStart);

  return (
    <Container fluid className="timeline-container">
      <Row>
        <Col>
          <h2>Gantt Chart</h2>
          <div className="gantt-chart">
            {/* Render Mondays in a horizontal layout */}
            <div className="monday-timeline" style={{ position: 'relative', height: '40px' }}>
              {mondays.map((monday, index) => {
                const left = 1+(monday.getTime() - earliestStart) / (1000 * 60 * 60 * 24) * dayWidth; // Adjusted left position

                return (
                  <div key={index} style={{ position: 'absolute', left: `${left}%` }}>
                    <div className="monday-date">{`${monday.getDate()}/${monday.getMonth() + 1}`}</div>
                    <div className="vertical-line" style={{ height: '400px', borderLeft: '1px solid lightgrey', position: 'absolute', top: "30px" }}></div>
                  </div>
                );
              })}
            </div>
            {tasks.map((task, index) => {
              const left = 1+((task.start.getTime() - earliestStart) / (1000 * 60 * 60 * 24) * dayWidth); // Adjust multiplier for spacing
              const width = Math.max(((task.end.getTime() - task.start.getTime()) / (1000 * 60 * 60 * 24) * dayWidth), minTaskWidth); // Ensure minimum width
              const top = (index+1) * (taskHeight + 10); // Calculate top position for stacking

              return (
                <TimelineTask 
                  key={index} 
                  name={task.name} 
                  width={width} 
                  left={left} 
                  top={top} // Pass top position to TimelineTask
                  color={task.color} 
                  start={task.start.toDateString()} 
                  end={task.end.toDateString()} 
                />
              );
            })}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Timeline;
