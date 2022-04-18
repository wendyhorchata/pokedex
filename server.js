require("dotenv").config()

// IMPORT EXPRESS
const express = require('express')
const app = express()
const port = 8080
const methodOverride = require('method-override')
const path = require('path')

// MIDDLEWARE
app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))

// DATABASE
const pokemons = require('./models/pokemon.js')


// ROUTE TO START
app.get('/', (req, res) => {
    res.send('Welcome to Pokedex')
})

// INDEX
app.get('/pokemon', (req, res) => {
    res.render('index.ejs', {
        allPokemon: pokemons
    })
})

// NEW
app.get('/pokemon/new', (req, res) => {
    res.sendFile(__dirname + 'new.ejs')
    res.render('new.ejs')
})

// CREATE
app.post('/pokemon', (req, res) => {

    pokemons.push({

        name: req.body.name,
        image: req.body.img,
        type: [req.body.type],
        stats: {
            hp: req.body.hp,
            attack: req.body.attack,
            defense: req.body.defense,
            spattack: req.body.spattack,
            spdefense: req.body.spdefense,
            speed: req.body.speed
        }

    })
    res.redirect('/pokemon')

})
// SHOW
app.get('/pokemon/:index', (req, res) => {
    res.render('show.ejs', {
        pokemon: pokemons[req.params.index]
    })
})

// DELETE
app.delete('/pokemon/:index', (req, res) => {
    pokemons.splice(req.params.index, 1)
    res.redirect('/pokemon')
})

// EDIT
app.get('/pokemon/:index/edit', (req, res) => {
    res.render('edit.ejs', {
        name: pokemons[req.params.index].name,
        img: pokemons[req.params.index].img,
        type: pokemons[req.params.index].type,
        hp: pokemons[req.params.index].stats.hp,
        attack: pokemons[req.params.index].stats.attack,
        defense: pokemons[req.params.index].stats.defense,
        spattack: pokemons[req.params.index].stats.spattack,
        spdefense: pokemons[req.params.index].stats.spdefense,
        speed: pokemons[req.params.index].stats.speed,

        x: req.params.index
    })
})

// UPDATE
app.put('/pokemon/:index', (req, res) => {
    pokemons[req.params.index].name = req.body.name
    pokemons[req.params.index].img = req.body.img
    pokemons[req.params.index].type = req.body.type
    pokemons[req.params.index].stats.hp = req.body.hp
    pokemons[req.params.index].stats.attack = req.body.attack
    pokemons[req.params.index].stats.defence = req.body.defense
    pokemons[req.params.index].stats.spattack = req.body.spattack
    pokemons[req.params.index].stats.spdefense = req.body.spdefense
    pokemons[req.params.index].stats.speed = req.body.speed
    res.redirect('/pokemon')
})

// LISTEN TO ROUTE
app.listen(port, () => {
    console.log('listening to port: ', port)
})














