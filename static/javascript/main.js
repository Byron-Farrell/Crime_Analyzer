// CSS Imports
// ---------------------------------------------------

import '../css/main.scss';
import '../../apps/data_visualization/static/css/map.scss';
import '../../node_modules/leaflet/dist/leaflet.css';


// Javascript Imports
// ---------------------------------------------------

import '../../node_modules/bootstrap/dist/js/bootstrap.js';
import calculateContentHeight from './resizeContent.js';
import init from '../../apps/data_visualization/static/javascript/map.js';


window.onload = function(event) {
  calculateContentHeight()
  init();
};

window.onresize = function(event) {
  calculateContentHeight()
};
