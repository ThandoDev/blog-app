// Set up express and require necessary modules
const express = require('express');
const Article = require('./../models/article');
const router = express.Router();

// Route to render a new article form
router.get('/new', (req, res) => {
    res.render('articles/new', { article: new Article() });
});

// Route to get an article by ID and render it
router.get('/:slug', async (req, res) => {
    try {
        const article = await Article.findOne({ slug: req.params.slug })
        if (article == null) {
            return res.redirect('/');
        }
        res.render('articles/show', { article: article });
    } catch (e) {
        console.error(e);
        res.redirect('/');
    }
});

// Route to create a new article
router.post('/', async (req, res) => {
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    });
    
    try {
        article = await article.save(); // this is an asynchronous function
        res.redirect(`/articles/${article.slug}`); // Use backticks for template literals
    } catch (e) {
        console.error(e);
        res.render('articles/new', { article: article });
    }
})


router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

module.exports = router;


