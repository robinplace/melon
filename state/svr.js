'use strict'
const AndState = require ('ampersand-collection')
const $ = require ('jquery')
const isFunction = require ('lodash.isfunction')
var assign = require('lodash.assign');

const Svr = {
    url: document.location.pathname+'rooms/',
    make: function (user, callback) {
        var svr = this
        $.ajax (this.url, {
            method: 'GET',
            url: this.url,
            data: { a: 'make', user: user },
        }).done (function (data) {
            data = data.split (',')

            let code = data [0]
            let secret = data [1]
            if (isFunction (callback)) callback.call (svr, null, code, secret)
        }).fail (function (error) {
            if (isFunction (callback)) callback.call (svr, error)
        })
    },
    lookup: function (code, callback) {
        var svr = this
        $.ajax (this.url, {
            method: 'GET',
            url: this.url,
            data: { a: 'lookup', code: code },
        }).done (function (data) {
            let users = data.split (',')
            if (isFunction (callback)) callback.call (svr, null, users)
        }).fail (function (error) {
            if (isFunction (callback)) callback.call (svr, error)
        })
    },
    join: function (code, secret, user, callback) {
        var svr = this
        $.ajax (this.url, {
            method: 'GET',
            url: this.url,
            data: { a: 'join', code: code, secret: secret, user: user },
        }).done (function (data) {
            let users = data.split (',')
            if (isFunction (callback)) callback.call (svr, null)
        }).fail (function (error) {
            if (isFunction (callback)) callback.call (svr, error)
        })
    },
}

module.exports = Svr

