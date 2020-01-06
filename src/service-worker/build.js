/* eslint-disable no-console */
const fs = require('fs');
const util = require('util');
const workboxBuild = require('workbox-build'); // eslint-disable-line import/no-extraneous-dependencies

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const writeWorkerTemplate = async (templatePath, destinationPath, manifest) => {
  const templateData = await readFile(templatePath, 'utf-8');
  await writeFile(destinationPath, templateData.replace('INJECTED_MANIFEST', manifest), 'utf-8');
};

const generateManifest = async () => {
  const {
    manifestEntries,
    count,
    size,
    warnings,
  } = await workboxBuild.getManifest({
    globDirectory: '../../build',
    globPatterns: [
      '**/*.{js,css,html,png}',
    ],
    globIgnores: [
      'service-worker.js',
      'sw.js',
      'precache-manifest.*.js',
    ],
  });
  warnings.forEach(console.warn);
  console.log(`${count} files will be precached, totaling ${size} bytes.`);

  return manifestEntries;
};

const formatManifest = (manifestEntries) => `[
${manifestEntries.map((entry) => `  {
    url: '${entry.url}',
    revision: '${entry.revision}',
  }`).join(',\n')}
]`;

const buildWorker = async () => {
  const manifestEntries = await generateManifest();
  await writeWorkerTemplate('template.js', '../../build/sw.js', formatManifest(manifestEntries));
};

buildWorker();
