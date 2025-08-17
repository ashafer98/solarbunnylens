const fs = require('fs');
const archiver = require('archiver');

function createZip() {
  return new Promise((resolve, reject) => {
    console.log('Starting zip creation...');

    const output = fs.createWriteStream('lambda.zip');
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
      console.log(`Created lambda.zip (${archive.pointer()} total bytes)`);
      resolve();
    });

    archive.on('warning', (err) => {
      if (err.code === 'ENOENT') {
        console.warn('Warning:', err);
      } else {
        reject(err);
      }
    });

    archive.on('error', (err) => {
      reject(err);
    });

    archive.pipe(output);

    // Include everything except .git and the ZIP itself
    archive.glob('**/*', {
      ignore: ['.git/**', 'lambda.zip']
    });

    archive.finalize().catch(err => reject(err));
  });
}

// Run the zip creation
createZip()
  .then(() => console.log('Zip creation succeeded!'))
  .catch(err => console.error('Zip creation failed:', err));
