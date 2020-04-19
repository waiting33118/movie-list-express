const express = require('express')
const exphbs = require('express-handlebars')
const movieList = require('./moviesData.json')

const app = express()
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

const hostname = `192.168.1.112`
const port = `3000`

app.use(express.static('public'))

app.get('/', (req, res) => {
	res.render('index', { movies: movieList.results })
})

app.get('/search', (req, res) => {
	const queryResult = movieList.results.filter((movie) =>
		movie.title.toLowerCase().includes(req.query.keyword.toLowerCase())
	)
	res.render('index', { movies: queryResult, keyword: req.query.keyword })
})

app.get('/movies/:movie_id', (req, res) => {
	const movieDetail = movieList.results.find(
		(movie) => movie.id.toString() === req.params.movie_id
	)
	res.render('show', { movie: movieDetail })
})

app.listen(port, hostname, () => {
	console.log(`The Server is listening on http://${hostname}:${port}`)
})
