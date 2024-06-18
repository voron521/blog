import './SingIn.scss';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { fetchLogInUser, setUserInfo, setregistrationNewUserError } from '../../store/BlogsSlice';
import { useDispatch, useSelector } from 'react-redux';

import { selectRegistrationNewUserError, selectregistrationUserInfo } from '../../store/selectors';

function SingIn() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const registrationUserInfo = useSelector(selectregistrationUserInfo);
  const RegistrationNewUserError = useSelector(selectRegistrationNewUserError);
  const navigate = useNavigate();

  const submitLogInUser = async (event) => {
    const data = {
      email: event.email,
      password: event.password,
    };
    try {
      const res = await dispatch(fetchLogInUser({ data }));
      if (res.error) {
        dispatch(setregistrationNewUserError(true));
      } else {
        const dataUserFromServer = {
          username: res.payload.user.username,
          email: res.payload.user.email,
          password: event.password,
          image: res.payload.user.image,
          token: res.payload.user.token,
        };

        const userJson = JSON.stringify(dataUserFromServer);
        localStorage.setItem('user', userJson);
        dispatch(setUserInfo(dataUserFromServer));
        dispatch(setregistrationNewUserError(false));
        navigate('/');
      }
    } catch (error) {
      console.error('Error registering new user:', error);
      dispatch(setregistrationNewUserError(true));
    }
  };

  return (
    <form className="log_in_form" onSubmit={handleSubmit(submitLogInUser)}>
      <span className="login_form_title">Sing In</span>

      <label className="label_form" htmlFor="email">
        Email address
      </label>
      <input
        className="input_login_accouont"
        type="input"
        id="email"
        placeholder="Email address"
        name="email"
        {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
      />
      {errors.email && <span className="error_input">email должен быть корректным</span>}
      <label className="label_form" htmlFor="Password">
        Password
      </label>
      <input
        className="input_login_accouont"
        type="password"
        id="Password"
        placeholder="Password"
        name="password"
        {...register('password', { required: true, minLength: 6, maxLength: 40 })}
      />
      {errors.password && <span className="error_input">password должен быть от 6 до 40 символов</span>}

      <button className="login_button" type="submit">
        Login
      </button>
      <span className="signin_span">
        Don’t have an account?
        <Link to="/signup" className="signin_link">
          Sign Up
        </Link>
      </span>
      <span className="error_registration">
        {registrationUserInfo ? `${registrationUserInfo.username} Вы успешно вошли в аккаунт` : null}
      </span>
      <span className="error_registration">{RegistrationNewUserError ? `Логин или пароль не верный` : null}</span>
    </form>
  );
}

export default SingIn;
