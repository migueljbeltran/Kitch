# Kitch

**Full-stack kitchen inventory, shopping list, and recipe management app.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A Spring Boot REST API + React frontend for managing your kitchen. Track inventory, build shopping lists, and store recipes with ingredients and step-by-step instructions. Data is persisted in an H2 database and seeded from CSV files on first startup.

## Features

- **Inventory Dashboard** — Track products, brands, quantities, and expiry dates with stat cards and a visual grid
- **Shopping Lists** — Checklist-style UI grouped by category with a progress bar; auto-move out-of-stock items from inventory
- **Recipes** — Create and browse recipes with a cookbook-style detail view, ingredient lists, and numbered step-by-step instructions
- **Full CRUD** — Add, edit, and delete everything from the frontend
- **RESTful API** — Clean endpoint design for all resources
- **H2 Database** — File-based persistence with JPA
- **CSV Data Seeding** — Sample data loaded on first startup

## Tech Stack

### Backend

[![Java](https://img.shields.io/badge/Java_17+-ED8B00?style=flat-square&logo=openjdk&logoColor=white)](https://openjdk.org/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot_3.2-6DB33F?style=flat-square&logo=spring&logoColor=white)](https://spring.io/projects/spring-boot)
[![Maven](https://img.shields.io/badge/Maven-C71A36?style=flat-square&logo=apachemaven&logoColor=white)](https://maven.apache.org/)
[![H2](https://img.shields.io/badge/H2_Database-0000BB?style=flat-square)](https://h2database.com/)

### Frontend

[![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite_7-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router_7-CA4245?style=flat-square&logo=reactrouter&logoColor=white)](https://reactrouter.com/)

## Quick Start

### Prerequisites

- Java JDK 17 or higher
- Node.js 18 or higher

### Backend

```bash
git clone https://github.com/migueljbeltran/Kitch.git
cd Kitchen-Project

# Run the API
./mvnw spring-boot:run
```

The API starts on `http://localhost:8080`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend starts on `http://localhost:5173` and proxies API calls to the backend.

## Project Structure

```
Kitchen-Project/
├── pom.xml                              # Maven build config
├── src/main/java/com/kitch/
│   ├── KitchApplication.java            # Spring Boot entry point
│   ├── config/
│   │   └── DataInitializer.java         # CSV data seeder
│   ├── entity/                          # JPA entities (Item, Recipe, RecipeStep)
│   ├── repository/                      # Spring Data JPA repositories
│   ├── service/                         # Business logic
│   ├── controller/                      # REST controllers
│   └── dto/                             # Request/response DTOs
├── src/main/resources/
│   ├── application.properties
│   └── data/                            # CSV/TXT seed data
└── frontend/
    ├── package.json
    ├── vite.config.js                   # Vite + Tailwind + API proxy
    └── src/
        ├── main.jsx                     # Router setup
        ├── App.jsx                      # Layout shell + Navbar
        ├── api/                         # Fetch wrappers (inventory, shopping, recipes)
        ├── components/                  # Reusable UI components
        └── pages/                       # Route-level page components
```

## API Endpoints

### Inventory (`/api/inventory`)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/inventory` | List all inventory items |
| GET | `/api/inventory/{id}` | Get single item |
| POST | `/api/inventory` | Add item |
| PUT | `/api/inventory/{id}` | Update item |
| DELETE | `/api/inventory/{id}` | Delete item |
| POST | `/api/inventory/move-to-shopping` | Move qty<=0 to shopping |

### Shopping (`/api/shopping`)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/shopping` | List all shopping items |
| GET | `/api/shopping/{id}` | Get single item |
| POST | `/api/shopping` | Add item |
| PUT | `/api/shopping/{id}` | Update item |
| DELETE | `/api/shopping/{id}` | Delete item |

### Recipes (`/api/recipes`)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/recipes` | List all recipes |
| GET | `/api/recipes/{id}` | Get recipe with ingredients + steps |
| POST | `/api/recipes` | Create recipe |
| PUT | `/api/recipes/{id}` | Update recipe name |
| DELETE | `/api/recipes/{id}` | Delete recipe + all children |
| POST | `/api/recipes/{id}/ingredients` | Add ingredient |
| PUT | `/api/recipes/{id}/ingredients/{iid}` | Update ingredient |
| DELETE | `/api/recipes/{id}/ingredients/{iid}` | Delete ingredient |
| POST | `/api/recipes/{id}/steps` | Add step |
| PUT | `/api/recipes/{id}/steps/{sid}` | Update step |
| DELETE | `/api/recipes/{id}/steps/{sid}` | Delete step |

## Configuration

Key properties in `application.properties`:

| Property | Default | Description |
|----------|---------|-------------|
| `server.port` | 8080 | Server port |
| `kitch.seed-data` | true | Seed CSV data on first startup |
| `spring.datasource.url` | `jdbc:h2:file:./kitch-db` | Database file location |

## Roadmap

See [docs/roadmap.md](docs/roadmap.md) for planned features including testing, search/filtering, authentication, and deployment.

---

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## Author

**Miguel Joaquin Beltran**
Computer Science @ UC Davis
[LinkedIn](https://www.linkedin.com/in/miguel-j-beltran/) | [Email](mailto:migueljoaquinbeltran@gmail.com)
