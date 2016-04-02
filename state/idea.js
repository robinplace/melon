'use strict'
const State = require ('./state')
const AndState = require ('ampersand-state')

const app = require ('ampersand-app')

const Idea = State.extend ({
    initialize: function () {
        console.log ('got an idea', arguments)
    },
    props: {
        text: 'string',
    },
})

module.exports = Idea
