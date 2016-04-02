'use strict'
const AndCollection = require ('ampersand-collection')
const bind = require('lodash.bind')
const PeerJS = require ('peerjs')

const Peer = require ('./peer')

const Peers = AndCollection.extend ({
    model: Peer,
    mainIndex: 'id',

    session: {
        peer: 'object',
        id: 'string',
    },
    initialize: function () {
        if (!this.peer) this.peer = new PeerJS ({
            host: 'turleys.xyz',
            port: 443,
            path: '/melon/peerjs',
            secure: true,

            debug: 3,
        })

        let peers = this

        this.peer.on ('disconnected', bind (this.trigger, this, 'disconnected'))
        this.peer.on ('close',        bind (this.trigger, this, 'close'))
        this.peer.on ('error',        bind (this.trigger, this, 'error'))
        this.peer.on ('connection',   bind (this.trigger, this, 'connection'))

        this.peer.on ('open', function (id) {
            peers.id = id
            peers.trigger ('ready', id)
        })

        this.on ('connection', function (data) {
            this.add ({
                id: data.id,
                data: data, // add the data connection
            })
        })
    },
    send: function (event, data) {
        this.forEach (function (peer) {
            peer.send (event, data)
        })
    },
})

module.exports = Peers
