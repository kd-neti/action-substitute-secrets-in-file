
const core = require('@actions/core')

const fs = require("fs")

const getFileContents = path => fs.readFileSync(path).toString()

// --

const file = core.getInput("file", { required: true })
const output = core.getInput("output", { required: false }) || file
const secretsJson = core.getInput("secretsJson", { required: true })

console.log("Substituting keys matching", "from file", file, "into output", output)

const fileContents = getFileContents(file)
const fileSecrets = JSON.parse(fileContents)
const secrets = JSON.parse(secretsJson)
let matches = []

// Iterate through the object
for (const key in fileSecrets) {
    if (secrets.hasOwnProperty(key)) {
    //   console.log(`matched ${key}: ${secrets[key]}`);
      fileSecrets[key] = secrets[key]
      matches.push(key)

    }
}

console.log("Found", matches.length, "Keys", matches.join(", "))

fs.writeFileSync(output, JSON.stringify(fileSecrets))

console.log("Finished substituting")
