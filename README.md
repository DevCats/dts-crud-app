# HMCTS Task Management Dashboard

## Contents
Section                             | Description
----------------------------------- | --------------------------------------------------
[Description](#Description)         | Description of the Project & Technologies Used
[Usage](#Usage)                     | How To Use
[API Information](#API-Information) | API Documentation
[License](#License)                 | License Information

# Description
A simple task management dashboard built as part of a job application for HMCTS. Users can create & delete tasks, update the status of tasks, fetch all tasks and fetch a task by ID.

Built using Vite, React, Tailwind CSS, daisyUI & Axios on the client-side, and PostgresSQL, Node.js & Express on the server-side. 

## Usage
1. Clone/Download this repository.
2. Navigate to the /backend directory using a CLI of your choice & run "npm install".
3. Repeat step 2 for the /frontend directory. 
4. Download & install PostgresSQL and a GUI tool for managing PostgresSQL databases.
    * You can download PostgresSQL and pgAdmin here: https://www.postgresql.org/download/
5. Go through the steps to create a local PostgresSQL server.
    * Make a note of the username, hostname, password, and port.
6. Copy the statement below & paste it into a new query tab, then execute it to create the table. 
    * "CREATE TABLE IF NOT EXISTS tasks_tb (
        id SERIAL PRIMARY KEY,
        title VARCHAR(128) NOT NULL,
        description TEXT,
        status VARCHAR(16) NOT NULL,
        due TIMESTAMPTZ NOT NULL,
    );"
7. Navigate back to the /backend directory & create a ".env" file.
8. Add the credentials from step 5, the format is detailed below.
    * PG_USER = <username>,
      PG_HOST = <host>,
      PG_NAME = <tablename>,
      PG_PASS = <password>,
      PG_PORT = <port>,
9. Ensure your PostgresSQL server is running.
10. Navigate to the /frontend directory in one terminal & the /backend directory in another. 
11. In both terminals run "npm run dev".
12. Head to the link displayed in the /frontend CLI instance. 

## API Information
The API has 5 endpoints:
* GET /tasks
    * Fetches all tasks currently in the database
* GET /tasks/:id
    * Fetches only the task corresponding to the ID passed in the URL
* POST /tasks
    * Creates a task in the database
    * Requires the following parameters:
        * title (string, max length = 128)
        * description (string)
        * status (string, max length = 16)
        * due (timestamptz)
* PUT /tasks/:id
    * Updates the status of the task corresponding to the ID passed in the URL
    * Requires the following parameters:
        * ID (int, passed in URL)
        * status (string, max length = 16)
* DELETE /tasks/:id
    * Deletes the task corresponding with the ID passed into the URL

### License ![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)(https://opensource.org/licenses/MIT) 
Project created using the MIT license.
[Learn more...](https://opensource.org/licenses/MIT)