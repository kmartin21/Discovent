<p align="center"><img src="/src/images/logo.png" title="Discovent logo" alt="Discovent logo"></p>
                                                                                                                                
<h1 align="center">Discovent</h1> 

<h4 align="center">Discover events happening around the world.</h4>

<div align="center">
  <a href="https://travis-ci.org/kmartin21/discovent">
    <img src="https://img.shields.io/travis/kmartin21/discovent/master.svg?style=flat-square"
      alt="Build Status" />
  </a>
  <a href="http://badges.mit-license.org">
    <img src="http://img.shields.io/:license-mit-blue.svg?style=flat-square"
      alt="License" />
  </a>
</div>

## Basic Overview
A web app built with React and Redux, that lets you discover events happening in different countries, shows detailed event info and where to purchase tickets. Event data is powered by the <a href="https://developer.ticketmaster.com/">TicketMaster API</a>.

![Discovent screenshot](/src/images/screenshot.png)
<br>
<br>

## Live Site
https://discovent.herokuapp.com
<br>

## Built With
* <a href="https://reactjs.org">React</a>
* <a href="https://redux.js.org">Redux</a>
* CSS

#### Tests
* <a href="https://jestjs.io">Jest</a>
* <a href="https://airbnb.io/enzyme">Enzyme
<br>

## Run Locally
Run these commands first:
```
$ git clone https://github.com/kmartin21/discovent.git
$ cd discovent
$ npm install
```
Rename the ```.env.example``` file in the root directory to ```.env```.

Run the app:
```
$ npm run dev
```

Visit http://localhost:3000 to view the web app.

## Run Tests
```
$ npm test
```

# License
<a href="https://opensource.org/licenses/mit-license.php">MIT</a>
