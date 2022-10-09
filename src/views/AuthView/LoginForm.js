import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, setLoading } from '../../store/slices/user';
import Alert from '@mui/material/Alert';
import Spinner from '../../components/Spinner';

function LoginForm() {
  const navigate = useNavigate();
  const profile = useSelector((state) => state.profile);
  const [accountInfo, setAccountinfo] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoding] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(false));
  }, [profile.isLoggedIn, dispatch]);

  const signIn = async () => {
    if (!accountInfo.email || !accountInfo.password) {
      setError('You have to fill all fields!');
    } else {
      setLoding(true);
      try {
        await login(dispatch, accountInfo);
        navigate('/');
      } catch (err) {
        if (err.code == 'auth/wrong-password' || err.code == 'auth/user-not-found') {
          setError('Wrong username or password');
        }
      }
      setLoding(false);
    }
  };
  return (
    <>
      {profile.loading && (
        <div className="modal">
          <div className="spinner-container">
            <h3 style={{ marginBottom: '1rem' }}>Loading...</h3>
            <Spinner className="spinner-medium" />
          </div>
        </div>
      )}
      <div className="window loginForm">
        <h3 className="title">Log in</h3>
        <form>
          <div className="row">
            {error && (
              <Alert className="alert" severity="error" sx={{ width: '100%' }}>
                {error}
              </Alert>
            )}
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={accountInfo.email}
                onChange={(event) =>
                  setAccountinfo({
                    ...accountInfo,
                    email: event.target.value
                  })
                }
                placeholder="example@mail.com"
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={accountInfo.password}
                onChange={(event) =>
                  setAccountinfo({
                    ...accountInfo,
                    password: event.target.value
                  })
                }
                placeholder="password"
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <button type="button" className="btn primary-btn" onClick={signIn}>
                Login {loading && <Spinner className="spinner-small" />}
              </button>
            </div>
          </div>
        </form>
        <div className="row">
          <Link to="/reset_password" className="link">
            <span>Forgot password</span>
          </Link>
        </div>
        <div className="row">
          <span>
            {"Don't have an account? "}
            <Link to="/sign_up" className="link">
              Sign up
            </Link>
          </span>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
