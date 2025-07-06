# TimeTrackerApp

A modern time tracking web application built with Angular 20.0.5.  
This app allows users to create, edit, and manage time entries efficiently, and is designed to demonstrate practical frontend development skills for technical assessments.

---

## 🚀 Features

- ✅ Create new time entries with task and participant assignment
- ✅ Edit and delete existing entries
- ✅ Display entries in a clean, responsive data table
- ✅ Form validation and user-friendly error handling
- ✅ Integration-ready for backend APIs

---

## 💻 Tech Stack

- **Frontend:** Angular 20.0.5, TypeScript, Angular Material
- **Build Tools:** Angular CLI
- **Testing:** Jasmine + Karma (unit tests), Cypress (end-to-end tests)
- **Other:** RxJS, SCSS

---

## 🛠️ Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Aura-lab/time-tracker-app.git
cd time-tracker-app
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Start development server

```bash
ng serve
```

Then open your browser and navigate to [http://localhost:4200/](http://localhost:4200/).

---

## ⚙️ Build

To build the project for production:

```bash
ng build
```

The compiled files will be in the `dist/` directory. By default, the build is optimized for performance and speed.

---

## 🧪 Testing

### ✅ Unit tests

Run with Karma:

```bash
ng test
```

---

### 🌀 End-to-end tests (Cypress)

#### Start development server

```bash
ng serve
```

#### Run Cypress tests

```bash
npx cypress open
```

or headless mode:

```bash
npx cypress run
```

> ⚡ **Note:** The default Cypress tests expect the app to be running on [http://localhost:4200/](http://localhost:4200/). Adjust `baseUrl` in `cypress.config.ts` if needed.

---

## 🤝 Contribution

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---

## 📝 License

This project is licensed under the MIT License.

---

## 💬 Additional Information

- This project was developed as part of a technical assessment and demonstrates best practices for Angular application structure, state management, testing (unit & e2e), and component-driven development.
- If you have questions, please contact me via wanghr0000@gmail.com

---

## ⭐ Acknowledgments

- [Angular](https://angular.io/)
- [Angular Material](https://material.angular.io/)
- [Cypress](https://www.cypress.io/)
- [RxJS](https://rxjs.dev/)
