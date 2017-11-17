'use strict';

var tasks = {}; // a place to store tasks by person

module.exports = {
  reset: function () {
    tasks = {}; // (this function is completed for you.)
  },
  // ==== COMPLETE THE FOLLOWING (SEE `model.js` TEST SPEC) =====
  listPeople: function () {
    // returns an array of all people for whom tasks exist
    return Object.keys(tasks);
  },
  add: function (name, task) {
    // saves a task for a given person

    // Below: checks if task.complete evaluates to false. If it does, it "returns" false, otherwise it returns pre-existing task.complete.
    task.complete = task.complete || false;
    // Same as:
    // if (task.complete === undefined) task.complete = false;
    // else task.complete;

    // Below: checks if tasks[name] evaluates to false. If it does, it "returns" [], otherwise it returns tasks[name].
    tasks[name] = tasks[name] || [];
    tasks[name].push(task);
    // Same as:
    // if (tasks[name]) tasks[name].push(task);
    // else tasks[name] = [task];
    return task;
  },
  list: function (name) {
    return tasks[name];
  },
  complete: function (name, index) {
    tasks[name][index].complete = true;
  },
  remove: function (name, index) {
    tasks[name].splice(index, 1); // remove 1 elem from index "index", 3rd param empty so no insertion
  }
  // etc.
};
