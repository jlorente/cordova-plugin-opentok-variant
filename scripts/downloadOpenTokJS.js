#!/usr/bin/env node

module.exports = function (context) {
    /**
     *
     * Change to correct version
     */
    var openTokJSClientVersion = "v2";

    /**
     *
     * Do not change anything below this
     */
    var downloadFile = require('./downloadFile.js'),
        exec = require('./exec/exec.js'),
        Q = context.requireCordovaModule('q'),
        fs = require('fs'),
        deferral = new Q.defer();
    console.log('Downloading OpenTok JS SDK');
    downloadFile('https://static.opentok.com/' + openTokJSClientVersion +'/js/opentok.js', './opentok.js', function (err) {
        if (!err) {
            console.log('downloaded');
            fs.appendFile('./opentok.js', 'module.exports = window.OT;', function (err) {
                if (err) throw err;
                console.log('Module export added to opentok.js!');

                var frameworkDir = context.opts.plugin.dir + '/src/browser/';
                exec('mv ./opentok.js ' + frameworkDir, function (err, out, code) {
                    console.log('moved openTok.js into ' + frameworkDir);
                    deferral.resolve();
                });
            });
        }
    });
    return deferral.promise;
};
