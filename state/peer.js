'use strict'
const AndState = require ('ampersand-state')
const bind = require('lodash.bind')
const UUID = require ('node-uuid')

const Peer = AndState.extend ({
    props: {
        id: 'string',
        authed: 'boolean', // TODO track this
    },
    session: {
        data: 'object',
        media: 'object',
    },
    initialize: function () {
        if (!this.data) {
            this.data = this.collection.peer.connect (this.id, {
                reliable: true,
                serialization: 'none',
            })
        }
        if (this.collection.talking) {
            this.media = this.collection.peer.call (this.id, this.collection.stream)
        }

        this.listenTo (this.data, 'data', function (data) {
            if (data.constructor === ArrayBuffer) {
                this.trigger ('file', data)
            } else {
                let index = data.indexOf ('\n')
                let event = data.slice (0, index)
                data = data.slice (index + 1)

                console.log ('incoming', event, data)

                this.trigger (event, this, JSON.parse (data))
            }
        })
        this.data.on ('open', bind (this.trigger, this, 'open'))
        this.data.on ('close', bind (this.trigger, this, 'close'))
        this.data.on ('error', bind (this.trigger, this, 'error'))

        this.on ('close', function () {
            console.log ('close', arguments)
            this.trigger ('destroy', this, this.collection)
        })
        this.on ('error', function () {
            console.log ('error', arguments)
            debugger
            this.trigger ('destroy', this, this.collection)
        })

        this.listenTo (this.collection, 'change:talking', function () {
            if (this.collection.talking) {
                this.media = this.collection.peer.call (this.id, this.collection.stream)
            } else {
                this.media.close ()
            }
        })
    },
    send: function (event, data) {
        console.log ('outgoing', event, data)

        let peer = this
        let message = event + '\n' + JSON.stringify (data)
        if (!peer.data.open) {
            return this.once ('open', function () {
                this.data.send (message)
            })
        }
        return this.data.send (message)
    },
    close: function () {
        return this.data.close ()
    },
})

module.exports = Peer
