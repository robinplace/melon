'use strict'
const AndState = require ('ampersand-state')
const UUID = require ('node-uuid')

const app = require ('ampersand-app')

const State = AndState.extend ({
    props: {
        uuid:    [ 'string', true, () => UUID.v4 () ],
        counter: [ 'number', true, 0 ],
        creator: [ 'string', true, () => app.room.id ],
        created: [ 'number', true, () => Date.now () ],
    },
    derived: {
        sort: { deps: [ 'number', 'creator', 'created' ], fn: function () {
            return this.number+' '+this.creator+' '+this.created
        } },
    },
    // don't allow updates
    set: function (attrs, options) {
        if (options.initial) {
            return AndState.prototype.set.apply (this, arguments)
        }
        throw new Error ('An State is immutable, instead remove and add another')
    },
})

module.exports = State

