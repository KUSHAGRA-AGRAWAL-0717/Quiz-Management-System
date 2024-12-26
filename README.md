This Quiz Management System allows students to enroll in various courses, while teachers can create quizzes for specific courses. Additionally, departments have the capability to add new courses to the system.
Key Features:

Student Functionality:

Enroll in different courses.
Take quizzes and check results.
Add marks to their respective courses.
Teacher Functionality:

Create and manage quizzes for any selected course.
Access and review all courses available in the system.
Department Functionality:

Add new courses to the system as needed.
API Documentation:

User Routes :

User Registration
URL: POST http://localhost:3001/api/register
Functionality: Registers a new user by creating a new entry in the User model. Expects user details in the request body.

User Login
URL: POST http://localhost:3001/api/login
Functionality: Authenticates a user by checking the provided email and password. Returns user details upon successful login.

Update User Courses
URL: PUT http://localhost:3001/api/user-course/:userId
Functionality: Updates the courses associated with a user. Expects an array of course IDs in the request body.

Get User Courses
URL: GET http://localhost:3001/api/user-course/:userId
Functionality: Retrieves the courses associated with a specific user. Returns populated course details.

Course Routes :

Create Course
URL: POST http://localhost:3001/api/courses
Functionality: Creates a new course in the system. Expects course details in the request body.

Get All Courses
URL: GET http://localhost:3001/api/courses
Functionality: Retrieves a list of all courses available in the system.

Get Specific Course
URL: GET http://localhost:3001/api/courses/:id
Functionality: Retrieves details of a specific course by its ID.

Update Course
URL: PUT http://localhost:3001/api/courses/:id
Functionality: Updates the details of a specific course by its ID. Expects updated course details in the request body.

Delete Course
URL: DELETE http://localhost:3001/api/courses/:id
Functionality: Deletes a specific course by its ID.

Quiz Routes : 

Create Quiz for a Course
URL: POST http://localhost:3001/api/courses/:courseId/quizzes
Functionality: Creates a new quiz associated with a specific course. Expects quiz details in the request body.

Get Quizzes for a Course
URL: GET http://localhost:3001/api/courses/:courseId/quizzes
Functionality: Retrieves all quizzes associated with a specific course.

Get Specific Quiz
URL: GET http://localhost:3001/api/quizzes/:id
Functionality: Retrieves details of a specific quiz by its ID.

Update Specific Quiz
URL: PUT http://localhost:3001/api/quizzes/:id
Functionality: Updates the details of a specific quiz by its ID. Expects updated quiz details in the request body.

Delete Specific Quiz
URL: DELETE http://localhost:3001/api/quizzes/:id
Functionality: Deletes a specific quiz by its ID.

Check Quiz Attempt
URL: POST http://localhost:3001/api/quizzes/check-attempt
Functionality: Checks if a user has attempted a specific quiz. Expects user email and quiz topic in the request body.

Save Quiz Results
URL: POST http://localhost:3001/api/quiz-results
Functionality: Saves the results of a quiz attempt, including the score and answers. Expects quiz result details in the request body.
