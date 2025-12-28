const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('data/db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)

// ✅ Custom search endpoint
server.get('/recipes', (req, res, next) => {
    const { q } = req.query
    const recipes = router.db.get('recipes').value()

    if (q) {
        const filtered = recipes.filter(r =>
            r.title.toLowerCase().includes(q.toLowerCase())
        )
        res.json(filtered)
    } else {
        res.json(recipes)
    }
})

server.use(router)
server.listen(3000, () => {
    console.log('✅ JSON Server running on http://localhost:3000')
})