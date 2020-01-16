import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import ListStudents from "./ListStudents";

const StudentRouter: React.FC = () => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${match.url}`}>
        <ListStudents />
      </Route>
    </Switch>
  );
};

export default StudentRouter;
