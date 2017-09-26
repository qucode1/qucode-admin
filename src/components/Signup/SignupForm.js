import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';

const SignUpForm = ({
  onSubmit,
  onChange,
  errors,
  user,
}) => (
  <div className="container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Sign Up</h2>

      {errors && <p className="error-message">{errors.summary}</p>}

      <div className="field-line">
        <input
          name="name"
          type="text"
          placeholder="Name"
          onChange={onChange}
          value={user.name}
        />
      </div>

      <div className="field-line">
        <input
          name="email"
          type="email"
          placeholder="Email Adress"
          onChange={onChange}
          value={user.email}
        />
      </div>

      <div className="field-line">
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={onChange}
          value={user.password}
        />
      </div>

      <div className="button-line">
        <input type="submit" aria-label="Create New Account" value="Sign Up" />
      </div>

      <div>Already have an account? <Link to={'/login'}>Log in</Link></div>
    </form>
  </div>
);

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default SignUpForm;
