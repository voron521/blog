import './SingUp.scss';

import { useDispatch, useSelector } from 'react-redux';

import React from 'react';
import { fetchRegistrationNewUser, setregistrationNewUserError, setUserInfo } from '../../store/BlogsSlice';
import { useForm } from 'react-hook-form';
import { selectRegistrationNewUserError, selectregistrationUserInfo } from '../../store/selectors';
import { Link, useNavigate } from 'react-router-dom';

function SingUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const registrationNewUserError = useSelector(selectRegistrationNewUserError);
  const registrationUserInfo = useSelector(selectregistrationUserInfo);
  const navigate = useNavigate();
  const submitRegisterUser = async (event) => {
    const data = {
      username: event.username,
      email: event.email,
      password: event.password,
      repeatPassword: event.repeatPassword,
      agree: event.agree === 'on',
    };
    try {
      const res = await dispatch(fetchRegistrationNewUser({ data }));
      if (res.error) {
        dispatch(setregistrationNewUserError(true));
      } else {
        if (!localStorage.getItem('user')) {
          data.token = res.payload.user.token;
          const userJson = JSON.stringify(data);
          localStorage.setItem('user', userJson);
        }
        // const userJson = JSON.stringify(data);
        // localStorage.setItem('user', userJson);
        const storedUserJson = localStorage.getItem('user');
        const storedUser = JSON.parse(storedUserJson);
        dispatch(setregistrationNewUserError(false));
        // dispatch(setUserInfo(res.payload.user));
        dispatch(setUserInfo(storedUser));
        navigate('/');
      }
    } catch (error) {
      console.error('Error registering new user:', error);
      dispatch(setregistrationNewUserError(true));
    }
  };

  return (
    <form className="create_new_account" onSubmit={handleSubmit(submitRegisterUser)}>
      <span className="create_form_title">Create new account</span>
      <label className="label_form" htmlFor="username">
        Username
      </label>
      <input
        className="input_create_accouont"
        type="input"
        id="username"
        name="username"
        placeholder="Username"
        {...register('username', { required: true, minLength: 3, maxLength: 20 })}
      />
      {errors.username && <span className="error_input">username должен быть от 3 до 20 символов (включительно)</span>}
      <label className="label_form" htmlFor="email">
        Email address
      </label>
      <input
        className="input_create_accouont"
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
        className="input_create_accouont"
        type="password"
        id="Password"
        placeholder="Password"
        name="password"
        {...register('password', { required: true, minLength: 6, maxLength: 40 })}
      />
      {errors.password && <span className="error_input">password должен быть от 6 до 40 символов</span>}
      <label className="label_form" htmlFor="repeat_password">
        Repeat password
      </label>
      <input
        className="input_create_accouont"
        type="password"
        id="repeat_password"
        placeholder="Repeat password"
        name="repeatPassword"
        {...register('repeatPassword', {
          validate: (value) => value === watch('password'),
        })}
      />
      {errors.repeatPassword && <span className="error_input">password и repeat password должны совпадать</span>}
      <div className="chekbox_agree_div">
        <input className="check_agree" type="checkbox" id="check_agree" {...register('agree', { required: true })} />
        <label className="label_form_check" htmlFor="check_agree">
          I agree to the processing of my personal information
        </label>
      </div>

      <button className="submit_button" type="submit">
        Create
      </button>
      <span className="signin_span">
        Already have an account?
        <Link to="/signin" className="signin_link">
          Sign In
        </Link>
      </span>
      <span className="error_registration">{registrationNewUserError ? 'Регистрация не удалась' : null}</span>
      <span className="error_registration">
        {registrationUserInfo ? `${registrationUserInfo.username} Вы успешно зарегистрировались` : null}
      </span>
    </form>
  );
}

export default SingUp;
