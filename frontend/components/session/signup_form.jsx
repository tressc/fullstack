import React from 'react';
import { Link, Route } from 'react-router-dom';
import { withRouter } from 'react-router';

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      full_name: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
    this.demoLogin = this.demoLogin.bind(this);
  }

  componentDidMount() {
    this.props.removeErrors();
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.signup({user: user});
  }

  update(field) {
    return (e) => {
      this.setState({
        [field]: e.currentTarget.value
      });
    };
  }

  demoLogin(e) {
    e.preventDefault();
    const demo = {user: {username: 'demo', password: 'password'}};
    this.props.login(demo);
  }

  render() {
    const errors = this.props.errors.map(e => {
      return (
        <li>{e}</li>
      );
    });
    return (
      <div className="session">
        <div className="phones">
          <div className="background">
            <img src={window.phones}/>
            <div className="mounted_image"></div>
          </div>
        </div>
        <div className="session_block">
          <form onSubmit={this.handleSubmit} className="session_box form signup">
            <h1>Pictagram</h1>
            <div className="enticement">
              <span>Sign up to see photos and videos from your friends.</span>
            </div>
            <button onClick={this.demoLogin}>Log in as Demo User</button>
            <div className="or">OR</div>
            <label>
              <input placeholder="Email" type="text" value={this.state.email} onChange={this.update('email')}></input>
            </label>
            <label>
              <input placeholder="Full Name" type="text" value={this.state.full_name} onChange={this.update('full_name')}></input>
            </label>
            <label>
              <input placeholder="Username" type="text" value={this.state.username} onChange={this.update('username')}></input>
            </label>
            <label>
              <input placeholder="Password" type="password" value={this.state.password} onChange={this.update('password')}></input>
            </label>
            <button>Sign up</button>
            <ul className="errors">
              {errors}
            </ul>
            <div className="terms">
              <span>By signing up, you agree to our Terms & Privacy Policy.</span>
            </div>
          </form>
          <div className="session_box toggle">
            <span>Have an account?  <Link to='/login'>Log in</Link></span>
          </div>
        </div>
      </div>
    );
  }

}

export default withRouter(SignUpForm);
