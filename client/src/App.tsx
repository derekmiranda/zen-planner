import { Redirect, Route, Switch } from "wouter";
import Calendar from "./components/calendar/Calendar";
import DailyTasksContainer from "./containers/tasks/DailyTasksContainer";

function App() {
  return (
    <Switch>
      <Route path="/" component={DailyTasksContainer} />
      <Route path="/calendar" component={Calendar} />
      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}

export default App;
