# BLW Asset Management System (AMS)

A full-stack web application designed for the Banaras Locomotive Works (BLW) to manage departmental inventory and track asset lifecycles. This system provides role-based access for administrators and department users, enabling efficient tracking, updating, and reporting of all assets.

---

## ✨ Key Features

* **Role-Based Access Control:**
    * **Admin View:** Administrators have a complete overview of all departments, with the ability to edit any item, add new assets, and view detailed reports.
    * **Department View:** Logged-in users can view, edit quantities, and add new assets specifically for their own department.
* **Comprehensive Inventory Management:**
    * Track items by department, including quantity and detailed lifecycle dates (Manufacturing, Warranty, Maintenance).
    * Live search functionality to quickly filter assets across all departments.
* **Asset Lifecycle Tracking:**
    * View and edit key dates for each asset, including manufacturing, warranty, last maintenance, and next scheduled maintenance.
* **PDF Report Generation:**
    * Generate professional, well-formatted PDF reports for individual assets, specific departments, or a complete overview of all assets.
* **Interactive UI:**
    * A clean, intuitive dashboard built with Bootstrap and vanilla JavaScript.
    * Features include sidebar navigation, pop-up modals for adding/editing data, and a dedicated details view for individual items.

---

## 🛠️ Technology Stack

* **Backend:**
    * **Node.js:** JavaScript runtime environment.
    * **Express.js:** Web application framework for building the API.
    * **SQLite3:** Lightweight, file-based SQL database.
    * **pdfkit-table:** Library for generating complex, table-based PDF documents.
* **Frontend:**
    * **HTML5, CSS3, Vanilla JavaScript:** Core web technologies.
    * **Bootstrap 5:** CSS framework for responsive design and UI components.
    * **html2canvas & jsPDF:** Libraries for client-side PDF generation from HTML.

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* [Node.js](https://nodejs.org/) installed on your machine (which includes npm).

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/divyansh224/BLW_Project.git](https://github.com/divyansh224/BLW_Project.git)
    cd BLW_Project
    ```

2.  **Set up the Backend:**
    * Navigate to the backend directory:
        ```sh
        cd blw_ams_backend
        ```
    * Install the required npm packages:
        ```sh
        npm install
        ```
    * (Optional) Seed the database with initial data. This will create the `blw.db` file and populate it.
        ```sh
        node seedInventory.js
        ```
    * Start the backend server:
        ```sh
        node server.js
        ```
    The backend server will be running on `http://localhost:3000`.

3.  **Set up the Frontend:**
    * The frontend is composed of static HTML, CSS, and JavaScript files located in the `blw_ams_frontend` directory.
    * No separate installation is needed. The backend server is already configured to serve these files.

---

## Usage

1.  **Start the Backend:** Make sure your backend server is running by executing `node server.js` from the `blw_ams_backend` directory.

2.  **Access the Application:** Open your web browser and navigate to:
    ```
    http://localhost:3000
    ```
    This will load the `login.html` page.

3.  **Log In:**
    * **Admin Login:**
        * Department: `Administration`
        * User ID: `admin`
        * Password: `admin123` (or as defined in your database)
    * **Department User Login:**
        * Log in with credentials specific to a department (e.g., Design Department).

4.  **Navigate and Manage Assets:**
    * Use the sidebar to navigate between department views.
    * Click "Details" to view lifecycle information for an asset.
    * Use the "Edit" and "Add New Asset" buttons to manage inventory.
    * Generate PDF reports for departments or individual assets.

