const folderName = process.argv[2] || 'MyProject'
const fs = require('fs') // import / includes

try {
  fs.mkdirSync(folderName)
  fs.writeFileSync(`${folderName}/index.html`, '')
  fs.writeFileSync(`${folderName}/app.js`, '')
  fs.writeFileSync(`${folderName}/styles.css`, '')
} catch (err) {
  console.log(err)
}
