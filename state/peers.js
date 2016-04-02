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
        stream: 'string',
        talking: 'boolean',
    },
    stream: null,
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

        this.listenTo (this.peer, 'call', function (media) {
            let peer = this.get (media.id)
            if (!peer) return

            peer.answer ()
            media.on ('stream', function (stream) {
                let audio = document.createElement ('audio')
                audio.src = URL.createObjectURL (stream)

                document.body.appendChild (audio)
            })
        })

        this.on ('change:talking', function () { app.talking = this.talking })
    },
    send: function (event, data) {
        this.forEach (function (peer) {
            peer.send (event, data)
        })
    },

    talk: function () {
        let peer = this

        if (this.stream) {
            this.talking = true
            return
        }

        navigator.getUserMedia = navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedi
        navigator.getUserMedia ({ audio: true, video: false }, function (stream) {
            peer.stream = stream
            peer.talking = true
        }, function () {})
    },
    untalk: function () {
        this.talking = true
    },
})

module.exports = Peers
