const express = require('express')
const mongoose = require('mongoose') 
const Article = require('./models/article')  // using this connects us to our database
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()

mongoose.connect('mongodb://localhost/blog');


app.set('view engine', 'ejs')  

// Middleware to handle /articles routess
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

// Root route
app.get('/', async (req, res) => {
    const articles = await Article.find().sort({
        createdAt: 'desc'
    })
    res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

// Start the server
app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000')
})
