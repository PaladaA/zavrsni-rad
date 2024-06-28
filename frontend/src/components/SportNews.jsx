import React, { useEffect, useState } from "react";
import newsDataMapper from "../dataStructuringFunctions/newsDataMapper";
import { fetchSportNews } from "../functions/apiFunctions"
import {
  fetchAddStringToSearchHistory
} from "../functions/apiFunctions";
import { useContextComp } from "../components/MyContext";

const SportNews = () => {
  const [articlesList, setArticlesList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [originalArticlesList, setOriginalArticlesList] = useState([]);
  const { user } = useContextComp();

  const fetchSportNewsData = async () => {
    const articles = await fetchSportNews();
    const mappedArticles = newsDataMapper(articles);
    setArticlesList(mappedArticles);
    setOriginalArticlesList(mappedArticles);
  }

  const onSearchClick = () => {
    if (searchTerm.trim() === '') {
      setArticlesList(originalArticlesList);
    }
    else {
      const filteredArticles = originalArticlesList.map(column =>
        column.filter(article =>
          article.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setArticlesList(filteredArticles);
      fetchAddStringToSearchHistory(user.id, searchTerm.toLowerCase())
    }
  };

  useEffect(() => {
    fetchSportNewsData();
  }, []);


  return (
    <div id="sport-news">
      <div id="row">
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button onClick={onSearchClick}>Search</button>
      </div>
      <div id="row">
        {articlesList.map((articleColumn, i) => {
          return (
            <div key={i} className="column">
              {articleColumn.map((article) => (
                <div
                  key={article.url}
                  id="article"
                  onClick={() => window.open(article.url, "_blank")}
                >
                  {article.urlToImage && (
                    <img src={article.urlToImage} alt="" />
                  )}
                  <h3>{article.title}</h3>
                  {article.author && <p>By: {article.author}</p>}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SportNews;
