const fs = require('fs');
const potrace = require('potrace');
const path = require('path');

// Configuration
const inputPng = 'public/static/images/logo2_transparent.png';
const outputSvg = 'public/static/images/logo2_vector.svg';

// Function to trace PNG to SVG
function tracePng() {
  // Potrace parameters documentation: https://github.com/tooolbox/node-potrace#parameters
  const params = {
    // Threshold: pixel value must be under this value to be considered "black"
    threshold: 128,

    // Set foreground color (default black)
    color: '#000000',

    // Set background color (default transparent)
    background: 'transparent',

    // Remove small paths/spots
    turdSize: 3,

    // Optimize SVG path points
    optCurve: true,

    // Tolerance in curve optimization
    optTolerance: 0.2,

    // Smoothing the edges
    alphaMax: 1.0
  };

  console.log(`Tracing ${inputPng} to SVG...`);

  potrace.trace(inputPng, params, function(err, svg) {
    if (err) {
      console.error("Error tracing PNG:", err);
      return;
    }

    // Ensure the directory exists
    const outputDir = path.dirname(outputSvg);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(outputSvg, svg);
    console.log(`SVG file created at ${outputSvg}`);
  });
}

// Start the tracing process
tracePng();