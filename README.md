# vswap- Sales Tracking System

## 📌 Problem Statement
Small and medium-sized enterprises (SMEs) struggle with:
1. **Manual Sales Tracking:** Error-prone notebooks and spreadsheets.
2. **Lack of Insights:** No real-time sales analytics.
3. **Limited Access & Backup:** Risk of data loss.
4. **Financial Planning Issues:** Poor stock management due to missing sales data.
5. **Expensive Solutions:** Existing tools are costly for small businesses.

**vswap** solves these problems by offering an affordable, automated, and easy-to-use sales tracking solution.


## 🏗️ Folder Structure
```
📦 vswap
 ┣ 📂 backend               # Express.js backend
 ┃ ┣ 📂 models              # Mongoose models
 ┃ ┣ 📂 routes              # API routes
 ┃ ┣ 📂 controllers         # Business logic
 ┃ ┣ 📂 middleware          # Authentication middleware
 ┃ ┣ 📂 config              # Database connection & env setup
 ┃ ┣ 📜 index.js            # Main server file
 ┃ ┣ 📜 .env                # Environment variables
 ┣ 📂 frontend              # Frontend (HTML + Tailwind CSS)
 ┃ ┣ 📜 index.html          # Login and role selection page
 ┃ ┣ 📜 dashboard.html      # Shop & logs dashboard
 ┃ ┣ 📜 tailwind.css        # Tailwind styles
 ┃ ┣ 📜 app.js              # Frontend logic (API calls)
 ┣ 📜 README.md             # Project documentation
 ┣ 📜 package.json          # Node dependencies & scripts
 ┣ 📜 .gitignore            # Git ignore file
```


## 🛠️ Technologies Used
### **Backend:**
- **Node.js (Express.js)** – Server-side framework
- **MongoDB (Mongoose)** – NoSQL database
- **JSON Web Token (JWT)** – Authentication
- **bcrypt.js** – Password hashing
- **dotenv** – Environment variable management
- **CORS** – Cross-Origin Resource Sharing

### **Frontend:**
- **HTML, CSS** – UI structure
- **Tailwind CSS** – Modern UI styling
- **JavaScript (Vanilla JS)** – Frontend logic & API requests


## 🔧 Installation & Setup
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/your-repo/mona-app.git
cd mona-app
```

### **2️⃣ Install Backend Dependencies**
```sh
cd backend
npm install
```

### **3️⃣ Setup Environment Variables**
Create a `.env` file in the `backend` folder and add:
```env
PORT=5000
MONGO_URI=mongodb+srv://<your-mongodb-connection-string>
JWT_SECRET=your_secret_key
```
Replace `<your-mongodb-connection-string>` with your MongoDB URI.

### **4️⃣ Run the Backend Server**
```sh
npm run dev
```

### **5️⃣ Open the Frontend**
Simply open `frontend/index.html` in your browser.


## 🎯 Features
### **Super Admin:**
- View all registered shops
- Track total logs

### **Shop Owners:**
- Register shops
- Update shop details

### **Attendants:**
- View available shops
- Request to add logs


## 🚀 Future Enhancements
- **Subscription Plans** for advanced analytics.
- **AI-driven Sales Predictions** for better decision-making.
- **Integration with Accounting Software.**

Mona App aims to empower SMEs with smart sales tracking at an affordable price! 🎉

