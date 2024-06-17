const newsDataMapper = (articles) => {
    const columnsNumber = 4;
    const rowOfColumns = [];
    let articlesColumn = [];

    for (let i = 0; i < articles.length; i++) {
      articlesColumn.push(articles[i]);
      if (
        (i + 1) % (articles.length / columnsNumber) === 0 ||
        i === articles.length - 1
      ) {
        rowOfColumns.push(articlesColumn);
        articlesColumn = [];
      }
    }
    return rowOfColumns;
  };

  export default newsDataMapper;