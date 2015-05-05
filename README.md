# StartHub

## Description
StartHub is a web application that provides users with a means to find awesome collaborators for their own startup ideas. StartHub has an interface that allows users to post project ideas that other members can join and to search people by skill, interest, or location. StartHub also allows users to discover, join, or share projects other members are posting. StartHub gives project ideas the opportunity to scale into startups and eventually full fledged companies.

## Motivation
Two of the major inhibiting factors for creating startups is finding a like-minded team and finding a great idea. StartHub platform solves both of these factors. By connecting the community and through its features, StartHub helps its members contribute to the projects they are interested in.

## Programming languages, libraries, frameworks, platforms
Languages: HTML/CSS, JavaScript
Libraries: Jquery, express.js
Framework: Node.js, Twitter Bootstrap
Platform: Web application

## Prerequisites
Make sure you have installed all these prerequisites on your development machine.
* Node.js - [Download & Install Node.js](http://www.nodejs.org/download/) and the npm package manager, if you encounter any problems, you can also use this [GitHub Gist](https://gist.github.com/isaacs/579814) to install Node.js.
* MongoDB - [Download & Install MongoDB](http://www.mongodb.org/downloads), and make sure it's running on the default port (27017).
* Bower - You're going to use the [Bower Package Manager](http://bower.io/) to manage your front-end packages, in order to install it make sure you've installed Node.js and npm, then install bower globally using npm:

```
$ npm install -g bower
```

* Grunt - You're going to use the [Grunt Task Runner](http://gruntjs.com/) to automate your development process, in order to install it make sure you've installed Node.js and npm, then install grunt globally using npm:

```
$ sudo npm install -g grunt-cli
```

## Quick Install
Once you've and installed all the prerequisites, you're just a few steps away from using the StartHub web application.

To install Node.js dependencies you're going to use npm again, in the application folder run this in the command-line:

```
$ npm install
```

This command does a few things:
* First it will install the dependencies needed for the application to run.
* If you're running in a development environment, it will then also install development dependencies needed for testing and running your application.
* Finally, when the install process is over, npm will initiate a bower install command to install all the front-end modules needed for the application

## Running Your Application
After the install process is over, you'll be able to run your application using Grunt, just run grunt default task:

```
$ grunt
```

Your application should run on the 3000 port so in your browser just go to [http://localhost:3000](http://localhost:3000)
                            
That's it! your application should be running by now.

## Contributors
Adam Wall
Ian Lovrich
Sung Gun Paek
Matthew Ly
Travis Struckhoff
Dhruv Seth
