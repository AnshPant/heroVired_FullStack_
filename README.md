# HERO VIRED - Full Stack Development Intern Assignment - Jan 2024

## Instructions

### Tech Stack:
- Node.js
- Express.js
- React.js
- PostgreSQL

### Assignment Overview:
This assignment is designed to assess your skills in full-stack development. You will be creating a web application using Node.js, Express.js, React.js, and PostgreSQL. The application involves handling program resources, creating a dashboard, and implementing user authentication.

### Task 1: Program Resource API
Create an API for managing programs with the following functionalities:
- Get one/all programs
- Create Program
- Update Program
- Delete Program

#### Program Fields:
- Name
- Price
- Domain (e.g., Data, Finance, etc.)
- Program Type
- Registrations - open or closed
- Description
- Placement Assurance - Yes/No
- Image URL
- University Name
- Faculty Profile (LinkedIn URL if available)
- Learning Hours and Duration
- Certificate/Diploma
- Eligibility Criteria

#### Additional Requirements:
- Add authentication, and restrict access to all routes.
- Use PostgreSQL database.
- Maintain a proper folder structure.
- Adhere to coding best practices.
- Make assumptions as necessary.
- Use Node.js as the programming language.

### Task 2: Programs Dashboard
Create a Programs Dashboard with search and navigation features. Utilize the API from Task 1 for CRUD operations. The dashboard should have two major sections: one for searching and navigating programs and the other for adding/editing/viewing programs.

#### Checkpoints:
1. Search functionality in the dashboard.
2. Add/Delete Program.
3. View the program without the ability to edit.
4. Enable editing when clicked on the edit button.
5. Implement two save options - Save Draft and Save.

### Bonus Task: Signup and Login Page
Create Signup and Login pages with two-factor authentication (OTP over email). Utilize the API from Task 1 for CRUD operations.

### Objective Achieved:

#### TASK1 
1. task1 was executed. each of the required api endpoint is inside index.js in the server side folder
2. NODE.js and PostgreSQL database is used.
   
#### TASK2
1. Frontend using the UI was made.
2. API in task1 for CRUD operation were made.
3. Edit button was made beside the delete button.
4. Additionally reset button was made to reset the values.
5. Plus button near the add program is used to reseet selection in the programs section so that new data can be entered without actually editing the selected post.
6. Editing and not-Editing of input fields are considered.
7. SaveDraft saved the data in local storage.
##### check points achieved
1.Search functionality in the dashboard
2. Add/ Delete Program
3. View the program without ability to edit
4. When clicked on edit all fields should be enabled for edit
5. 2 save options- Save Draft and Save options.

#### Bonus Task
1. 2FA (two factor authentication using otp over email was made). Nodemailer and SpeakEasy.js are used for the saem.
2. API in task1 were used for crud operation in the form
3. Used navigation to keep user in dashboard is sucecsful. 

## Some Screenshots #download and run appreaciated.
### Programs Dashboard
![Programs Dashboard](/1.png)
*Description: Overview of the Programs Dashboard.*

### Adding Program
![Adding Program](/5.png)
*Description: Adding details for a new program.*

### Viewing Program
![Viewing Program](/8.png)
*Description: Displaying Ansh Pant's program details in a non-editable format.*

### Editing Program
![Editing Program](/4.png)
*Description: Enabling editing mode to modify program details.*

### Searching by Name
![Searching by Name](/7.png)
*Description: Typing "pant" and finding Ansh Pant.*

### Updated Program Details
![Updated Program Details](/9.png)
*Description: After clicking "Save Program," Ansh Chand Pant's details are updated.*



### Login Page
![Login Page](/3.png)
*Description: Login page with two-factor authentication using OTP over email.*

### Signup Page
![OTP over email](/2.png)
*Description: Login page with two-factor authentication (OTP over email).*

## Getting Started
1. Clone this repository.
2. Set up the Node.js environment.
3. Install necessary dependencies using `npm install`.
4. Set up PostgreSQL database.
5. Run the application using `npm start`.

## SQL database code 

CREATE DATABASE mashle;

 
CREATE TABLE programs (
    id serial PRIMARY KEY,
    name varchar(255) NOT NULL,
    price varchar(20) NOT NULL,
    domain varchar(50) NOT NULL,
    programtype varchar(255) NOT NULL,
    description varchar(255) NOT NULL,
    imageurl varchar(255) NOT NULL,
    universityname varchar(100) NOT NULL,
    facultyprofileurl varchar(255) NOT NULL,
    learninghours varchar(10) NOT NULL,
    certificatediploma varchar(50) NOT NULL,
    eligibilitycriteria varchar(20) NOT NULL,
    placementassurance boolean NOT NULL,
    registrations varchar(255) NOT NULL,
    date varchar(255) NOT NULL
);

CREATE TABLE users2 (
    id serial PRIMARY KEY,
    name varchar(255) NOT NULL,
    mailid varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    secret varchar(255) NOT NULL
);



