'use strict'
const AndState = require ('ampersand-state')
const bind = require('lodash.bind')
const UUID = require ('node-uuid')

const Peer = AndState.extend ({
    props: {
        id: 'string',
    },
    session: {
        data: 'object',
    },
    initialize: function () {
        if (!this.data) this.data = this.collection.peer.connect (this.id, {
            reliable: true,
        })

        this.data.on ('data', bind (this.trigger, this, 'data'))
        this.data.on ('open', bind (this.trigger, this, 'open'))
        this.data.on ('close', bind (this.trigger, this, 'close'))
        this.data.on ('error', bind (this.trigger, this, 'error'))

        this.on ('close', function () {
            this.trigger ('destroy', this, this.collection)
        })
        this.on ('error', function () {
            this.trigger ('destroy', this, this.collection)
        })
    },
    send: function (data) {
        return this.data.send (data)
    },
    close: function () {
        return this.data.close ()
    },
})

module.exports = Peer
