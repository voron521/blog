import './EditUser.scss';
import React from 'react';
import { useForm } from 'react-hook-form';
import { setUserInfo, setregistrationNewUserError, fetchEditUser } from '../../store/BlogsSlice';
import { useDispatch, useSelector } from 'react-redux';

import { selectregistrationUserInfo } from '../../store/selectors';

function EditUser() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const registrationUserInfo = useSelector(selectregistrationUserInfo);
  const submitLogInUser = async (event) => {
    const data = {
      username: event.username,
      email: event.email,
      password: event.password,
      avatarImage: event.avatarImage,
    };
    try {
      const apiKey = registrationUserInfo.token;
      const res = await dispatch(fetchEditUser({ data, apiKey }));
      if (res.error) {
        dispatch(setregistrationNewUserError(true));
      } else {
        const userJson = JSON.stringify(res.payload.user);
        localStorage.setItem('user', userJson);
        dispatch(setUserInfo(res.payload.user));
        dispatch(setregistrationNewUserError(false));
      }
    } catch (error) {
      console.error('Error edit user:', error);
      dispatch(setregistrationNewUserError(true));
    }
  };

  return (
    <form className="edit_form" onSubmit={handleSubmit(submitLogInUser)}>
      <span className="login_form_title">Edit Profile</span>

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
        New password
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

      <label className="label_form" htmlFor="avatar_image">
        Avatar image (url)
      </label>
      <input
        className="input_login_accouont"
        type="input"
        id="avatarImage"
        placeholder="Avatar image"
        name="avatarImage"
        {...register('avatarImage', { required: true, pattern: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i })}
      />
      {errors.avatar_image && <span className="error_input">url должен быть корректным</span>}

      <button className="login_button" type="submit">
        Save
      </button>
    </form>
  );
}

export default EditUser;
