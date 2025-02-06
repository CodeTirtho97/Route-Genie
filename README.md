# RouteGenie – Your Personal Travel Assistant

![image](https://github.com/user-attachments/assets/ad58cc70-f30b-4fd5-a563-66da828d4fcb)


## 🛠 Project Overview

RouteGenie is a full-stack MERN (MongoDB, Express, React, Node.js) web application that helps users plan, manage, and book their travel itineraries. It includes features like itinerary creation, bookings (flights, hotels, activities), real-time travel data fetching from APIs, and a user authentication system.

## 🚀 Features

  ### 🏡 Home Page

    - Displays an attractive hero section with random background images.
    - Shows a detailed feature list for itinerary planning, bookings, and travel management.

  ### 📌 Itinerary Management

    - Users can create, edit, and delete itineraries.
    - Itineraries contain destination, start & end date, trip type (solo/family), budget, and planned activities.
    - Each itinerary page dynamically fetches background images based on the destination from Unsplash API.

  ### 🛫 Booking System

    - Users can manually add existing bookings (flights, hotels, restaurants, activities).
    - Upcoming & past bookings are categorized with filters, sorting, and detailed views.    
    - Future upgrades will allow real-time booking suggestions.

  ### 🔑 User Authentication & Auto Logout

    - Users can sign up, log in, and log out.
    - JWT-based authentication with secure password hashing (bcrypt).
    - Auto logout after 30 minutes of inactivity.

  ### 📊 Filtering & Sorting

    - Sort bookings by itinerary name, date, and type.  
    - Filter bookings by type (Flight, Hotel, Activity, etc.) & date range.

  ### 🌍 Real-Time Travel Data

    - Background images fetched dynamically from Unsplash API.
    - Flight & hotel data fetching (Future upgrade).

  ### 🛠 Tech Stack
  ### Frontend

  <b><i>React.js</i></b> – UI & component-based structure
  
  <b><i>Material-UI</i></b> – UI components
  
  <b><i>React Router</i></b> – Page navigation
  
  <b><i>Framer Motion</i></b> – Animations
  
  <b><i>Day.js</i></b> – Date formatting

  ### Backend

  <b><i>Node.js & Express.js</i></b> – Server-side logic
  
  <b><i>MongoDB (Mongoose)</i></b> – NoSQL database
  
  <b><i>JWT Authentication</i></b> – Secure token-based auth
  
  <b><i>Bcrypt</i></b> – Password encryption

  ### APIs & Integrations

  <b><i>Unsplash API</i></b> – Fetch background images

    // AviationStack API – Fetch flight data (Future upgrade)
    // Amadeus API – Fetch hotel data (Future upgrade)
    // Ticketmaster API – Fetch activity/event data (Future upgrade)

  ### 🔧 Installation & Setup

  #### 1️⃣ Clone the Repository

    $ git clone https://github.com/CodeTirtho97/routegenie.git
    $ cd routegenie

  #### 2️⃣ Backend Setup

  ##### 📌 Install Dependencies

    $ cd backend
    $ npm install

  ##### 📌 Configure Environment Variables

    Create a .env file inside the backend/ folder and add:
    
    PORT=your_backend_URL_port_no
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key

  ##### 📌 Run Backend Server

    $ npm start

  #### 3️⃣ Frontend Setup

  ##### 📌 Install Dependencies

    $ cd ../frontend
    $ npm install

  ##### 📌 Configure Environment Variables

    Create a .env file inside the frontend/ folder and add:
    
    REACT_APP_BACKEND_URL=your_backend_URL_site
    REACT_APP_UNSPLASH_ACCESS_KEY=your_unsplash_api_key

  ##### 📌 Run Frontend Server

    $ npm start

  ### 🔥 Deployment

  #### Backend Deployment (Render/Heroku/Vercel)

    $ git init
    $ git add .
    $ git commit -m "Initial commit"
    $ heroku create routegenie-backend
    $ git push heroku main
    
    Set up environment variables in Heroku/Render settings.

  #### Frontend Deployment (Vercel/Netlify)

    $ npm run build
    $ netlify deploy
    
    Set REACT_APP_BACKEND_URL in Netlify environment settings.

  ### 📂 Folder Structure

    routegenie/
    │── backend/
    │   ├── controllers/     # Business logic for routes
    │   ├── models/          # Mongoose Schemas
    │   ├── routes/          # Express API routes
    │   ├── middleware/      # JWT Authentication
    │   ├── server.js        # Main Express server
    │── frontend/
    │   ├── src/
    │   │   ├── components/  # Reusable UI components
    │   │   ├── pages/       # Route pages
    │   │   ├── context/     # Authentication context
    │   │   ├── hooks/       # Custom React hooks
    │   │   ├── utils/       # Helper functions
    │   │   ├── App.js       # Main React app
    │   ├── .env             # Environment variables
    │   ├── package.json     # Dependencies

  ### 💡 Future Upgrades

  ✅ Real-time Booking Suggestions using Amadeus, Ticketmaster, AviationStack APIs
  ✅ Flight Tracking Integration
  ✅ Payment Gateway for direct bookings
  ✅ Offline Mode with PWA support

  ### 🛠 Contributors & Support

  Developed by CodeTirtho97. If you have any suggestions, feel free to open an issue or contribute!

  ### 📜 License

  This project is licensed under the MIT License. Feel free to use and modify! 🎉
