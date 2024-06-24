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
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

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
    const currentPage = JSON.stringify(page);
    localStorage.setItem('currentPage', currentPage);

  };

  useEffect(() => {
    const storedUserJson = localStorage.getItem('user');
    const storedCurrentPage = localStorage.getItem('currentPage');
    if (storedUserJson) {
      const storedUser = JSON.parse(storedUserJson);
      dispatch(setregistrationNewUserError(false));
      dispatch(setUserInfo(storedUser));
    }

    if (storedCurrentPage) {
      const currentPage = JSON.parse(storedCurrentPage);
      dispatch(setPage(currentPage));
    }
  }, [dispatch]);

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
          <Route path="/blog" element={<Navigate to="/" />} />
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
                  current={currentPage}
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
