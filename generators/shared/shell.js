'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUsername = getUsername;
exports.saveEmail = saveEmail;
exports.saveName = saveName;
exports.saveUsername = saveUsername;
exports.gitInit = gitInit;
exports.gitRemote = gitRemote;
exports.gitRemotes = gitRemotes;
exports.checkRemote = checkRemote;
exports.gitPull = gitPull;
exports.gitCommit = gitCommit;
exports.gitPush = gitPush;

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getUsername() {
  return new Promise((resolve, reject) => {
    if (!_shelljs2.default.which('git')) {
      return reject('This script requires local git installed!');
    }

    _shelljs2.default.exec('git config --get user.githubuser', { silent: true }, (code, stdout, stderr) => {
      if (code !== 0) {
        return reject(stderr);
      }
      return resolve(stdout.trim());
    });
  });
}

function saveEmail(email) {
  return new Promise((resolve, reject) => {
    if (!_shelljs2.default.which('git')) {
      return reject('This script requires local git installed!');
    }
    _shelljs2.default.exec('git config --global user.email "' + email + '"', { silent: true }, (code, stdout, stderr) => {
      if (code !== 0) {
        return reject(stderr);
      }
      return resolve();
    });
  });
}

function saveName(name) {
  return new Promise((resolve, reject) => {
    if (!_shelljs2.default.which('git')) {
      return reject('This script requires local git installed!');
    }
    _shelljs2.default.exec('git config --global user.name "' + name + '"', { silent: true }, (code, stdout, stderr) => {
      if (code !== 0) {
        return reject(stderr);
      }
      return resolve();
    });
  });
}

function saveUsername(username) {
  return new Promise((resolve, reject) => {
    if (!_shelljs2.default.which('git')) {
      return reject('This script requires local git installed!');
    }
    _shelljs2.default.exec('git config --global user.githubuser "' + username + '"', { silent: true }, (code, stdout, stderr) => {
      if (code !== 0) {
        return reject(stderr);
      }
      return resolve();
    });
  });
}

function gitInit() {
  return new Promise((resolve, reject) => {
    if (!_shelljs2.default.which('git')) {
      return reject('This script requires local git installed!');
    }
    _shelljs2.default.exec('git init', { silent: true }, (code, stdout, stderr) => {
      if (code !== 0) {
        return reject(stderr);
      }
      return resolve();
    });
  });
}

function gitRemote(config) {
  return new Promise((resolve, reject) => {
    if (!_shelljs2.default.which('git')) {
      return reject('This script requires local git installed!');
    }
    _shelljs2.default.exec('git remote add ' + config.name + ' ' + config.url, { silent: true }, (code, stdout, stderr) => {
      if (code !== 0) {
        return reject(stderr);
      }
      return resolve();
    });
  });
}

function gitRemotes() {
  return new Promise((resolve, reject) => {
    if (!_shelljs2.default.which('git')) {
      return reject('This script requires local git installed!');
    }
    _shelljs2.default.exec('git remote -v', { silent: true }, (code, stdout, stderr) => {
      if (code !== 0) {
        return reject(stderr);
      }
      let remotes = stdout.split('\n');
      return resolve(remotes);
    });
  });
}

function checkRemote(name) {
  return new Promise((resolve, reject) => {
    gitRemotes().then(remotes => {

      let regex = new RegExp('^' + name + '\t');
      remotes.forEach(remote => {
        if (regex.test(remote)) {
          return resolve('Remote name already exists');
        }
      });
      return resolve(true);
    }).catch(err => {
      return reject(err);
    });
  });
}

function gitPull(config) {
  return new Promise((resolve, reject) => {
    if (!_shelljs2.default.which('git')) {
      return reject('This script requires local git installed!');
    }
    _shelljs2.default.exec('git pull ' + config.name + ' master', { silent: true }, (code, stdout, stderr) => {
      if (code !== 0) {
        return reject(stderr);
      }
      return resolve();
    });
  });
}

function gitCommit(config) {
  return new Promise((resolve, reject) => {
    if (!_shelljs2.default.which('git')) {
      return reject('This script requires local git installed!');
    }
    _shelljs2.default.exec('git add -A && git commit -m "' + config.message + '"', { silent: true }, (code, stdout, stderr) => {
      if (code !== 0) {
        return reject(stderr);
      }
      return resolve();
    });
  });
}

function gitPush(config) {
  return new Promise((resolve, reject) => {
    if (!_shelljs2.default.which('git')) {
      return reject('This script requires local git installed!');
    }
    _shelljs2.default.exec('git push' + (config.name === 'origin' ? ' -u ' : ' ') + config.name + ' ' + config.branch, { silent: true }, (code, stdout, stderr) => {
      if (code !== 0) {
        return reject(stderr);
      }
      return resolve();
    });
  });
}