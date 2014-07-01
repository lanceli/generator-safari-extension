'use strict';
var util = require('util');
var path = require('path');
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

    this.extensionDir = 'app.safariextension';

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
        default: 'demo'
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
      }
    ];

    this.prompt(prompts, function (answers) {
      this.Info = answers;

      var safari = plist.parse(this.read('/Applications/Safari.app/Contents/version.plist'));
      this.Info.BuilderVersion = safari.CFBundleVersion;

      done();
    }.bind(this));
  },
  gruntfile: function () {
    //this.template('Gruntfile.js');
  },
  infoPlist: function () {
    this.template('Info.plist', this.extensionDir + '/Info.plist');
  },
  app: function () {
    this.mkdir(this.extensionDir);

    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
  },
  hahei: function() {
      console.log('hahei');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = SafariExtensionGenerator;
