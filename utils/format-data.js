exports.formatComments = (comments, articles) => {
  let commentsClone = comments.map(element => {
    let elementClone = { ...element };
    let correctData = articles.find(refElement => {
      return refElement["title"] === elementClone["belongs_to"];
    });
    elementClone["article_id"] = correctData["article_id"];
    elementClone["author"] = elementClone["created_by"];
    elementClone.created_at = new Date(elementClone.created_at);
    delete elementClone["belongs_to"];
    delete elementClone["created_by"];
    return elementClone;
  });

  return commentsClone;
};

exports.formatArticles = articles => {
  let articlesClone = [...articles];
  articlesClone.forEach(element => {
    element.created_at = new Date(element.created_at);
    element.votes = 0;
  });
  return articlesClone;
};
