import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectArticles,
  fetchArticles,
  selectCurrentPage,
  setPage
} from './articlesSlice';
import Button from '@material-ui/core/Button';
import { TextField, Card } from '@material-ui/core';

export function Articles() {
  const articles = useSelector(selectArticles);
  const page = useSelector(selectCurrentPage);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <TextField placeholder="Search" name="searchQuery" onChange={(e) => setSearchQuery(e.target.value)} />
      <Button variant="contained" color="primary"  disabled={!searchQuery} onClick={() => {
        if (searchQuery) {
          dispatch(fetchArticles(searchQuery, page))
        }else {
          alert("please enter a search query")
        }
      }}>Submit</Button>
      <ul>
        {articles.map(article => (
          <Card key={article.title}><a href={article.url} rel="noopener noreferrer" target="_blank">{article.title}</a></Card>
        ))}
      </ul>
      {articles.length > 0 ? (
        <div>
          <p>Page: <strong>{page}</strong></p>
          <Button variant="contained" color="primary" disabled={page === 1 || !searchQuery} onClick={() => {
            dispatch(setPage(Math.max(1, page - 1)));
            dispatch(fetchArticles(searchQuery, page));
          }}>Previous</Button>
          <Button  variant="contained" color="primary" disabled={!searchQuery}onClick={() => {
            if(searchQuery){
            dispatch(setPage(page + 1))
            dispatch(fetchArticles(searchQuery, page))
            } else{
              alert("Please enter a search query")
            }
          }}>Next</Button>
        </div>
      ) : null}
    </div>
  );
}
