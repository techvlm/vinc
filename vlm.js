// create an SVG element
// let svg = document.createElement('svg');
// svg.setAttribute('width', 100);
// svg.setAttribute('height', 100);

// // create an SVG path
// let path = document.createElement('path');
// path.setAttribute('d', 'M50 0 L100 100 L0 100 Z');
// path.setAttribute('fill', 'red');
// svg.appendChild(path);

// // convert SVG to a data URL
// let svgString = new XMLSerializer().serializeToString(svg);
// let dataUrl = 'data:image/svg+xml;base64,' + btoa(svgString);

// // create an image element
// let img = document.createElement('img');

// // set the image source to the data URL
// img.src = dataUrl;

// // create a canvas element
// let canvas = document.createElement('canvas');
// canvas.width = 100;
// canvas.height = 100;

// // draw the image onto the canvas
// let context = canvas.getContext('2d');
// img.onload = function() {
//   context.drawImage(img, 0, 0);
  
//   // convert canvas to a PNG data URL
//   let pngUrl = canvas.toDataURL('image/png');
  
//   // create an image element with the PNG data URL
//   let pngImg = document.createElement('img');
//   pngImg.src = pngUrl;
  
//   // append the PNG image to the DOM
//   document.body.appendChild(pngImg);
// };
