import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ListStudents from './ListStudents';
import EditStudent from './EditStudent';
import StudentLog from './StudentLog';
import EditJump from './EditJump';

const StudentRouter: React.FC = () => {
  return (
    <Switch>
      <Route exact path={`/`}>
        <ListStudents />
      </Route>
      <Route path={`/student/:studentId/jump/:jumpNumber`}>
        <EditJump />
      </Route>
      <Route path={`/student/:id/jumps`}>
        <StudentLog />
      </Route>
      <Route path={`/student/:id`}>
        <EditStudent />
      </Route>
    </Switch>
  );
};

export default StudentRouter;
