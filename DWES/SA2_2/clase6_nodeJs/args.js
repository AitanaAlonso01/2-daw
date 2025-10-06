console.log('args')
const args = process.argv.slice(2)
for (let a of args) {
  console.log(`Parameter: ${a}`)
}
