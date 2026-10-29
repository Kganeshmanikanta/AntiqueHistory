# 🏺 Antique History

A web-based antique management system built with **React.js** and **Spring Boot REST API** that allows users to manage antique records, explore their historical details, and preserve information about valuable historical artifacts.

## 📌 Project Overview

Antique History is a CRUD-based project designed to organize and manage information about antiques through a user-friendly interface. It connects a React frontend with a Spring Boot REST API and a MySQL database to perform data management operations.

The system stores details such as antique names, origins, previous owners, conditions, manufacturing dates, historical details, and stories associated with each antique.

## ✨ Features

- **Add Antique:** Create new antique records with relevant details.
- **View All Antiques:** Retrieve and display all stored antique records.
- **Find Antique:** Search for a specific antique using its ID.
- **Update Antique:** Modify existing antique information.
- **Delete Antique:** Remove antique records from the database.
- **Historical Details:** Store additional historical information about antiques.
- **Antique Stories:** Preserve stories and background information using text fields.
- **Responsive User Interface:** Navigate through a visually designed interface for managing records.
- **REST API Integration:** Connect the React frontend to the Spring Boot backend using Axios.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| React.js | Frontend user interface |
| Java | Backend programming language |
| Spring Boot | REST API development |
| Spring Data JPA | Database operations |
| Hibernate | Object-relational mapping |
| MySQL | Relational database |
| Axios | HTTP requests between frontend and backend |
| Maven | Backend dependency management |
| CSS | User interface styling |
| Git & GitHub | Version control and source code hosting |

## 🏗️ Architecture

The project follows a frontend–backend–database architecture.

```text
React.js Frontend
       |
       | Axios HTTP Requests
       v
Spring Boot REST API
       |
       | Spring Data JPA / Hibernate
       v
MySQL Database
```

### How It Works

1. The user performs an operation through the React interface.
2. Axios sends an HTTP request to the Spring Boot REST API.
3. The backend processes the request using its controller, service, and repository layers.
4. Spring Data JPA and Hibernate interact with the MySQL database.
5. The backend returns a response to the frontend, which displays the result.

## 📋 Antique Information

Each antique record can contain the following information:

| Field | Description |
|---|---|
| `aid` | Unique antique ID |
| `antiqueName` | Name of the antique |
| `origin` | Place or region of origin |
| `previousOwner` | Previous owner of the antique |
| `antiqueCondition` | Current condition of the antique |
| `madeDate` | Date the antique was made |
| `historicDetails` | Additional historical information |
| `story` | Story or background associated with the antique |

## ⚙️ Prerequisites

Before running the project, install the following:

- Java JDK compatible with the version configured in the backend project
- Node.js and npm
- MySQL Server and MySQL Workbench (optional)
- Git
- A code editor such as Visual Studio Code or IntelliJ IDEA

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Kganeshmanikanta/AntiqueHistory.git
cd AntiqueHistory
```

### 2. Configure the MySQL Database

Start MySQL Server and create a database:

```sql
CREATE DATABASE learn77;
```

Check the backend configuration in:

`antiquehistory/antiquehistory/src/main/resources/application.properties`

Configure the database connection settings according to your local MySQL setup:

```properties
spring.application.name=antiquehistory
server.port=2222

spring.datasource.url=jdbc:mysql://localhost:3306/learn77
spring.datasource.username=YOUR_MYSQL_USERNAME
spring.datasource.password=YOUR_MYSQL_PASSWORD

spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

Replace the username and password placeholders with your local MySQL credentials. **Do not commit real database passwords or other secrets to GitHub.**

Ensure the MySQL database exists before starting the backend.

### 3. Run the Spring Boot Backend

Open a terminal in the backend directory:

```bash
cd antiquehistory/antiquehistory
```

On Windows, run:

```bash
mvnw.cmd spring-boot:run
```

Alternatively, if Maven is installed:

```bash
mvn spring-boot:run
```

The backend is configured to run at:

`http://localhost:2222`

### 4. Run the React Frontend

Open a **separate terminal** in the project root and navigate to the React directory:

```bash
cd antique-history
```

Install the frontend dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm start
```

If the project uses Vite instead of Create React App, use:

```bash
npm run dev
```

Open the local URL displayed in your terminal.

## 🔗 REST API Endpoints

The backend exposes the following endpoints:

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/antique/addantique` | Add a new antique |
| `GET` | `/antique/getantique/{id}` | Retrieve an antique by ID |
| `GET` | `/antique/getall` | Retrieve all antiques |
| `PUT` | `/antique/updateantique/{id}` | Update an existing antique |
| `DELETE` | `/antique/deleteantique/{id}` | Delete an antique by ID |

**Base URL:** `http://localhost:2222`

These endpoints can be tested using Postman or another HTTP client.

## 🧪 Testing

You can test the REST API using Postman:

1. Start the MySQL database.
2. Start the Spring Boot backend.
3. Send requests to the endpoints listed above.
4. Verify that records are created, retrieved, updated, and deleted correctly.
5. Start the React frontend and test the corresponding interface operations.

## 📚 Learning Outcomes

Through this project, I gained practical experience with:

- Building REST APIs using Spring Boot.
- Implementing CRUD operations with Spring Data JPA.
- Connecting a Java backend to a MySQL database.
- Integrating a React frontend with backend APIs using Axios.
- Working with entity models, controllers, services, and repositories.
- Managing project source code using Git and GitHub.
- Designing a user interface for managing structured data.

## 🔮 Future Enhancements

- Add authentication and authorization.
- Implement advanced search and filtering.
- Add image uploads for antique artifacts.
- Introduce pagination and sorting.
- Improve API validation and exception handling.
- Add automated backend and frontend tests.
- Deploy the frontend, backend, and database using suitable hosting services.

## 👨‍💻 Author

**Ganesh Kedari**

- GitHub: [Kganeshmanikanta](https://github.com/Kganeshmanikanta)

---

If you find this project interesting, feel free to explore the repository and share suggestions for improvement.

**Built with Java, Spring Boot, React.js, and MySQL.**
