import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
// import ListStudents from './ListStudents';
import PaletteTest from '../PaletteTest';

const StudentRouter: React.FC = () => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${match.url}`}>
        {/* <ListStudents /> */}
        <PaletteTest />
      </Route>
    </Switch>
  );
};

export default StudentRouter;
