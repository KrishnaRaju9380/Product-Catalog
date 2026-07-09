const git = require('isomorphic-git');
const fs = require('fs');
const path = require('path');
(async () => {
  const dir = process.cwd();
  try {
    await git.init({ fs, dir });
    console.log('Initialized local git repository.');
  } catch (e) {
    if (!e.message.includes('already exists')) throw e;
  }
  const files = fs.readdirSync(dir, { withFileTypes: true }).filter(d => d.name !== '.git');
  const addFile = async file => {
    const filePath = path.join(dir, file.name);
    if (file.isDirectory()) {
      const subfiles = fs.readdirSync(filePath, { withFileTypes: true });
      for (const sub of subfiles) {
        const rel = path.posix.join(file.name, sub.name);
        await git.add({ fs, dir, filepath: rel });
      }
    } else {
      await git.add({ fs, dir, filepath: file.name });
    }
  };
  for (const file of files) {
    if (file.name === 'node_modules' || file.name === 'package-lock.json' || file.name === 'npm-debug.log') continue;
    await addFile(file);
  }
  await git.commit({
    fs,
    dir,
    author: { name: 'Project Owner', email: 'owner@example.com' },
    message: 'Initial commit',
  });
  console.log('Created initial commit.');
})();
