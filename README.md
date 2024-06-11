# Todo API

A simple Todo API using Nodejs, Typescript, MySql and Sequelize.

### Prerequisites
You should have the following installed on your local machine.
- Node
- MySql
- Any MySql GUI (PHPmyAdmin or Workbench). 

### Getting Started

Install Typescript globally
```
npm i -g typescript
```

### Clone the Repository

```
```

You can now install the dependencies using this command

```
npm install
```

Then edit the .env.example file or create a .env file and paste these environment variables. Be sure to replace the values.

```
PORT=your_port

DB_NAME=your_database_name
DB_PASSWORD=your_database_password
DB_USER=your_database_username
DB_HOST=localhost

JWT_SECRET=your_jwt_secret

```

### Start the Server in Development

```
npm run dev
```
### Authentication endpoints (User registration and login)
| Methods| URLs | Actions |
|----------|----------|----------|
| POST | api/auth/register | register a user |
| POST | api/auth/login | login a user |

### Todo CRUD endpoints
| Methods| URLs | Actions |
|----------|----------|----------|
| GET | api/todo | get all tasks |
| GET | api/todo/:id | get task by id |
| POST | api/todo| create task |
| PUT | api/todo/:id | update task |
| DELETE | api/todo/:id | delete task |

You can also view the [API documentation](https://documenter.getpostman.com/view/28499333/2sA3XMjPGe). 
