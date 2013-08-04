// Generated by CoffeeScript 1.6.2
(function() {
  var SeqUuid, uuid;

  uuid = require('node-uuid');

  SeqUuid = (function() {
    function SeqUuid() {
      this.guid_ver = this.guid_ver || 'v4';
      this.seed = void 0;
      if (!this.deferInit) {
        this.seed = this.generate();
      }
    }

    SeqUuid.prototype.next = function() {
      var carry, _increase, _increaseDigit;

      carry = true;
      _increaseDigit = function(digit) {
        if (digit === 'f') {
          carry = true;
          return '0';
        }
        carry = false;
        if (digit === '9') {
          return 'a';
        }
        return String.fromCharCode(digit.charCodeAt() + 1);
      };
      _increase = function(digit) {
        if (digit === '-') {
          return digit;
        }
        if (carry) {
          return _increaseDigit(digit);
        } else {
          return digit;
        }
      };
      if (this.seed == null) {
        this.seed = this.generate();
      }
      if (this.seed.length !== 36) {
        throw new Error("Seed has invalid format");
      }
      this.seed = this.seed.toLowerCase();
      return this.seed = ((this.seed.split('')).reverse().map(_increase)).reverse().join('');
    };

    SeqUuid.prototype.generate = function() {
      return uuid[this.guid_ver]().toLowerCase();
    };

    SeqUuid.prototype.deferInit = false;

    return SeqUuid;

  })();

  if (require.main === module) {
    throw new Error("This module is not intended to be run as standalone application.");
  }

  module.exports = SeqUuid;

}).call(this);
