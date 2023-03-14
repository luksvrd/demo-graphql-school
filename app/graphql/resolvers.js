import classController from "../class/controller.js";
import professorController from "../professor/controller.js";
import schoolController from "../school/controller.js";

// We resolve the queries from 'typeDefs'.
// The names must match.
const resolvers = {
  Query: {
    async schools() {
      return await schoolController.index();
    },

    async classes() {
      // Resolve the promise and return the result (not a promise)
      return await classController.index();
    },

    async professors() {
      return await professorController.index();
    },

    async class(_, args) {
      return await classController.show(args._id);
    },
  },
  Mutation: {
    async createSchool(
      _,

      // DESTRUCTURE the 'args' object
      { name, location, studentCount }
    ) {
      return await schoolController.create({ name, location, studentCount });
    },
    async updateClassBuilding(_, { _id, newBuilding }) {
      return await classController.updateClassBuilding(_id, newBuilding);
    },
  },
};

export default resolvers;
