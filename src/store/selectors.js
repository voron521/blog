export const selectblogs = (state) => state.blog.blogs;
export const selectLimitArticles = (state) => state.blog.limitArticles;
export const selectCurrentPage = (state) => state.blog.currentPage;
export const selectTotalResults = (state) => state.blog.totalResults;
export const selectOffset = (state) => state.blog.offset;
export const selectchoseArticle = (state) => state.blog.choseArticle;
export const selectRegistrationNewUserError = (state) => state.blog.registrationNewUserError;
export const selectregistrationUserInfo = (state) => state.blog.registrationUserInfo;
export const selecTagsList = (state) => state.blog.tagsList;
export const selectDeleteArticleWindow = (state) => state.blog.deleteArticleWindow;
export const selectBlogsLoad = (state) => state.blog.blogsLoad;

export const selectArticleBySlug = (slug) => (state) => {
  return state.blog.blogs.find((article) => article.slug === slug);
};
