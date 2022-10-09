import React from 'react';
import { useLocation } from 'react-router-dom';
import ResetPasswordForm from './ResetPasswordForm';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

function AuthView() {
  const pathName = useLocation().pathname;

  const renderWindow = () => {
    if (pathName.includes('sign_up')) {
      return <SignUpForm />;
    } else if (pathName.includes('reset_password')) {
      return <ResetPasswordForm />;
    }

    return <LoginForm />;
  };

  return (
    <div className="authView">
      <div className="logo">
        <span className="text">scheduler</span>
      </div>
      <div className="window-container">{renderWindow()}</div>
    </div>
  );
}

export default AuthView;
