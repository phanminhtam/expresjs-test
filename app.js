const express = require('express')
const fs = require('fs')
const path = require('path')
const hbs = require('express-handlebars')

const app = express()
const port = 3000

app.set('view engine', 'hbs')

app.engine('hbs', hbs({
    extname: 'hbs',
    layoutsDir: __dirname + '/views/layouts/',
    defaultLayout: 'default.hbs'
}))

app.get('/', (req, res, next) => {
    res.render('index')
});

app.get('/api', (req, res, next) => {
    try {
        const data = fs.readFileSync(path.join(__dirname, './data.txt'), 'utf8')
        res.json({
            data
        })
    } catch (error) {
        res.status(500).json({
            data: error.message
        })
    }
    
});

app.post('/api', (req, res, next) => {
    try {
        let data = fs.readFileSync(path.join(__dirname, './data.txt'), 'utf8')

        if (data === 'hello') {
            data = 'hi'
        } else {
            data = 'hello'
        }
    
        fs.writeFileSync(path.join(__dirname, './data.txt'), data);
        res.json({
            data: 'success'
        })  
    } catch (error) {
        res.status(500).json({
            data: error.message
        })
    }
});

app.listen(port, () => console.log(`TaMy app listening at http://localhost:${port}`))