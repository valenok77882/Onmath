exports.generateArticleAll = async function(articlesList) {
  let allArticles = '';
  for (let article of articlesList) {
    allArticles += `<a class="article" href="/articles/${article.articleName}">
      <img class="image" src="${article.imageSource}">
      <div class="title">
        ${article.title}
      </div>
      <div class="description">
        ${article.description}
      </div>
    </a>`
  }
  return allArticles;
}