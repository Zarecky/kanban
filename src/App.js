import React, {Component} from 'react';
import Kanban from "./components/kanban/Kanban";
;

export default class App extends Component {
  static propTypes = {

  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Kanban/>
    );
  }
}