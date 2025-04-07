# Employee-Management

This is a small project that creates, edits and removes Employees , books vacation dates on a calendar and adds them to the employee record.

#Install Instructions

First get the project from the respective github page enter the project folder and go to the BE folder and run this command on your terminal/cmd/git bash:
```
npm i
```
Do the same command on the FE folder

```
npm i
```
after this run the following command in both folders
```
npm run dev
```
on the backend wait until you see this message pop up:

```
Listening on port: 3000\
```
and on the front end wait until you see this message:
```
 ➜  Local:   http://localhost:5173/
```

# API EndPoints

.get('http://localhost:3000/api/employees/') -> Fetches all Employees
.get('/http://localhost:3000/api/employees/:id') -> Fetches a Specific Employee By Id
.post('/http://localhost:3000/api/employees') -> Creates an Employee
.put('/http://localhost:3000/api/employees/:id') -> Updates an Employee By Id
.delete('/http://localhost:3000/api/employees/:id') -> Deletes an Employee By Id

# Web App Usage

The login Screen will pop up use the following credentials to log in:

 #### email: "admin@mail.com"
 #### password: "admin"

Right after you will be redirected to the Home Screen where you can see all current employees and can edit the records as well,
there is an Admin Panel where you can Create New Employees, Edit all of them and Delete them as well,
to choose the desired Vacation Days Navigate to Edit and choose your days on the calendar.

#TODO
Due to time constraints i could not implement a proper auth system for the login but i would like to do so in the future, also role based operations as well.
I plan to enhance this application's security by implementing stronger and comprehensive security controls and best practices.

 
