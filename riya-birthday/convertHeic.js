const convert = require('heic-convert');
const path = require('path');
const fs = require('fs');

async function convertHeic() {
  const inputDir = path.join(__dirname, 'public', 'images', 'memories');
  const files = fs.readdirSync(inputDir);
  
  for (const file of files) {
    if (file.toLowerCase().endsWith('.heic') || file.toLowerCase().endsWith('.heif')) {
      const inputPath = path.join(inputDir, file);
      const filenameBase = path.parse(file).name;
      const outputPath = path.join(inputDir, `${filenameBase}.jpg`);
      
      try {
        console.log(`Converting ${file} to JPG...`);
        const inputBuffer = fs.readFileSync(inputPath);
        const outputBuffer = await convert({
          buffer: inputBuffer,
          format: 'JPEG',
          quality: 0.9
        });
        fs.writeFileSync(outputPath, Buffer.from(outputBuffer));
        console.log(`Successfully converted to ${filenameBase}.jpg`);
      } catch (err) {
        console.error(`Error converting ${file}:`, err);
      }
    }
  }
}

convertHeic();
