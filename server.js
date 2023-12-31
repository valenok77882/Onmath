// Импорт фреймворка Express
const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
const localStrategy = require('passport-local');
const flash = require('connect-flash');

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

// Для регистраций
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Для добавления отправляемых json-ов в req.body
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// Для инициализации сессии
app.use(session({secret: 'you secret key'}));
// Для создания flash-сообщений (надо для аутентификации)
app.use(flash())
// Для аутентификации
app.use(passport.initialize());
app.use(passport.session());

// Установление стратегии (действий) при регистрации пользователя
passport.use(
	new localStrategy((user, password, done) => {
		if (user !== 'test_user')
			return done(null, false, {
				message: 'User not found';
			})
		else if (password !== 'test_password')
			return done(null, false, {
				message: 'Wrong password';
			})

		return done(null, {id: 1, name: 'Test', age: 21});
	})
);


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