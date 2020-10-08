
// Creates an employee class with core components that are pased to other positions
class Employee {
    constructor(name, id, email){
      this.name = name;
      this.id = id;
      this.email = email;
    }
    getName() {
      return this.name;
    }
    getId() {
      return this.id;
    }
    getEmail() {
      return this.email;
    }
    getRole() {
      return "Employee";
    }
    
  }
  
  module.exports = Employee;
  