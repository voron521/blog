import { useEffect } from 'react';
import './Blog.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from 'antd';
import SingUp from '../SingUp';
import SingIn from '../SingIn';
import { fetchPosts, setBlogs, setPage, setregistrationNewUserError, setUserInfo } from '../../store/BlogsSlice';
import { selectblogs, selectLimitArticles, selectCurrentPage, selectTotalResults } from '../../store/selectors';
import ArticleBlogs from '../ArticleBlogs';
import EditUser from '../EditUser';
import Header from '../Header';
import CreateArticle from '../CreateArticle';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function Blog() {
  const dispatch = useDispatch();
  const blogs = useSelector(selectblogs);
  const limitArticles = useSelector(selectLimitArticles);
  const currentPage = useSelector(selectCurrentPage);
  const totalResults = useSelector(selectTotalResults);

  useEffect(() => {
    const offset = (currentPage - 1) * limitArticles;
    dispatch(fetchPosts({ limitArticles, offset })).then((result) => {
      dispatch(setBlogs(result));
    });
  }, [dispatch, currentPage, limitArticles]);

  const onChangePage = (page) => {
    dispatch(setPage(page));
  };

  if (localStorage.getItem('user')) {
    const storedUserJson = localStorage.getItem('user');
    const storedUser = JSON.parse(storedUserJson);
    dispatch(setregistrationNewUserError(false));
    dispatch(setUserInfo(storedUser));
  }

  return (
    <Router>
      <div className="mainApp">
        <Header />
        <Routes>
          <Route path="/articles/:slug" element={<ArticleBlogs />} />
          <Route path="/signin" element={<SingIn />} />
          <Route path="/signup" element={<SingUp />} />
          <Route path="/edituser" element={<EditUser />} />
          <Route path="/new-article" element={<CreateArticle />} />
          <Route path="/articles/:slug/edit" element={<CreateArticle />} />
          <Route
            path="/"
            element={
              <>
                <ArticleBlogs />
                <Pagination
                  className="pagination"
                  defaultCurrent={1}
                  total={totalResults}
                  pageSize={limitArticles}
                  onChange={onChangePage}
                />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default Blog;
