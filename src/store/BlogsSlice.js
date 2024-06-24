import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async ({ limitArticles, offset }, { rejectWithValue }) => {
    const apiBase = `https://blog.kata.academy/api/articles?limit=${limitArticles}&offset=${offset}`;
    try {
      const res = await fetch(apiBase);
      if (!res.ok) {
        throw new Error(`Запрос не получился по url:${apiBase} он завершился со статусом: ${res.status}`);
      }
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchRegistrationNewUser = createAsyncThunk(
  'users/fetchRegistrationNewUser',
  async ({ data }, { rejectWithValue }) => {
    const optionsUser = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        user: {
          username: data.username,
          email: data.email,
          password: data.password,
        },
      }),
    };

    const apiBase = 'https://blog.kata.academy/api/users';
    try {
      const res = await fetch(apiBase, optionsUser);
      if (!res.ok) {
        throw new Error(`Request failed with status: ${res.status}`);
      }
      const result = await res.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchEditUser = createAsyncThunk('users/fetchEditUser', async ({ data, apiKey }, { rejectWithValue }) => {
  const optionsUser = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${apiKey}`,
    },
    body: JSON.stringify({
      user: {
        username: data.username,
        email: data.email,
        password: data.password,
        image: data.avatarImage,
        bio: 'I work at State Farm.',
      },
    }),
  };

  const apiBase = 'https://blog.kata.academy/api/user';
  try {
    const res = await fetch(apiBase, optionsUser);
    if (!res.ok) {
      throw new Error(`Request failed with status: ${res.status}`);
    }
    const result = await res.json();
    return result;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchNewArticle = createAsyncThunk(
  'users/fetchNewArticle',
  async ({ data, apiKey }, { rejectWithValue }) => {
    const optionsArticle = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${apiKey}`,
      },
      body: JSON.stringify({
        article: {
          title: data.article.title,
          description: data.article.description,
          body: data.article.description,
          tagList: [...data.article.tags],
        },
      }),
    };

    const apiBase = 'https://blog.kata.academy/api/articles';
    try {
      const res = await fetch(apiBase, optionsArticle);
      if (!res.ok) {
        throw new Error(`Request failed with status: ${res.status}`);
      }
      const result = await res.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUpdateArticle = createAsyncThunk(
  'users/fetchUpdateArticle',
  async ({ data, slug, apiKey }, { rejectWithValue }) => {
    const optionsUpdateArticle = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${apiKey}`,
      },
      body: JSON.stringify({
        article: {
          title: data.article.title,
          description: data.article.description,
          body: data.article.description,
          tagList: [...data.article.tags],
        },
      }),
    };

    const apiBase = `https://blog.kata.academy/api/articles/${slug}`;
    try {
      const res = await fetch(apiBase, optionsUpdateArticle);
      if (!res.ok) {
        throw new Error(`Request failed with status: ${res.status}`);
      }
      const result = await res.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchChangeLikeArticle = createAsyncThunk(
  'users/fetchChangeLikeArtic',
  async ({ slug, apiKey, favorited }, { rejectWithValue }) => {
    const optionsAddLikeArticle = {
      method: favorited ? 'DELETE' : 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${apiKey}`,
      },
    };

    const apiBase = `https://blog.kata.academy/api/articles/${slug}/favorite`;
    try {
      const res = await fetch(apiBase, optionsAddLikeArticle);
      if (!res.ok) {
        throw new Error(`Request failed with status: ${res.status}`);
      }
      const result = await res.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchDeleteArticle = createAsyncThunk(
  'users/fetchDeleteArticle',
  async ({ slugToDelete, apiKey }, { rejectWithValue }) => {
    const optionsArticleDelete = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${apiKey}`,
      },
    };

    const apiBase = `https://blog.kata.academy/api/articles/${slugToDelete}`;
    try {
      const res = await fetch(apiBase, optionsArticleDelete);
      if (!res.ok) {
        throw new Error(`Request failed with status: ${res.status}`);
      }
      const result = await res.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchLogInUser = createAsyncThunk('users/fetchLogInUser', async ({ data }, { rejectWithValue }) => {
  const optionsLoginUser = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      user: {
        email: data.email,
        password: data.password,
      },
    }),
  };

  const apiBase = 'https://blog.kata.academy/api/users/login';
  try {
    const res = await fetch(apiBase, optionsLoginUser);
    if (!res.ok) {
      throw new Error(`Request failed with status: ${res.status}`);
    }
    const result = await res.json();
    return result;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const BlogSlice = createSlice({
  name: 'blog',
  initialState: {
    blogs: [],
    blogsLoad: false,
    limitArticles: 10,
    totalResults: 0,
    currentPage: 1,
    choseArticle: null,
    newUserRegistrationInfo: null,
    registrationNewUserError: false,
    registrationUserInfo: null,
    myArticles: null,
    tagsList: [],
    deleteArticleWindow: false,
  },
  reducers: {
    setBlogs(state, action) {
      state.blogs = action.payload.payload.articles;
      state.blogsLoad = true;
      state.totalResults = action.payload.payload.articlesCount;
    },
    setBlogsLoad(state) {
      state.blogsLoad = !state.blogsLoad;
    },
    setPage(state, action) {
      state.currentPage = action.payload;
    },
    setChoseArticle(state, action) {
      state.choseArticle = action.payload;
    },
    setNewUserRegistrationInfo(state, action) {
      state.newUserRegistrationInfo = action.payload;
    },
    setregistrationNewUserError(state, action) {
      state.registrationNewUserError = action.payload;
    },
    setUserInfo(state, action) {
      state.registrationUserInfo = action.payload;
    },
    setDivWrapperRoghtButtons(state, action) {
      state.signInButtonClass = action.payload;
    },
    setMyArticles(state, action) {
      state.myArticles = action.payload;
    },
    setTagsList(state, action) {
      if (action.payload === 'clean') {
        state.tagsList = [];
      } else {
        if (Array.isArray(action.payload)) {
          state.tagsList = [...state.tagsList, ...action.payload];
        } else {
          state.tagsList = [...state.tagsList, action.payload];
        }
      }
    },
    setTagsListChangeItem(state, action) {
      state.tagsList[action.payload.index] = action.payload.item;
    },
    setTagsListDeleteItem(state, action) {
      state.tagsList = state.tagsList.filter((_, index) => index !== action.payload);
    },
    setDeleteArticleWindow(state) {
      state.deleteArticleWindow = !state.deleteArticleWindow;
    },
    setDeleteArticle(state, action) {
      const newState = state.blogs.filter((blog) => blog.slug !== action.payload);
      state.blogs = newState;
    },
    setAddOneArticle(state, action) {
      state.blogs.unshift(action.payload);
    },
    setModifyBLogs(state, action) {
      let newBlogs;
      if (typeof action.payload.nameItem === 'object') {
        const newItem = action.payload.nameItem.article;

        newBlogs = state.blogs.map((blog) => {
          if (blog.slug === action.payload.slug) {
            Object.keys(newItem).forEach((key) => {
              blog[key] = newItem[key];
            });
          }

          return blog;
        });
      } else {
        newBlogs = state.blogs.map((blog) => {
          if (blog.slug === action.payload.slug) {
            blog[action.payload.nameItem] = action.payload.item;
            blog.favorited = !blog.favorited;
          }

          return blog;
        });
      }

      state.blogs = newBlogs;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.blogs = action.payload.articles;
        state.totalResults = action.payload.articlesCount;
        state.blogsLoad = true;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.blogsLoad = false;
        console.error('Ошибка при загрузке статей:', action.payload);
      });
  },
});

export const {
  setBlogs,
  setPage,
  setChoseArticle,
  setregistrationNewUserError,
  setUserInfo,
  setMyArticles,
  setTagsList,
  setTagsListChangeItem,
  setTagsListDeleteItem,
  setDeleteArticleWindow,
  setModifyBLogs,
  setAddOneArticle,
  setDeleteArticle,
  setBlogsLoad,
} = BlogSlice.actions;

export default BlogSlice.reducer;
