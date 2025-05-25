const fs = require('fs');
const potrace = require('potrace');
const path = require('path');
const Jimp = require('jimp');

// Configuration
const inputPng = 'public/static/images/logo2_transparent.png';
const outputSvg = 'public/static/images/logo2_color.svg';

// Function to detect colors in the image and create separate layers
async function createColorizedSvg() {
  console.log('Loading image...');

  try {
    // First, install jimp if not already installed
    if (!fs.existsSync('./node_modules/jimp')) {
      console.log('Installing Jimp...');
      require('child_process').execSync('npm install jimp');
      console.log('Jimp installed successfully.');
    }

    // Load the image using the correct Jimp promise syntax
    const image = await Jimp.read(inputPng);
    const width = image.getWidth();
    const height = image.getHeight();

    console.log(`Image dimensions: ${width}x${height}`);

    // Get unique colors (ignoring transparency)
    const colors = new Map();

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const color = image.getPixelColor(x, y);
        const alpha = (color >> 24) & 0xFF;

        // Skip transparent pixels
        if (alpha < 10) continue;

        // Get RGB values
        const r = (color >> 16) & 0xFF;
        const g = (color >> 8) & 0xFF;
        const b = color & 0xFF;

        // Skip very light colors (background/whitish colors)
        if (r > 240 && g > 240 && b > 240) continue;

        // Create a simpler color representation to reduce similar colors
        const simpleColor = `${Math.round(r/10)*10},${Math.round(g/10)*10},${Math.round(b/10)*10}`;
        if (!colors.has(simpleColor)) {
          colors.set(simpleColor, {
            r, g, b,
            hex: `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`,
            count: 0
          });
        }
        colors.get(simpleColor).count++;
      }
    }

    console.log(`Found ${colors.size} unique colors`);

    // Sort colors by frequency
    const sortedColors = Array.from(colors.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // Limit to 5 most common colors

    console.log('Most common colors:');
    sortedColors.forEach(c => console.log(`${c.hex} (${c.count} pixels)`));

    // Generate SVG layers for each color
    const svgLayers = [];
    const tempFiles = [];

    for (let i = 0; i < sortedColors.length; i++) {
      const color = sortedColors[i];
      console.log(`Processing color ${i+1}: ${color.hex}`);

      // Create a temporary image with only this color
      const colorMask = image.clone();

      // Replace all other colors with white (transparent)
      colorMask.scan(0, 0, width, height, function(x, y, idx) {
        const pixelColor = colorMask.getPixelColor(x, y);
        const alpha = (pixelColor >> 24) & 0xFF;

        // Skip transparent pixels
        if (alpha < 10) {
          colorMask.setPixelColor(0x00FFFFFF, x, y); // transparent white
          return;
        }

        const r = (pixelColor >> 16) & 0xFF;
        const g = (pixelColor >> 8) & 0xFF;
        const b = pixelColor & 0xFF;

        // Fuzzy color matching
        const rDiff = Math.abs(r - color.r);
        const gDiff = Math.abs(g - color.g);
        const bDiff = Math.abs(b - color.b);

        // If close enough to our target color, keep it, otherwise make transparent
        if (rDiff < 30 && gDiff < 30 && bDiff < 30) {
          // Keep this pixel - set to black for potrace
          colorMask.setPixelColor(0xFF000000, x, y);
        } else {
          // Not this color - set to white for potrace
          colorMask.setPixelColor(0xFFFFFFFF, x, y);
        }
      });

      // Save temp file
      const tempFile = `temp_color_${i}.png`;
      await colorMask.writeAsync(tempFile);
      tempFiles.push(tempFile);

      // Trace this color layer
      await new Promise((resolve, reject) => {
        potrace.trace(tempFile, {
          threshold: 128,
          optCurve: true,
          turdSize: 5, // Minimum size of features to consider
          alphaMax: 1.0,
          optTolerance: 0.2
        }, (err, svg) => {
          if (err) {
            reject(err);
            return;
          }

          // Extract the path data from SVG
          const pathMatch = svg.match(/<path[^>]*d="([^"]*)"[^>]*>/);
          if (pathMatch && pathMatch[1]) {
            svgLayers.push({
              color: color.hex,
              path: pathMatch[1]
            });
          }
          resolve();
        });
      });
    }

    // Generate final SVG with all color layers
    console.log('Generating final SVG...');
    const finalSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" version="1.1">
    <metadata>
      Generated from ${path.basename(inputPng)}
    </metadata>
    ${svgLayers.map(layer =>
      `<path d="${layer.path}" fill="${layer.color}" stroke="none" fill-rule="evenodd"/>`
    ).join('\n    ')}
</svg>`;

    fs.writeFileSync(outputSvg, finalSvg);
    console.log(`Color SVG created at ${outputSvg}`);

    // Cleanup temp files
    tempFiles.forEach(file => {
      if (fs.existsSync(file)) {
        fs.unlinkSync(file);
      }
    });

  } catch (err) {
    console.error('Error creating colorized SVG:', err);
  }
}

// Start the conversion process
createColorizedSvg();