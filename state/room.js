'use strict'
const AndState = require ('ampersand-state')

const isFunction = require ('lodash.isfunction')

const app = require ('ampersand-app')
const Svr = require ('./svr')
const Peers = require ('./peers')
const NotificationDialogView = require ('../view/notification.dialog.view')
const NotificationView = require ('../view/notification.view')

const Brainstorm = require ('./brainstorm')

// THIS SHOULD SORTA BE A VIEW
const Room = AndState.extend ({
    props: {
        code: 'string',
        secret: 'string',
    },
    collections: {
        peers: Peers,

        brainstorm: Brainstorm,
    },
    addins: function () {
        this.addin ('brainstorm')
    },
    addin: function (name) {
        let collection = this [name]

        this.listenTo (collection, 'add', function (state, collection, options) { if (!options.remote) this.peers.send ('add-'+name, state.toJSON ()) })
        this.listenTo (this.peers, 'add-'+name, function (peer, data) { console.log ('add', name, data); collection.add (data, { remote: true }) })

        this.listenTo (collection, 'remove', function (state, collection, options) { if (!options.remote) this.peers.send ('remove-'+name, state.uuid) })
        this.listenTo (this.peers, 'remove-'+name, function (peer, uuid) { console.log ('remove', name, uuid); collection.remove (uuid, { remote: true }) })

        this.collections.push (name)
    },

    session: {
        id: 'string',
    },
    initialize: function () {
        let room = this

        room.peers.on ('ready', function (id) {
            room.id = id
            room.trigger ('peersready')
        })

        this.collections = []

        this.setupPeerListeners ()

        this.on ('roomready', function () {
            app.trigger ('inroom', this)
        })
    },
    makeRoom: function (callback) {
        let room = this
        this.once ('peersready', function () {
            Svr.make (room.id, function (err, code, secret) {
                if (err) return app.err ('make failed')

                room.code = code
                app.view.code = code
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
                app.view.code = code

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
            app.notify (new NotificationDialogView ({
                title: data.name + '\'d like to join your worktable',
                ok: 'Welcome',
                cancel: 'Reject',
            }).on ('ok', function () {
                peer.send ('auth', { secret: room.secret })
            }).on ('cancel', function () {
                peer.send ('auth', { secret: false })
            }))
        })
        this.listenTo (this.peers, 'whatsup?', function (peer, data) {
            let secret = data.secret
            if (secret !== room.secret) return

            app.notify (new NotificationView ({
                title: 'The user joined you!',
                timeout: 1000,
            }))

            peer.send ('whatsup', room.serialize ())
            let removeds = {}
            this.collections.forEach (function (name) {
                removeds [name] = room [name].removed
            })
            peer.send ('whatsnot', removeds)
        })
        this.listenTo (this.peers, 'whatsup', function (peer, data) {
            data.peers = []
            this.set (data, { merge: false, remove: false })
        })
        this.listenTo (this.peers, 'whatsnot', function (peer, removeds) {
            for (let name in removeds) {
                let removed = removeds [name]
                let collection = room [name]
                for (let uuid in removed) {
                    collection.remove (uuid)
                }
            }
        })
        this.listenTo (this.peers, 'wantit?', function (peer, data) {
            let time = data.time
            app.notify (new NotificationDialogView ({
                title: data.name+' is offering '+data.filename,
                ok: 'Transfer',
                cancel: 'Dismiss',
            }).on ('ok', function () {
                peer.send ('wantit', { time: time })
            }).on ('cancel', function () {
            }))
        })
        this.listenTo (this.peers, 'file', function (data) {
            let view = new Uint8Array (data)
            let blob = new Blob ([ view ])
            let url = window.URL.createObjectURL (blob)

            let reader = new window.FileReader ()
            reader.readAsDataURL (blob)
            reader.onloadend = function () {
                document.location = 'data:application/octet-stream;base64,'+
                    reader.result.slice ('data:;base64,'.length)
            }
        })

        this.addins ()
    },
    send: function (file) {
        let time = Date.now ()
        this.peers.send ('wantit?', { name: 'A user',
                         filename: file.name, time: time })
        this.listenTo (this.peers, 'wantit', function (peer, data) {
            if (data.time === time) {
                peer.data.send (file)
            }
        })
    },
})

module.exports = Room


