'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.publishTx = undefined;

var _config = require('../config');

var RpcClient = require('bitcoind-rpc');


var rpc = new RpcClient(_config.configuration);

var publishTx = exports.publishTx = function publishTx(tx) {
  return new Promise(function (resolve, reject) {
    rpc.sendRawTransaction(tx, function (a, b) {
      resolve(b.result);
    });
  });
};