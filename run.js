const { generatePassword } = require("./dist/index");

console.log(generatePassword({ uniqueCharacters: true, length: 20 }));
