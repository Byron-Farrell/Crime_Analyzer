import '../css/main.scss';
import 'bootstrap/dist/js/bootstrap.js';
import { calculateContentHeight } from './resizeContent.js';
import { fileUploadSetup } from './fileUpload.js';

window.onload = function(event) {
  calculateContentHeight()
  fileUploadSetup();
};

window.onresize = function(event) {
  calculateContentHeight()
};
