'use strict'
const Collection = require ('./collection')
const app = require ('ampersand-app')

const Item = require ('./item')

const Shortlist = Collection.extend ({
    model: Item,
})

module.exports = Shortlist
