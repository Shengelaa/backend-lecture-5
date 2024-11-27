//? console.log(process.argv)

// console.log("first");

//! process.on("exit", () => {
//!   console.log("finished");
//! });

// setTimeout(() => {
//   console.log("second");
// }, 3500);

// console.log("third");

//? process.exit();

// const { parse } = require("path");

// //! fs.writeFileSync("first.txt", "hello world");

// fs.writeFile("first.txt", "hello world", (err, data) => {
//   if (err) {
//     process.exit();
//   }
//   fs.writeFile("second.txt", "secondNigga", (err) => {});
//   console.log(data, "data");
// });

// async function main() {
//   //   await fs.writeFile("first.txt", "promise version");

//   //   console.log("writed succesfully");
//   //! utf-8 DEFAULT
//   //! ucs-2
//   const readData = await fs.readFile("second.txt", "ut-8");
//   console.log(readData, "read data");
// }

// main();

// async function main() {
//   //   const readData = await fs.readFile("second.txt", "utf-8");
//   //   const readData2 = await fs.readFile("first.txt", "utf-8");

//   //   fs.writeFile("third.txt", readData + "\n" + readData2);

//   //   const resulttxt = await fs.readFile("third.txt", "utf-8");
//   //   console.log(resulttxt);

//   //   await fs.writeFile("users.json", JSON.stringify(users));

//   //!
//   //   const users = await fs.readFile("first.txt", "utf-8");
//   //   const array = users
//   //     .split(" ")
//   //     .map((el) => Number(el))
//   //     .reduce((tot, cur) => tot + cur);
//   //   await fs.writeFile("result.txt", JSON.stringify(array));
//   //   console.log(array);

//   const user = await fs.readFile("second.txt", "utf-8");
//   const ar = user.split("").reverse().join("");

//   console.log(ar);

//   await fs.writeFile("first.txt", ar);
// }

const [, , firstName, age] = process.argv;
const fs = require("fs/promises");
async function main() {
  const users = await fs.readFile("users.json", "utf-8");
  const parseUsers = JSON.parse(users);
  const user = {
    name: firstName,
    age: age,
  };
  parseUsers.push(user);
  await fs.writeFile("users.json", JSON.stringify(parseUsers));
}

main();
