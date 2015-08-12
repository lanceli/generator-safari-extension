'use strict';
var util = require('util');
var fs = require('fs');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var plist = require('plist');


var SafariExtensionGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    // init extension info
    this.Info = {
    };

    // setup the test-framework property, Gruntfile template will need this
    this.testFramework = this.options['test-framework'] || 'mocha';
    this.coffee = this.options['coffee'];
    this.compass = this.options['compass'];

    this.extensionDir = 'app.safariextension';

    // copy script with js or coffee extension
    this.copyjs = function copyjs(src, dest) {
      var ext = this.coffee ? '.coffee' : '.js';

      src = src + ext;
      dest = dest ? dest + ext : src;
      this.template('scripts/' + src, this.extensionDir + '/scripts/' + dest);
    };

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous SafariExtension generator!'));

    var prompts = [
      {
        name: 'CFBundleDisplayName',
        message: 'The extension display name?',
        default : this.appname ? this.appname : 'demo'
      },
      {
        name: 'Author',
        message: 'The author name?',
        default: ''
      },
      {
        name: 'Description',
        message: 'The description?',
        default: 'Description'
      },
      {
        name: 'CFBundleIdentifier',
        message: 'The Identifier?',
        default: 'com.yourcompany.name'
      },
      {
        name: 'CFBundleShortVersionString',
        message: 'The display version?',
        default: '0.1.0'
      },
      {
        name: 'CFBundleVersion',
        message: 'The display version?',
        default: '0.1.0'
      },
      {
        type: 'checkbox',
        name: 'features',
        message: 'Would you like more features?',
        choices: [
          {
              value: 'globalpage',
              name: 'Global Page',
              checked: true
          }, {
              value: 'optionspage',
              name: 'Options Page',
              checked: true
          }
        ]
      }
    ];

    this.prompt(prompts, function (answers) {
      this.Info = answers;

      var safariVersionPlist = '/Applications/Safari.app/Contents/version.plist';
      if (fs.existsSync(safariVersionPlist)) {
          var safari = plist.parse(this.read(safariVersionPlist));
          this.Info.BuilderVersion = safari.CFBundleVersion;
      } else {
          this.Info.BuilderVersion = '9537.77.4';
      }
      this.Info.globalpage = (answers.features.indexOf('globalpage') != -1);
      this.Info.optionspage = (answers.features.indexOf('optionspage') != -1);

      done();
    }.bind(this));
  },
  app: function () {
    this.mkdir(this.extensionDir);

    this.template('_package.json', 'package.json');
    this.copy('icon.png', this.extensionDir + '/icon.png');
  },
  infoplist: function () {
    this.template('Info.plist', this.extensionDir + '/Info.plist');
  },
  settingsplist: function () {
    if (this.Info.optionspage) {
      this.template('Settings.plist', this.extensionDir + '/Settings.plist');
    }
  },
  gruntfile: function () {
    this.template('Gruntfile.js');
  },
  git: function () {
    this.template('gitignore', '.gitignore');
  },
  bower: function () {
    this.copy('_bower.json', 'bower.json');
    this.copy('bowerrc', '.bowerrc');
  },
  globalpage: function () {
    if (this.Info.globalpage) {
      this.copy('global.html', this.extensionDir + '/global.html');
      this.copyjs('global');
    }
  },
  optionspage: function () {
    if (this.Info.optionspage) {
      this.copy('options.html', this.extensionDir + '/options.html');
      this.copyjs('options');
      var css = 'styles/main.' + (this.compass ? 's' : '') + 'css';
      this.copy(css, this.extensionDir + '/' + css);
    }
  },
  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = SafariExtensionGenerator;
