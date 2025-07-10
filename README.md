# Employee Management APP

This is a small project that creates, edits and removes Employees , books vacation dates on a calendar and adds them to the employee record.

# Tech Stack
This Project Was made in node.js + Express for the BackEnd Api + React.js for the FrontEnd with mongo DB as a Database.

# Install Instructions

First get the project from the respective github page enter the project folder and go to the root of the BE folder and run this command on your terminal/cmd/git bash:
```
npm i
```
Do the same command on the root of the FE folder

```
npm i
```
after this run the following command in both folders
```
npm run dev
```
on the backend wait until you see this message pop up:

```
Listening on port: 3000
```
and on the front end wait until you see this message:
```
 ➜  Local:   http://localhost:5173/
```

# API EndPoints

- .get('https://employee-managementbe.onrender.com/api/employees/') -> Fetches all Employees
- .get('https://employee-managementbe.onrender.com/api/employees/:id') -> Fetches a Specific Employee By Id
- .post('https://employee-managementbe.onrender.com/api/employees') -> Creates an Employee
- .put('https://employee-managementbe.onrender.com/api/employees/:id') -> Updates an Employee By Id
- delete('https://employee-managementbe.onrender.com/api/employees/:id') -> Deletes an Employee By Id
- .post('/login', employeeController.employeeAuth) -> login Validator Route for BE

# Web App Usage

The login Screen will pop up use the following credentials to log in:

 - email: "admin@mail.com"
 - password: "admin"
   or
- email: "jonhdoe@mail.com"
 - password: "12345678"

Right after you will be redirected to the Home Screen where you can see all current employees and can edit the records as well,
there is an Admin Panel where you can Create New Employees, Edit all of them and Delete them as well,
to choose the desired Vacation Days Navigate to Edit and choose your days on the calendar.

# TODO
I plan to enhance this application's security by implementing stronger and comprehensive security controls and best practices, for example RBAC(Role-based access control).

 
# Online Links

BackEnd: [https://employee-managementbe.onrender.com/api/employees]

FrontEnd: [https://employee-managementfe.netlify.app/]