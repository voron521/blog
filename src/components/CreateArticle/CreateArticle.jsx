import './CreateArticle.scss';
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  setMyArticles,
  fetchNewArticle,
  setTagsList,
  setTagsListChangeItem,
  setTagsListDeleteItem,
  fetchUpdateArticle,
  setAddOneArticle,
  setModifyBLogs,
  setBlogsLoad,
} from '../../store/BlogsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selecTagsList, selectregistrationUserInfo, selectArticleBySlug } from '../../store/selectors';
import { v4 as uuidv4 } from 'uuid';

function CreateArticle() {
  const { slug } = useParams();
  const tagsList = useSelector(selecTagsList);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const registrationUserInfo = useSelector(selectregistrationUserInfo);
  const article = useSelector(selectArticleBySlug(slug));
  const navigate = useNavigate();

  const addNewArticle = async (event) => {
    navigate('/');
    const data = {
      article: {
        title: event.title,
        description: event.description,
        body: event.text,
        tags: tagsList,
      },
    };
    try {
      const apiKey = registrationUserInfo.token;
      let res;
      if (slug) {
        res = await dispatch(fetchUpdateArticle({ data, slug, apiKey }));
        if (res.meta.requestStatus === 'fulfilled') {
          const nameItem = data;
          const item = null;
          dispatch(setModifyBLogs({ nameItem, item, slug }));
        }
      } else {
        dispatch(setBlogsLoad());
        res = await dispatch(fetchNewArticle({ data, apiKey }));
        if (res.meta.requestStatus === 'fulfilled') {
          dispatch(setAddOneArticle(res.payload.article));
          dispatch(setBlogsLoad());
        }
      }
      dispatch(setTagsList('clean'));
      if (!res.error) {
        dispatch(setMyArticles(data));
        reset({
          title: '',
          description: '',
          text: '',
          tagadd: '',
        });
      }
    } catch (error) {
      console.error('Error edit user:', error);
    }
  };
  useEffect(() => {
    if (article) {
      setValue('title', article.title);
      setValue('description', article.description);
      setValue('text', article.body);
      dispatch(setTagsList(article.tagList));
    }
  }, [article, setValue, dispatch]);

  const addTag = () => {
    const tagValue = watch('tagadd');
    if (tagValue) {
      const updatedTags = tagValue;

      dispatch(setTagsList(updatedTags));
      setValue('tagadd', '');
    }
  };

  const handleTagChange = (index, newValue) => {
    dispatch(setTagsListChangeItem({ index, item: newValue }));
  };
  const handleTagDelete = (indexForDel) => {
    dispatch(setTagsListDeleteItem(indexForDel));
  };
  return (
    <form className="create_article_form" onSubmit={handleSubmit(addNewArticle)}>
      {slug ? (
        <span className="login_form_title">Edit article</span>
      ) : (
        <span className="login_form_title">Create new article</span>
      )}

      <label className="label_form" htmlFor="title">
        Title
      </label>
      <input
        className="input_create_accouont input_article"
        type="input"
        id="title"
        name="title"
        placeholder="Title"
        {...register('title', { required: true })}
      />
      {errors.title && <span className="error_input">поле title должно быть заполнено</span>}

      <label className="label_form" htmlFor="description">
        Short description
      </label>
      <input
        className="input_login_accouont input_article"
        type="input"
        id="description"
        placeholder="Description"
        name="description"
        {...register('description', { required: true })}
      />
      {errors.description && <span className="error_input">поле description должно быть заполнено</span>}

      <label className="label_form" htmlFor="text">
        Text
      </label>
      <textarea
        className="input_login_accouont input_text input_article"
        id="text"
        placeholder="Text"
        name="text"
        {...register('text', { required: true })}
      />
      {errors.text && <span className="error_input">поле text должно быть заполнено</span>}

      <div className="addTagWrapper">
        <span className="tags_title_span">Tags</span>
        {tagsList.length > 0 &&
          tagsList.map((tag, index) => (
            <div className="new_add_tag" key={uuidv4()}>
              <div className="label_inupt_wrapper">
                <input
                  className="input_tag input_article"
                  type="input"
                  placeholder="Tag"
                  name={`tags[${index}]`}
                  value={tag}
                  onChange={(e) => handleTagChange(index, e.target.value)}
                />
              </div>
              <button
                className="tags_button delete_article_button"
                type="button"
                onClick={() => handleTagDelete(index)}
              >
                Delete
              </button>
            </div>
          ))}

        <div className="first_teg_input">
          <div className="label_inupt_wrapper">
            <label className="label_form_tags" htmlFor="tagadd"></label>
            <input
              className="input_tag input_article"
              type="input"
              id="tagadd"
              placeholder="Tag"
              name="tagadd"
              {...register('tagadd')}
            />
          </div>
          <button className="tags_button delete_article_button" type="button">
            Delete
          </button>
          <button className="tags_button add_article_button" type="button" onClick={addTag}>
            Add tag
          </button>
        </div>
      </div>

      <button className="send_article_button" type="submit">
        Send
      </button>
    </form>
  );
}

export default CreateArticle;
