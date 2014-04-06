'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

/** @type {string} The protractor version. */
var ptorVersion = '0.21.0';

var ProtractorGenerator = yeoman.generators.Base.extend({
  init: function() {
    this.pkg = require('../package.json');
    var self = this;

    this.on('end', function() {
      this.config.save();
      this.installDependencies({
        bower: false,
        skipInstall: this.options['skip-install'],
        callback: function() {
          var readme = self.readFileAsString('README.txt');
          self.log('Done! Now follow these steps:');
          self.log(readme);
          self.log('You can read these instructions in README.txt');
        }
      });
    });
  },

  askFor: function() {
    var done = this.async();

    this.log(chalk.magenta('Welcome to the protractor code generator.'));

    var prompts = [
      {
        type: 'input',
        name: 'configName',
        message: 'Choose a name for the protractor configuration file',
        default: 'protractor-config.js'
      },
      {
        type: 'input',
        name: 'baseUrl',
        message: 'Choose a base URL',
        default: 'http://localhost:8000'
      }
    ];

    this.prompt(prompts, function(props) {
      this.configName = props.configName;
      this.baseUrl = props.baseUrl;
      done();
    }.bind(this));
  },

  app: function() {
    this.mkdir('spec');
  },

  projectfiles: function() {
    this.ptorVersion = ptorVersion;

    this.copy('configTemplate.js', this.configName);
    this.template('package.json');
    this.copy('example_spec.js', 'spec/example_spec.js');
    this.copy('README.txt');
  }
});

module.exports = ProtractorGenerator;
