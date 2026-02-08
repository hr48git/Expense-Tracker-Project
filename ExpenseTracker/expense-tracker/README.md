# Expense Tracker – Full Stack (Spring Boot + Angular + Docker + Azure)

This project is a **full‑stack Expense Tracker application** built using **Spring Boot (Backend)**, **Angular (Frontend)**, **MySQL**, **Docker**, and deployed on **Azure App Service**.

---

## 🚀 Tech Stack

### Backend

* Java 17
* Spring Boot 3.x
* Spring Data JPA (Hibernate)
* MySQL (Azure Database for MySQL)
* Maven

### Frontend

* Angular
* TypeScript
* HTML / CSS

### DevOps & Deployment

* Docker & Docker Compose
* Azure App Service (Linux)
* Azure Container Registry (ACR)
* Git & GitHub

---

## 📂 Project Structure

```
expense-tracker-docker/
│
├── docker-compose.yml
│
├── expensetracker/               # Spring Boot backend
│   ├── src/main/java
│   ├── src/main/resources
│   └── pom.xml
│
├── expense-tracker-frontend/     # Angular frontend
│   ├── src/
│   ├── angular.json
│   └── package.json
│
└── README.md
```

---

## ⚙️ Backend Features

* User management
* Category management
* Expense management
* Expense filtering by:

  * User
  * Category
  * Date range
* Total expense calculation
* RESTful APIs

### Sample Backend Endpoints

```
POST   /api/users
GET    /api/users

POST   /api/categories
GET    /api/categories

POST   /api/expenses
GET    /api/expenses?userId=1
GET    /api/expenses/total?userId=1
GET    /api/expenses/by-category
GET    /api/expenses/by-date
DELETE /api/expenses/{expenseId}
```

---

## 🌐 Frontend Features

* Angular UI for expense tracking
* REST API integration with backend
* Environment‑based API configuration
* Supports:

  * Add expenses
  * View expenses
  * Filter expenses

---

## 🐳 Docker Setup

### Images Used

* Backend: Spring Boot JAR (Java 17)
* Frontend: Angular (Nginx)
* Database: MySQL 8

### Docker Images (local)

```bash
docker images
```

### Run Using Docker Compose

```bash
docker-compose up -d
```

### Stop Containers

```bash
docker-compose down
```

---

## ☁️ Azure Deployment

### Backend

* Deployed to **Azure App Service (Linux)**
* Java 17 runtime
* Uses Azure MySQL Database
* Environment variables configured via **App Settings**

### Key Environment Variables

```
SPRING_DATASOURCE_URL
SPRING_DATASOURCE_USERNAME
SPRING_DATASOURCE_PASSWORD
JAVA_OPTS
```

### Startup Command (Azure)

```
java -jar /home/site/wwwroot/app.jar
```

---

## 🔗 Frontend → Backend Connection

Frontend uses environment configuration:

```ts
// environment.ts
authApiUrl: 'https://<azure-backend-url>'
```

* `environment.ts` → local development

---

## 🧪 Testing

### Backend

* Test using browser, Postman, or curl
* Example:

```
GET https://<backend-url>/api/expenses?userId=1
```

### Frontend

```bash
cd expense-tracker-frontend
npm install
ng serve
```

Access:

```
http://localhost:4200
```

---

## 📦 Git Branching Strategy

* `docker-setup` → Docker + deployment setup

---

## ✅ Current Status

✔ Backend running on Azure

✔ Frontend working locally

✔ Docker images built

✔ Database connected successfully

---

## 🧑‍💻 Author

**Tharun Julakanti**

**Het Ravel**

##
