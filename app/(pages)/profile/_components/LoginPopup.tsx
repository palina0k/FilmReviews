'use client'

import {useState } from 'react';
import {gql } from 'graphql-tag';
import sendApolloRequest from '@utils/sendApolloRequest';
import styles from './LoginPopup.module.scss';

const LOGIN_USER_MUTATION = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      id
      username
      email
    }
  }
`;

const CREATE_USER_MUTATION = gql`
    mutation CreateUser($input: CreateUserInput!) {
        createUser(input: $input) {
            id
            username
            email
        }
    }
`;

export default function LoginPopup({ onClose, onLoginSuccess }: { onClose: () => void; onLoginSuccess: (useData: any) => void}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const handleLogin = async () => {
        try {
            setErrorMessage(''); 
            const { data } = await sendApolloRequest(LOGIN_USER_MUTATION, {
                email,
                password,
            });

            if (data?.loginUser) {
                onLoginSuccess(data.loginUser);
                onClose();
            } else {
                setErrorMessage('Invalid email or password.');
            }
        } catch (error) {
            setErrorMessage('An error occurred while logging in.');
        }
    };

    const handleCreateAccount = async () => {
        try{
            setErrorMessage('');
            const { data } = await sendApolloRequest(CREATE_USER_MUTATION, {
                input: { username, email, password }
            });

            if (data?.createUser) {
                onLoginSuccess(data.createUser);
                onClose();
            } else {
                setErrorMessage('Unable to create account.');
            }
        } catch (error) {
            setErrorMessage('An error occurred while creating the account.');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        isLogin ? handleLogin() : handleCreateAccount();
    };

    return (
        <div className={styles.popup}>
          <div className={styles.overlay} onClick={onClose}></div>
          <div className={styles.content}>
            <div className={styles.formContainer}>
              <div className={styles.formSection}>
                <h2>Create an Account</h2>
                  <form onSubmit={handleSubmit}>
                  <div className={styles.field}>
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Select Username"
                      required={!isLogin}
                      disabled={isLogin}
                    />
                  </div>
                <div className={styles.field}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Use a valid email address"
                    required={!isLogin}
                    disabled={isLogin}
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Select your password"
                    required={!isLogin}
                    disabled={isLogin}
                  />
                </div>
              </form>
            </div>
            <div className={styles.or}>or</div>
            <div className={styles.formSection}>
              <h2>Log In</h2>
              <form onSubmit={handleSubmit}>
                <div className={styles.field}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email-login"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Use a valid email address"
                    required={isLogin}
                    disabled={!isLogin}
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password-login"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Select your password"
                    required={isLogin}
                    disabled={!isLogin}
                  />
                </div>
              </form>
            </div>
          </div>
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}
          <div className={styles.actions}>
            <button type="submit" onClick={handleSubmit} className={styles.submit}>
              {isLogin ? 'Log In' : 'Create Account'}
            </button>
            <button type="button" onClick={() => setIsLogin(!isLogin)} className={styles.toggle}>
              {isLogin ? 'Switch to Create Account' : 'Switch to Log In'}
            </button>
          </div>
        </div>
      </div>
  );
}