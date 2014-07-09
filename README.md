web-components-intro
====================

A step-by-step introduction to coding web components, intended for use during a presentation.


Requirements
============

Code will only run in browsers that support web components natively [(currently Chrome 36+ and Opera 23+)](http://caniuse.com/#search=components) since I've intentionally left out Polymer's platform.js polyfills.


Installation
============

Run `npm install` to pull down the necessary dependencies.


Usage
=====

Run `grunt start` to begin. It will check out the commit for the first step, start a web server, and navigate to it in a new tab in your browser. Press enter in the terminal when you are ready to move to the next step.

Use a side-by-side diffing tool (like SmartGit) to show code changes from step to step.


Additional Information
======================

* [This HTML5Rocks article](http://www.html5rocks.com/en/tutorials/webcomponents/customelements/) was the main inspiration for the basic flow of information.
* [The Polymer website](http://www.polymer-project.org/) has information on everything related to web components.
* [This article](http://robdodson.me/blog/2013/08/20/exploring-html-imports/) explains how to wrap a Custom Element + Shadow DOM + HTML Template in an HTML import.
