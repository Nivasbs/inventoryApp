# Inventory Management System

A full-stack inventory management application built to demonstrate modern web development using **React.js, ASP.NET Core Web API, Entity Framework Core, and PostgreSQL**.

The application provides RESTful APIs for managing products and a web-based frontend for interacting with the inventory.

## 🚀 Live Demo

**Frontend:**
https://inventory-app-nvs9.vercel.app

**Backend API:**
https://inventoryc-backend.onrender.com

**API Endpoint:**
https://inventoryc-backend.onrender.com/api/products

**Swagger API Documentation:**
https://inventoryc-backend.onrender.com/swagger

> The application is publicly accessible and can be tested directly from a web browser.

---

## 🛠️ Tech Stack

### Frontend

* React.js
* JavaScript
* HTML5
* CSS3
* REST API integration

### Backend

* C#
* ASP.NET Core Web API
* Entity Framework Core
* RESTful APIs
* Dependency Injection
* Repository Pattern
* Swagger / OpenAPI

### Database

* PostgreSQL
* Entity Framework Core Migrations

### Deployment

* **Frontend:** Vercel
* **Backend:** Render
* **Database:** Render PostgreSQL

### Development Tools

* Visual Studio
* Git
* GitHub
* Postman
* Swagger

---

## 🏗️ Architecture

The application follows a layered architecture:

```text
                    ┌──────────────────────┐
                    │      React.js        │
                    │      Frontend        │
                    └──────────┬───────────┘
                               │
                         HTTP / REST API
                               │
                               ▼
                    ┌──────────────────────┐
                    │   ASP.NET Core API   │
                    │     Controllers      │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Business / Service │
                    │        Layer         │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │    Repository /      │
                    │    Data Access       │
                    └──────────┬───────────┘
                               │
                         Entity Framework
                               │
                               ▼
                    ┌──────────────────────┐
                    │      PostgreSQL      │
                    │       Database       │
                    └──────────────────────┘
```

---

## ✨ Features

### Product Management

The application supports complete CRUD operations:

* Create products
* View all products
* View a product by ID
* Update product information
* Delete products

### RESTful API

The backend exposes RESTful endpoints for product management.

| Method | Endpoint             | Description                |
| ------ | -------------------- | -------------------------- |
| GET    | `/api/products`      | Get all products           |
| GET    | `/api/products/{id}` | Get product by ID          |
| POST   | `/api/products`      | Create a new product       |
| PUT    | `/api/products/{id}` | Update an existing product |
| DELETE | `/api/products/{id}` | Delete a product           |

---

## 🔄 Application Flow

A typical request follows this flow:

```text
User
  ↓
React Frontend
  ↓
HTTP Request
  ↓
ASP.NET Core Controller
  ↓
Business Logic
  ↓
Repository / Entity Framework Core
  ↓
PostgreSQL
  ↓
Response
  ↓
React Frontend
  ↓
User
```

For example, when retrieving products:

```text
React
  ↓
GET /api/products
  ↓
ProductsController
  ↓
InventoryContext
  ↓
PostgreSQL
  ↓
List of Products
  ↓
React UI
```

---

## 🗄️ Database

The application uses **PostgreSQL** as the relational database.

Entity Framework Core is used as the ORM for:

* Database communication
* Entity mapping
* LINQ queries
* CRUD operations
* Database migrations

Database schema changes are managed using **EF Core Migrations**.

---

## 🔌 Backend API

The backend is implemented using ASP.NET Core Web API.

Example controller route:

```csharp
[Route("api/[controller]")]
[ApiController]
public class ProductsController : ControllerBase
```

The API uses HTTP methods according to REST conventions:

```text
GET     → Retrieve data
POST    → Create data
PUT     → Update data
DELETE  → Delete data
```

---

## 🌐 Frontend & Backend Integration

The React frontend communicates with the deployed ASP.NET Core backend using HTTP requests.

Production API:

```text
https://inventoryc-backend.onrender.com/api
```

The frontend is hosted separately on Vercel while the backend is hosted on Render.

CORS is configured in the ASP.NET Core backend to allow communication between the frontend and backend.

---

## ☁️ Deployment

### Frontend — Vercel

The React application is deployed on Vercel.

```text
React Application
       ↓
     Vercel
       ↓
https://inventory-app-nvs9.vercel.app
```

### Backend — Render

The ASP.NET Core Web API is deployed on Render.

```text
ASP.NET Core API
       ↓
     Render
       ↓
https://inventoryc-backend.onrender.com
```

### Database — Render PostgreSQL

The application uses a managed PostgreSQL database hosted through Render.

The database connection is configured using environment variables rather than storing production credentials directly in source code.

---

## 🔐 Configuration

The production database connection string is supplied through an environment variable:

```text
ConnectionStrings__DefaultConnection
```

This allows the application to retrieve the database configuration through ASP.NET Core's configuration system while keeping database credentials outside the source code.

---

## 📁 Project Structure

A simplified structure of the backend:

```text
InventoryManagement.API/
│
├── Controllers/
│   └── ProductsController.cs
│
├── Data/
│   └── InventoryContext.cs
│
├── Models/
│   └── Product.cs
│
├── Migrations/
│   └── EF Core migration files
│
├── Program.cs
├── appsettings.json
└── InventoryManagement.API.csproj
```

The frontend contains the React components, styling, and API integration required to interact with the backend.

---

## 🧪 API Testing

The API can be tested using:

* Swagger / OpenAPI
* Postman
* Browser for GET endpoints

Swagger:

```text
https://inventoryc-backend.onrender.com/swagger
```

Example GET request:

```text
GET https://inventoryc-backend.onrender.com/api/products
```

---

## 🔧 Running Locally

### Prerequisites

Install:

* .NET SDK
* Node.js
* PostgreSQL
* Git

### Backend

Clone the repository:

```bash
git clone <your-github-repository-url>
```

Navigate to the backend:

```bash
cd InventoryManagement.API
```

Restore dependencies:

```bash
dotnet restore
```

Apply database migrations:

```bash
dotnet ef database update
```

Run the API:

```bash
dotnet run
```

The API will be available on the local ASP.NET Core development URL shown in the terminal.

### Frontend

Navigate to the React application:

```bash
cd inventory-app
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

---

## 📌 Key Concepts Demonstrated

This project demonstrates practical knowledge of:

* C#
* ASP.NET Core Web API
* RESTful API design
* Entity Framework Core
* PostgreSQL
* LINQ
* Repository Pattern
* Dependency Injection
* CRUD operations
* HTTP methods and status codes
* CORS
* Environment variables
* Database migrations
* React.js
* Frontend/backend integration
* Git and GitHub
* Cloud deployment

---

## 🎯 Project Purpose

This project was developed as a practical demonstration of full-stack application development, covering the complete development lifecycle from:

```text
Development
    ↓
API Design
    ↓
Database Integration
    ↓
Frontend Integration
    ↓
Testing
    ↓
Git/GitHub
    ↓
Cloud Deployment
```

It demonstrates the ability to develop and deploy a working application that can be accessed through a web browser.

---

## 👨‍💻 Author

**Nivas BS**

Full-Stack / Web Developer

Technologies demonstrated in this project:

**C# | ASP.NET Core | React.js | Entity Framework Core | PostgreSQL | REST API | Git | GitHub | Vercel | Render**
