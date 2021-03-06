'use strict';

var _yeomanGenerator = require('yeoman-generator');

var _github = require('../shared/github');

var github = _interopRequireWildcard(_github);

var _lodash = require('lodash.merge');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.defaults');

var _lodash4 = _interopRequireDefault(_lodash3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

class GithubReadmeGenerator extends _yeomanGenerator.Base {

  constructor(...args) {
    super(...args);

    this.option('profile', {
      type: String,
      alias: 'p',
      desc: 'Profile for badge.  Ex: https://david-dm.org/<PROFILE>/server-express-module'
    });

    this.option('repository', {
      type: String,
      alias: 'r',
      desc: 'Repository.  Ex: https://david-dm.org/trainerbill/<REPOSITORY>'
    });

    this.option('title', {
      type: String,
      alias: 't',
      desc: 'Readme title'
    });

    this.option('description', {
      type: String,
      alias: 'd',
      desc: 'Readme title'
    });

    this.option('badges', {
      type: String,
      alias: 'b',
      desc: 'Comma delimited string of badges to enable'
    });

    this.option('scoped', {
      type: String,
      alias: 'i',
      desc: 'Package is an npm scoped package Ex: @modern-mean/server-base-module'
    });
  }

  initializing() {
    let createconfig = this.config.get('create');
    this.allBadges = ['travis', 'coveralls', 'david', 'davidDev', 'gitter', 'npm'];
    /* istanbul ignore next: dont know how to mock config from another gen */
    this.options = (0, _lodash4.default)(this.options, this.config.get('readme'), {
      profile: createconfig ? createconfig.org || createconfig.username : undefined,
      repository: createconfig ? createconfig.name : undefined,
      title: createconfig ? createconfig.name : undefined,
      description: createconfig ? createconfig.description : undefined,
      scoped: false
    });
  }

  prompting() {

    let prompts = [{
      name: 'title',
      default: this.options.title,
      message: 'README Title'
    }, {
      name: 'description',
      default: this.options.description,
      message: 'README Description'
    }, {
      type: 'confirm',
      name: 'usebadges',
      default: this.options.usebadges,
      message: 'Create Badges?'
    }, {
      when: answers => {
        return answers.usebadges;
      },
      type: 'checkbox',
      name: 'badges',
      message: 'Select badges to enable',
      choices: this.allBadges,
      default: this.options.badges
    }, {
      when: answers => {
        return answers.usebadges;
      },
      name: 'profile',
      default: this.options.profile,
      message: 'Badge Profile(user/org)'
    }, {
      when: answers => {
        return answers.usebadges;
      },
      name: 'repository',
      default: this.options.repository,
      message: 'Badge Repository'
    }, {
      when: answers => {
        return answers.badges.indexOf('npm') !== -1;
      },
      type: 'confirm',
      name: 'scoped',
      default: this.options.scoped,
      message: 'Is this package an NPM scoped package?  Ex: @modern-mean/server-base-module'
    }];

    return this.prompt(prompts).then(answers => {
      this.config.set('readme', (0, _lodash2.default)(this.config.get('readme'), answers));
    });
  }

  configuring() {
    return this.config.save();
  }

  writing() {
    let config = this.config.get('readme');

    this.fs.copyTpl(this.templatePath('README.md'), this.destinationPath('README.md'), {
      profile: config.profile,
      repository: config.repository,
      badges: config.badges,
      description: config.description,
      title: config.title,
      scoped: config.scoped ? `@${ config.profile }/${ config.repository }` : undefined,
      scopedEncoded: config.scoped ? encodeURIComponent(`@${ config.profile }/${ config.repository }`) : undefined
    });
  }

}

module.exports = GithubReadmeGenerator;