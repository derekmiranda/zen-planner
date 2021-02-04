import { Component } from "react";
import "./App.css";

import { Task } from "./types";

const DEFAULT_USER_ID = 1;

interface AppState {
  tasks: Task[];
}

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      tasks: [],
    };
  }

  async componentDidMount() {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/api/${DEFAULT_USER_ID}/tasks/get`
    );
    const json = await res.json();
    this.setState({
      tasks: json.tasks,
    });
  }

  render() {
    const Tasks = this.state.tasks.map((task, i) => (
      <div key={i}>{task.description}</div>
    ));
    return (
      <div className="app">
        <h1 className="app__header">Zen Planner</h1>
        {Tasks}
      </div>
    );
  }
}

export default App;
