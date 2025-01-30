To-Do List Application
A simple and efficient to-do list application built with Node.js, Express, and MySQL. This application allows users to create, manage, and organize their tasks in a secure and user-friendly environment.

Features
User Authentication: Secure user registration and login functionality.

Task Management: Create, update, delete, and view tasks.

Authorization: Middleware to ensure only authenticated users can access certain routes.

Database Integration: MongoDB for storing user and task data.

Project Structure
The project is organized into the following directories:

controllers/
Contains the main logic for handling user authentication and task management. The controllers ensure that users are authenticated before they can access the to-do list functionalities.

models/
Defines the database schemas and handles the connection to the MongoDB database. This includes models for users and tasks.

middleware/
Contains middleware functions for authorization and user restriction. These functions ensure that only authenticated users can access certain routes and perform specific actions.

routes/
Defines all the API routes for the application. This includes routes for user authentication (register, login) and task management (create, read, update, delete tasks).

You can access the live version of the project here: https://github.com/ammarhere02/To-do-List.git
