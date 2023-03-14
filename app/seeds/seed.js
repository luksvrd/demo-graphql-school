import ClassModel from "../class/index.js";
import initConn, { conn } from "../conn.js";
import ProfessorModel from "../professor/index.js";
import SchoolModel from "../school/index.js";
import data from "./data.json" assert { type: "json" };

// this function returns a random index from an array. Ots used to randomly assign classes to schools and professors to classes
// Math.floor(4.999) = 4
// Math.round(4.999) = 5

function getRandomIndex(arr) {
  return Math.floor(Math.random() * arr.length);
}
// InitConn() returns a promis that resolves to a connection to the DB
await initConn();

// conn..once("open", ...) is a mongoose event listener that runs a callback function when the connection to the database is open. Once open, we can seed the DB
// conn.once("open", async () => {}) is an async function that runs a block of code and then closes the connection to the database
// inside conn.once we use the mongoose model methods to insert data into the DB by await-ing the insertMany method and the save() method
conn.once("open", async () => {
  try {
    console.info("Dropping collections...");
    await ClassModel.deleteMany();
    await ProfessorModel.deleteMany();
    await SchoolModel.deleteMany();

    console.info("Seeding classes...");
    const classes = await ClassModel.insertMany(data.classes);

    console.info("Seeding professors...");
    const professors = await ProfessorModel.insertMany(data.professors);

    console.info("Seeding schools...");
    const schools = await SchoolModel.insertMany(data.schools);

    console.info(
      "Randomly assigning classes to 🏫s and professors to classes..."
    );

    await classes.reduce(async (previousPromise, classObj) => {
      await previousPromise;

      const randSchool = schools[getRandomIndex(schools)];
      randSchool.classes.push(classObj._id);
      await randSchool.save();

      const randProfessor = professors[getRandomIndex(professors)];
      classObj.professor = randProfessor._id;
      await classObj.save();

      // reference class on professor model
      randProfessor.classes.push(classObj._id);
      await randProfessor.save();
    }, Promise.resolve());
    // try catch is a keyword that runs a block of code and cataches any errors that occur. if an error occurs, the catch block will run
    console.info("Done seeding!");
  } catch (err) {
    console.error(err.message);
    // finally is a keyword that runs after the try block and the catch block. its used to close the connection to the database
  } finally {
    conn.close();
  }
});
