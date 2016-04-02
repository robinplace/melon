'use strict'
const Collection = require ('./collection')
const app = require ('ampersand-app')

const Idea = require ('./idea')

const Brainstorm = Collection.extend ({
    model: Idea,
})

module.exports = Brainstorm
