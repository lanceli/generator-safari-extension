'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var SafariExtensionGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

      // init extension info
      this.Info = {
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
      console.log(this.Info);

      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('app.safariextension');

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
