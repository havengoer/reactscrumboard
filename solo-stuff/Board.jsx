import React from 'react';
import Row from './Row.jsx';

import Header from '../src/components/Header.jsx';
import * as taskActions from '../src/actions/tasks.js';
import * as storyActions from '../src/actions/stories.js';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => {
  return {
    addTask: (name, boardId) => dispatch(taskActions.addTask(name, boardId)),
    getTasks: boardId => dispatch(taskActions.getTasks(boardId)),
    clearTasks: tasks => dispatch(taskActions.clearTasks(tasks)),
    addStory: (name, boardId) => dispatch(storyActions.addStory(name, boardId)),
    getStories: boardId => dispatch(storyActions.getStories(boardId)),
    clearStories: stories => dispatch(storyActions.clearStories(stories)),
  };
};

const mapStateToProps = (store, ownProps) => {
  return {
    tasks: store.tasks,
    stories: store.stories,
  };
};

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTaskChange = this.handleTaskChange.bind(this);
    this.handleStoryChange = this.handleStoryChange.bind(this);

    this.state = {
      taskValue: '',
      storyValue: '',
      stories: [],
      todo: [],
      inProgress: [],
      testing: [],
      done: [],
    };
  }

  componentWillMount() {
    this.props.clearStories(this.props.stories);
    this.props.clearTasks(this.props.tasks);
  }
  componentWillReceiveProps(nextProps) {
    const { stories, tasks } = nextProps;
    const [todo, inProgress, testing, done] = tasks.reduce(
      (acc, x) => {
        if (x.status === 'todo') acc[0].push(x);
        if (x.status === 'inProgress') acc[1].push(x);
        if (x.status === 'testing') acc[2].push(x);
        if (x.status === 'done') acc[3].push(x);
        return acc;
      },
      [[], [], [], []]
    );
    this.setState({ stories, todo, inProgress, testing, done });
  }
  async componentDidMount() {
    await this.props.getStories(this.props.match.params.id);
    await this.props.getTasks(this.props.match.params.id);
    const { stories } = this.props;
    const [todo, inProgress, testing, done] = this.props.tasks.reduce(
      (acc, x) => {
        if (x.status === 'todo') acc[0].push(x);
        if (x.status === 'inProgress') acc[1].push(x);
        if (x.status === 'testing') acc[2].push(x);
        if (x.status === 'done') acc[3].push(x);
        return acc;
      },
      [[], [], [], []]
    );
    this.setState({ stories, todo, inProgress, testing, done });
  }
  handleSubmit(e) {
    e.preventDefault();
  }
  handleTaskChange(e) {
    const { value } = e.target;
    this.setState({ taskValue: value });
  }

  handleStoryChange(e) {
    const { value } = e.target;
    this.setState({ storyValue: value });
  }

  render() {
    return (
      <div className="board">
        <div>
          <Header match={this.props.match} history={this.props.history} />

          <h1 style={{ textAlign: 'center' }}>Welcome To Your ScrumBoard</h1>
          <div>
            <h1>Build Your Board</h1>
            <div className="board-forms">
              <form onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  placeholder="Task Name"
                  onChange={this.handleTaskChange}
                  value={this.state.taskValue}
                />
                <button
                  onClick={() =>
                    this.props.addTask(this.state.taskValue, this.props.match.params.id)
                  }
                >
                  Add New Task
                </button>
              </form>
              <div className="board-forms">
                <form onSubmit={this.handleSubmit}>
                  <input
                    type="text"
                    placeholder="Story Name"
                    onChange={this.handleStoryChange}
                    value={this.state.storyValue}
                  />
                  <button
                    onClick={() =>
                      this.props.addStory(this.state.storyValue, this.props.match.params.id)
                    }
                  >
                    Add New Story
                  </button>
                </form>
              </div>
            </div>
            <div className="board-rows">
              <Row
                isStory={true}
                columnHeader="Stories"
                tasks={this.props.stories}
                boardId={this.props.match.params.id}
              />
              <Row
                columnHeader="Todos"
                tasks={this.state.todo}
                boardId={this.props.match.params.id}
              />
              <Row columnHeader="In Progress" tasks={this.state.inProgress} />
              <Row columnHeader="Testing" tasks={this.state.testing} />
              <Row columnHeader="Done" tasks={this.state.done} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
