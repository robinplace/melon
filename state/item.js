'use strict'
const State = require ('./state')
const AndState = require ('ampersand-state')

const app = require ('ampersand-app')

const Item = State.extend ({
    props: {
        done: [ 'boolean', true, false ],
        text: 'string',
    },
})

module.exports = Item
