const fs = require('fs');
const potrace = require('potrace');
const path = require('path');

// Configuration
const inputFile = 'public/static/images/logo2_transparent.png';
const outputFile = 'public/static/images/logo2.svg';

// Trace options
const options = {
  threshold: 128,        // Color threshold (0-255)
  optCurve: true,        // Optimize curves
  turdSize: 2,           // Remove small dots (pixels)
  alphaMax: 1,           // Corner threshold
  optTolerance: 0.2,     // Curve optimization tolerance
  color: '#000000',      // Fill color
  background: 'transparent' // Background color
};

console.log(`Converting ${inputFile} to SVG...`);

// Perform the tracing
potrace.trace(inputFile, options, (err, svg) => {
  if (err) {
    console.error('Error during tracing:', err);
    return;
  }

  // Write the SVG file
  fs.writeFileSync(outputFile, svg);
  console.log(`SVG created successfully: ${outputFile}`);
});