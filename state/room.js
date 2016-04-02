'use strict'
const AndState = require ('ampersand-state')

const isFunction = require ('lodash.isfunction')

const app = require ('ampersand-app')
const Svr = require ('./svr')
const Peers = require ('./peers')
const NotificationView = require ('../view/notification.view')

//const Brainstorm = require ('./state/brainstorm')

// THIS SHOULD SORTA BE A VIEW
const Room = AndState.extend ({
    props: {
        code: 'string',
        secret: 'string',
    },
    collections: {
        peers: Peers,
    },
    session: {
        id: 'string',
    },
    children: {
        //brainstorm: Brainstorm,
    },
    initialize: function () {
        let room = this

        room.peers.on ('ready', function (id) {
            room.id = id
            room.trigger ('peersready')
        })

        this.setupPeerListeners ()
    },
    makeRoom: function (callback) {
        let room = this
        this.once ('peersready', function () {
            Svr.make (room.id, function (err, code, secret) {
                if (err) return app.err ('make failed')

                room.code = code
                room.secret = secret

                if (isFunction (callback)) callback.call (room, null, code, secret)
                room.trigger ('roomready')
            })
        })
    },
    joinRoom: function (code, callback) {
        let room = this

        room.code = code // store the room code

        this.once ('peersready', function () {
            Svr.lookup (code, function (err, users) {
                if (err) {
                    if (err.status === 400) return room.trigger ('badcode')
                    return app.err ('lookup failed')
                }

                room.code = code // store the room code

                users = users.map (function (userId) {
                    return { id: userId }
                })
                room.peers.add (users)

                room.trigger ('askingpermission')

                // contact a peer to get allowed
                room.peers.send ('auth?', { name: 'A user' })
                room.peers.once ('auth', function (peer, data) {
                    let secret = data.secret

                    if (!data.secret) app.err ('rejected')

                    room.secret = secret // store the room secret

                    Svr.join (room.code, room.secret, room.id, function (err) {
                        if (err) return app.err ('join failed')

                        // contact peers to get state
                        room.peers.send ('whatsup?', { secret: room.secret })
                        room.peers.once ('whatsup', function (peer, data) {
                            if (isFunction (callback)) callback.call (room, null)

                            room.trigger ('roomready')
                        })
                    })
                })
                room.peers.once ('rejected', function () {
                    return app.err ('got rejected')
                })
            })
        })
    },

    setupPeerListeners: function () {
        let room = this
        this.peers.on ('auth?', function (peer, data) {
            app.notify (new NotificationView ({
                title: data.name + ' wants to join',
                message: 'Do you know this friend?',
                ok: 'Welcome',
                cancel: 'Skedaddle!',
            }).on ('ok', function () {
                peer.send ('auth', { secret: room.secret })
            }).on ('cancel', function () {
                peer.send ('auth', { secret: false })
            }))
        })
        this.peers.on ('whatsup?', function (peer, data) {
            let secret = data.secret
            if (secret !== room.secret) return

            peer.send ('whatsup', room.serialize ())
        })
        this.peers.on ('whatsup', function (peer, data) {
            debugger
            this.set (this.parse (data))
        })
    },
})

module.exports = Room


