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

// const [, , firstName, age] = process.argv;
// const fs = require("fs/promises");
// async function main() {
//   const users = await fs.readFile("users.json", "utf-8");
//   const parseUsers = JSON.parse(users);
//   const user = {
//     name: firstName,
//     age: age,
//   };
//   parseUsers.push(user);
//   await fs.writeFile("users.json", JSON.stringify(parseUsers));
// }

// main();

const https = require("https");
const fs = require("fs");

function fetchDataAndWriteUsersJson() {
  https
    .get("https://jsonplaceholder.typicode.com/users", (response) => {
      let data = "";

      response.on("data", (chunk) => {
        data += chunk;
      });

      response.on("end", () => {
        const users = JSON.parse(data);

        const usersData = users.map((user) => ({
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
        }));

        fs.writeFileSync(
          "users.json",
          JSON.stringify(usersData, null, 2),
          "utf8"
        );
        console.log("Data written to users.json");
      });
    })
    .on("error", (err) => {
      console.log("Error fetching data:", err);
    });
}

function appendCarDataToJson() {
  const carModel = process.argv[2];
  const carReleaseDate = process.argv[3];
  const carColor = process.argv[4];

  if (!carModel || !carReleaseDate || !carColor) {
    console.log(
      "Please provide car model, release date, and color as arguments."
    );
    return;
  }

  const car = {
    id: Date.now(),
    carModel,
    carColor,
    carReleaseDate,
  };

  fs.readFile("cars.json", "utf8", (err, data) => {
    if (err && err.code === "ENOENT") {
      fs.writeFileSync("cars.json", JSON.stringify([car], null, 2), "utf8");
    } else if (data) {
      const cars = JSON.parse(data);
      cars.push(car);
      fs.writeFileSync("cars.json", JSON.stringify(cars, null, 2), "utf8");
    }
    console.log("Car object appended to cars.json");
  });
}

function countVowelsInTextFile() {
  const randomText = "This is some random text with vowels!";
  fs.writeFileSync("text.txt", randomText, "utf8");
  console.log("Random text written to text.txt");

  fs.readFile("text.txt", "utf8", (err, data) => {
    if (err) throw err;

    const vowels = ["a", "e", "i", "o", "u"];
    let vowelCount = 0;

    for (let char of data.toLowerCase()) {
      if (vowels.includes(char)) {
        vowelCount++;
      }
    }

    console.log(`Vowel count: ${vowelCount}`);
  });
}

function runAllTasks() {
  fetchDataAndWriteUsersJson();
  appendCarDataToJson();
  countVowelsInTextFile();
}

runAllTasks();
