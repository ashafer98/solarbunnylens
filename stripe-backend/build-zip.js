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

    output.on('end', () => {
      console.log('Data has been drained');
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

    // Use glob and exclude node_modules, .git, and the zip itself
    archive.glob('**/*', {
      ignore: ['node_modules/**', '.git/**', 'lambda.zip']
    });

    archive.finalize().catch(err => reject(err));
  });
}

// Run the test
createZip()
  .then(() => {
    console.log('Zip creation test succeeded!');
  })
  .catch(err => {
    console.error('Zip creation test failed:', err);
  });
