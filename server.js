// Импорт фреймворка Express
const express = require('express');
const app = express();

// Функция для проверки авторизирован ли пользователь
function checkAuth() {
	return app.use((req, res, next) => {
		if (req.user) next();
		else res.redirect('/login');
	})
}

// Использование шаблонизации через Express-Handlebars
const handlebars = require('express-handlebars').create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// Модуль для генерации списка статей из объектов
const articlesList = require('./lib/articlesList.js');

// Определения порта
app.set('port', process.env.PORT || 3000);

// Определение директории, где хранятся статические материалы (.css, .js для фронтенда, изображения)
app.use(express.static(__dirname + '/public'));


// Домашняя страница
app.get('/', (req, res) => {
	res.render('index');
})

// Страница со списком статей
app.get('/articles', async (req, res) => {
	let articles = [
		{
			imageSource: '/img/math.png',
			title: 'Математика',
			description: 'Начало изучения математики',
			articleName: 'article',
		},
		{
			imageSource: '/img/math.png',
			title: 'Математика',
			description: 'Начало изучения математики',
			articleName: 'article',
		},
		{
			imageSource: '/img/math.png',
			title: 'Математика',
			description: 'Начало изучения математики',
			articleName: 'article',
		},
		{
			imageSource: '/img/math.png',
			title: 'Математика',
			description: 'Начало изучения математики',
			articleName: 'article',
		},
		{
			imageSource: '/img/math.png',
			title: 'Математика',
			description: 'Начало изучения математики',
			articleName: 'article',
		},
	]
	const articlesHTML = await articlesList.generateArticleAll(articles)
	res.render('articlesList', {articles: articlesHTML});
})

// Страница конкретной статьи
app.get('/articles/article', (req, res) => {
	res.render('article', {articleConent: 'Некий текст статьи'});
})

// Страница авторизации
app.get('/registr', (req, res) => {
	res.render('registr');
})

// пользовательская страница 404
app.use((req, res, next) => {
  res.status(404);
  res.render('404');
});

// Пользовательская страница 500
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500);
  res.render('500');
})

app.listen(app.get('port'), () => {
  console.log('Express запущен на http://localhost:' + app.get('port') + '; нажмите Ctrl+C для завершения.');
});