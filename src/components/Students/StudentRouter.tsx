import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import ListStudents from './ListStudents';
import EditStudent from './EditStudent';

const StudentRouter: React.FC = () => {
  const match = useRouteMatch();
  console.log({ match });
  return (
    <Switch>
      <Route exact path={`/`}>
        <ListStudents />
      </Route>
      <Route path={`/student/:id`}>
        <EditStudent />
      </Route>
    </Switch>
  );
};

export default StudentRouter;
