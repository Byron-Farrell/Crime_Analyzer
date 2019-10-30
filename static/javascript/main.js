import '../css/main.scss';
import 'bootstrap/dist/js/bootstrap.js';
import { calculateContentHeight } from './resizeContent.js';
import { mapOnLoad } from '../../apps/data_visualization/static/javascript/main.js';

window.onload = function(event) {
  calculateContentHeight()
  mapOnLoad();
};

window.onresize = function(event) {
  calculateContentHeight()
};
