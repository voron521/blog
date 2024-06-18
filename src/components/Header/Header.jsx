import './Header.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  selectregistrationUserInfo,
} from '../../store/selectors';
import userNoRegistAvatar from '../../assets/HeaderImages/pictureIsNoRegistration.png';
import { setUserInfo } from '../../store/BlogsSlice';

function Header() {
  const registrationUserInfo = useSelector(selectregistrationUserInfo);

  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(setUserInfo(null));
    if (localStorage.getItem('user')) {
      localStorage.clear();
    }
  };

  return (
    <div className="header">
      <div className="left_header">
        <Link to="/" className="header_button header_home_button">
          Realworld Blog
        </Link>
      </div>
      <div className="right_header">
        {registrationUserInfo ? (
          <div className="user_info_block">
            <Link to="/new-article" className="create_article_button">
              Create article
            </Link>
            <Link to="/edituser" className="header_edit_button">
              <span className="user_name">{registrationUserInfo.username}</span>
              <img
                className="userAvatar"
                src={registrationUserInfo.image ? registrationUserInfo.image : userNoRegistAvatar}
              />
            </Link>
            <button className="header_button header_logout_button" onClick={logOut}>
              Log Out
            </button>
          </div>
        ) : (
          <>
            <Link to="/signin" className="header_button header_singin_button">
              Sign In
            </Link>
            <Link to="/signup" className="header_button header_singup_button">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
