import { createSlice } from '@reduxjs/toolkit';

const NEWSAPI_BASE_URL = process.env.REACT_APP_NEWSAPI_BASE_URL;
const NEWSAPI_API_KEY = process.env.REACT_APP_NEWSAPI_API_KEY;
const PAGE_SIZE = 10;

export const newsSlice = createSlice({
  name: 'news',
  initialState: {
    articles: [],
    page: 1
  },
  reducers: {
    setArticles: (state, action) => {
      state.articles = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload
    }
  },
});

export const { setArticles, setPage } = newsSlice.actions;

export const fetchArticles = (searchQuery, page) => dispatch => {
  const url = `${NEWSAPI_BASE_URL}?${new URLSearchParams({q: searchQuery, pageSize: PAGE_SIZE, page})}`
  console.log(url)
  fetch(url, {
    headers: {
      "X-Api-Key": NEWSAPI_API_KEY
    }
  }).then(res => res.json()).then(data => {
    console.log(data)
    dispatch(setArticles(data.articles))
  })
}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectArticles = state => state.news.articles;
export const selectCurrentPage = state => state.news.page;

export default newsSlice.reducer;
