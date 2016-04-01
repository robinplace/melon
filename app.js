'use strict'
const Peers = require ('./state/peers')
const Svr = require ('./state/svr')

window.Peers = Peers
window.Svr = Svr

window.console.log = window.console.log.bind (window.console)
