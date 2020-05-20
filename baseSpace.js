class BaseSpace {
constructor (args) { 
const { Id, Name, Desc, Roles, Members } = args;

//check types of each argument
if(typeof Members !== 'array') throw new TypeError("Provided members argument is not an array!");
if(typeof Id !== 'string') throw new TypeError("ID of this space must be a string!");
if(typeof Name !== 'string') throw new TypeError('The name of this space must be a string');
if(typeof Desc !== 'string') throw new TypeError('Description of this space must be a string!');
if(typeof Roles !== 'object') throw new TypeError('Provided roles argument is not an object!');

this.id = Id;
this.name = Name;
this.desc = Desc;
this.roles = Roles;
this.members = Members;


get id() { 
return this.id;
}
get name() { 
return this.name;
}
get desc() { 
return this.desc;
}
get roles() { 
return this.roles;
}
get members() { 
return this.members;
}
}
module.exports = BaseSpace;
