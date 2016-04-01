'use strict'
const AndState = require ('ampersand-state')

const isFunction = require ('lodash.isfunction')

const app = require ('ampersand-app')
const Svr = require ('./svr')
const Peers = require ('./peers')

//const Brainstorm = require ('./state/brainstorm')

const Room = AndState.extend ({
    session: {
        peers: 'object',

        code: 'string',
        secret: 'string',
        id: 'string',
    },
    children: {
        //brainstorm: Brainstorm,
    },
    initialize: function () {
        let room = this

        room.peers = new Peers ()
        room.peers.on ('ready', function (id) {
            room.id = id
            room.trigger ('peersready')
        })

        this.setupPeerListeners ()
    },
    makeRoom: function (callback) {
        let room = this
        Svr.make (this.id, function (err, code, secret) {
            if (err) return app.err ('make failed')

            room.code = code
            room.secret = secret

            if (isFunction (callback)) callback.call (room, null, code, secret)
            room.trigger ('roomready')
        })
    },
    joinRoom: function (code, callback) {
        let room = this

        room.code = code // store the room code

        Svr.lookup (code, function (err, users) {
            if (err) return app.err ('lookup failed')

            room.code = code // store the room code

            // contact a peer to get the state of things
            room.peers.once ('allowed', function (secret, data) {
                this.set (data) // TODO this should do it?
                room.secret = secret // store the room secret

                Svr.join (room.id, room.code, room.secret, function (err) {
                    if (err) return app.err ('join failed')

                    if (isFunction (callback)) callback.call (room, null)
                    room.trigger ('roomready')
                })
            })
            room.peers.once ('rejected', function () {
                return app.err ('got rejected')
            })
        })
    },

    setupPeerListeners: function () {
        this.peers.on ('data', function () {
            // TODO route things
        })
    },
})

module.exports = Room

