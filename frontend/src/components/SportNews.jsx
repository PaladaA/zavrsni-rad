import React, { useEffect, useState } from "react";
import newsDataMapper from "../dataStructuringFunctions/newsDataMapper";
import {fetchSportNews} from "../functions/apiFunctions"

const SportNews = () => {
  const [articlesList, setArticlesList] = useState([]);

  const fetchSportNewsData = async() => {
    const articles = await fetchSportNews();
    setArticlesList(newsDataMapper(articles));
  }

  useEffect(() => {
    fetchSportNewsData();
  }, []);


  return (
    <div id="sport-news">
      <div id="row">
        {articlesList.map((articleColumn, i) => {
          return (
            <div key={i} className="column">
              {articleColumn.map((article) => (
                <div
                  key={article.urlToImage}
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
