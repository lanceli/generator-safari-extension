/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('safari-extension generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('safari-extension:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      // add files you expect to exist here.
      '.jshintrc',
      '.editorconfig'
    ];

    helpers.mockPrompt(this.app, {
      'CFBundleDisplayName': 'test',
      'Author': 'tester',
      'Description': 'Description',
      'CFBundleIdentifier': 'com.yourcompany.test',
      'CFBundleShortVersionString': '0.1.0',
      'CFBundleVersion': '0.1.0',
      features: []
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });

  it('creates expected files with gloabl page', function (done) {
    var expected = [
      // add files you expect to exist here.
      '.jshintrc',
      '.editorconfig'
    ];

    helpers.mockPrompt(this.app, {
      'CFBundleDisplayName': 'test',
      'Author': 'tester',
      'Description': 'Description',
      'CFBundleIdentifier': 'com.yourcompany.test',
      'CFBundleShortVersionString': '0.1.0',
      'CFBundleVersion': '0.1.0',
      features: ['globalpage']
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });

  it('creates expected files with options page', function (done) {
    var expected = [
      // add files you expect to exist here.
      '.jshintrc',
      '.editorconfig'
    ];

    helpers.mockPrompt(this.app, {
      'CFBundleDisplayName': 'test',
      'Author': 'tester',
      'Description': 'Description',
      'CFBundleIdentifier': 'com.yourcompany.test',
      'CFBundleShortVersionString': '0.1.0',
      'CFBundleVersion': '0.1.0',
      features: ['globalpage', 'optionspage']
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});
