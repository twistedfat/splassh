/**
* Checks whether string is a non-empty string
*
* @method isNonEmptyString
* @param {String} string The string
* @return {Boolean} Returns true of string is a non-empty string
*/
isNonEmptyString = function(string) {
  return typeof string == "string" && string.trim().length > 0;
}

/**
* Checks whether a variable contains a number, regardless of its type.
*
* @method isNumeric
* @param {Number} n A number.
* @return {Boolean} Returns true if n is a number
*/
function isNumeric(n) {
  return isFinite(n);
}

/**
* Checks whether an array contains any items
*/
isNonEmptyArray = function(arr) {
  if (typeof arr !== 'undefined' && typeof arr !== null) {
    return arr.length > 0;
  }
  return;
}

/**
* Checks whether a project is valid
*
* @method isProjectValid
* @param {Object} project An object that has the project's data (the model)
* @return {Boolean} Returns true if the project is valid. False otherwise.
*/
isProjectValid = function(project) {
  return typeof project.title !== 'undefined' && isNonEmptyString(project.title)
      && typeof project.description !== 'undefined' && isNonEmptyString(project.description)
      && typeof project.tags !== 'undefined' && typeof project.tags !== null
      && typeof project.coordinates.lat !== 'undefined' && isNumeric(project.coordinates.lat)
      && typeof project.coordinates.lng !== 'undefined' && isNumeric(project.coordinates.lng);
}

/**
* Used to create a water project and insert it into the Projects collection
*
* @method createProject
* @param {Object} project An object that has the project's data (the model)
* @param {Function} callback Two parameters (error and doc) are passed after the operation is complete.
* @return {Number} Returns the id of the party that was created. Returns -1 if any required
* field is not found.
*/
/*
createProject = function (project, callback) {
  if(!isProjectValid(project)) {
    callback("Invalid entry");
    return -1;
  }
  
  var id = Projects.insert(project, callback);
  return id;
};
*/
/**
* Returns an array of all the projects in the database
*
* @method fetchProjects
* @return {Array} Returns an array of the water projects in the database.
* field is not found.
*/
fetchProjects = function() {
  return Projects.find().fetch();
}


var commented = function (project) {
  return project.comments.length;
};