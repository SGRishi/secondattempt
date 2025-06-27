const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

let failures = 0;
if (!html.includes('id="leadership"')) {
  console.error('Leadership section missing');
  failures++;
}
if (!html.toLowerCase().includes('demo website')) {
  console.error('Demo note missing');
  failures++;
}

if (failures) {
  console.error(`${failures} issue(s) found.`);
  process.exit(1);
}
console.log('All tests passed.');
