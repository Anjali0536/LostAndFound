# Lost & Found

A campus-focused Lost & Found web application that provides students with a centralized platform to report found items, search for lost belongings, submit claims, and manage the recovery process.

---

## 📌 Problem Statement

On college campuses, information about lost and found items is often scattered across WhatsApp groups, personal messages, and word of mouth.

This creates several problems:

- Students may not know where to report a found item.
- Lost items are difficult to search for systematically.
- Important information can get buried in chat groups.
- There is no structured way to submit and review claims.
- Multiple students may claim the same item.
- There is no centralized status for whether an item has been recovered.

The **Lost & Found** platform addresses these problems by providing a centralized and structured system for managing found items and their claims.

---

## 💡 Solution

Lost & Found allows students to report items they have found on campus and provides other students with a searchable platform to look for their belongings.

The platform supports:

1. User registration and login
2. Reporting found items
3. Searching and filtering found items
4. Submitting claims for items
5. Reviewing claims by the person who reported the item
6. Approving or rejecting claims
7. Updating item recovery status
8. Sending notifications about claim decisions
9. Uploading item images

The application handles the **digital workflow**, while the person who found the item can independently decide what to do with the physical item.

---

## 🔄 Application Workflow


User Registers / Logs In
          ↓
Finder Reports Found Item
          ↓
Found Item Appears on Platform
          ↓
Student Searches for Their Item
          ↓
Student Submits a Claim
          ↓
Finder Reviews Claim
          ↓
     ┌───────────────┐
     │               │
  Approve          Reject
     │               │
     ↓               ↓
Item RECOVERED   Claim REJECTED
     │               │
     ↓               ↓
Notification     Notification
✨ Features
🔐 Authentication
User registration
User login
JWT-based authentication
Protected API routes
Authenticated user identification
Authorization for sensitive actions
📦 Found Item Management

Users can report found items with information such as:

Title
Description
Category
Location
Date found
Image
Status

Each found item is associated with the user who reported it.

🔎 Search & Filtering

Users can search and filter found items using:

Keywords
Category
Location

Search works across item titles and descriptions.

📝 Claim System

Students can submit a claim for a found item by providing:

Identifying details
Location where they lost the item
Additional information

The system prevents:

Users from claiming their own found items
Duplicate pending claims for the same item by the same user
Claims on items that are no longer active
✅ Claim Approval & Rejection

The person who reported the found item can review claims.

A claim can be:

PENDING
APPROVED
REJECTED

When a claim is approved:

Claim → APPROVED
Found Item → RECOVERED

When a claim is rejected:

Claim → REJECTED
Found Item → remains ACTIVE
🔔 Notifications

Users receive in-app notifications when their claim is:

Approved
Rejected

The notification system also supports unread notification tracking and marking notifications as read.

🖼️ Image Uploads

Users can upload images of found items.

The upload flow is:

React Frontend
      ↓
Multer
      ↓
Cloudinary
      ↓
Image URL
      ↓
MongoDB

The image itself is stored in Cloudinary, while its URL is stored with the found item.

🧑‍💻 Finder's Physical Item Choices

The application manages the digital reporting and claim process.

After finding an item, the finder can independently decide what to do with the physical item. For example:

Leave the item at the place where it was found.
Keep/take the item with themselves.
Hand the item over to someone else, such as college security or reception.

The current application does not automatically manage the physical handover of the item.

📊 Item Status

Found items can have the following statuses:

Status	Meaning
ACTIVE	Item is currently available for claims
CLOSED	Item listing has been closed
EXPIRED	Item listing is no longer active
RECOVERED	Item has been successfully claimed/recovered
📋 Claim Status

Claims can have the following statuses:

Status	Meaning
PENDING	Claim is waiting for the finder to review it
APPROVED	Finder accepted the claim
REJECTED	Finder rejected the claim
🏗️ System Architecture
                    ┌─────────────────┐
                    │      User       │
                    └────────┬────────┘
                             │
                             ↓
                    ┌─────────────────┐
                    │ React Frontend  │
                    └────────┬────────┘
                             │
                         HTTP / API
                             │
                             ↓
                    ┌─────────────────┐
                    │ Node.js/Express │
                    │    Backend      │
                    └────────┬────────┘
                             │
                ┌────────────┼────────────┐
                │            │            │
                ↓            ↓            ↓
          Controllers      Routes      Middleware
                │
                ↓
            Mongoose
                │
                ↓
          ┌─────────────┐
          │  MongoDB    │
          └─────────────┘

Images:
React → Multer → Cloudinary → Image URL → MongoDB
🛠️ Tech Stack
Frontend
React
Vite
React Router
JavaScript
CSS
Backend
Node.js
Express.js
JavaScript
REST APIs
Database
MongoDB
Mongoose
Authentication
JSON Web Tokens (JWT)
Image Storage
Cloudinary
Multer
Multer Storage Cloudinary
Development Tools
Git
GitHub
VS Code
🗂️ Project Structure
Lost & Found/
│
├── backend/
│   │
│   ├── src/
│   │   ├── config/
│   │   │   ├── cloudinary.js
│   │   │   └── db.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── claim.controller.js
│   │   │   ├── foundPost.controller.js
│   │   │   └── notification.controller.js
│   │   │
│   │   ├── middleware/
│   │   │   └── auth.middleware.js
│   │   │
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── FoundPost.js
│   │   │   ├── Claim.js
│   │   │   └── Notification.js
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── foundPost.routes.js
│   │   │   ├── claim.routes.js
│   │   │   └── notification.routes.js
│   │   │
│   │   ├── app.js
│   │   └── server.js
│   │
│   └── package.json
│
├── frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── FoundPostCard.jsx
│   │   │   └── Navbar.jsx
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── FoundItems.jsx
│   │   │   ├── FoundPostDetail.jsx
│   │   │   └── ReportFoundItem.jsx
│   │   │
│   │   ├── routes/
│   │   │   └── AppRoutes.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   └── package.json
│
└── README.md
🗄️ Database Models

The application uses four primary models.

1. User

Stores registered user information.

User
 ├── name
 ├── collegeEmail
 ├── password
 └── enrollmentNumber
2. FoundPost

Represents an item reported as found.

FoundPost
 ├── title
 ├── description
 ├── category
 ├── location
 ├── dateFound
 ├── image
 ├── postedBy
 └── status

postedBy references the User who reported the item.

3. Claim

Represents a student's claim on a found item.

Claim
 ├── foundPost
 ├── claimant
 ├── identifyingDetails
 ├── lostLocation
 ├── additionalDetails
 └── status

A separate Claim model allows multiple users to submit claims for the same found item.

4. Notification

Stores notifications generated by important events.

Notification
 ├── user
 ├── type
 ├── message
 └── isRead
🔗 Database Relationships
User
 │
 ├──────────────→ FoundPost
 │                  │
 │                  ↓
 │                Claim
 │                  ↑
 └──────────────────┘
 │
 └──────────────→ Notification
Relationships
A User can create multiple FoundPosts.
A User can submit multiple Claims.
A FoundPost can have multiple Claims.
A User can receive multiple Notifications.
A Claim belongs to one FoundPost and one claimant.

MongoDB ObjectId references are used to connect related documents.

🔐 Authentication & Authorization

The application uses JWT-based authentication.

Authentication Flow
User Login
    ↓
Backend validates credentials
    ↓
JWT generated
    ↓
Token sent to client
    ↓
Client sends token with protected requests
    ↓
Auth Middleware verifies token
    ↓
req.user is populated
Authorization

Authentication determines who the user is.

Authorization determines what the user is allowed to do.

For example:

Only authenticated users can create found posts.
Only authenticated users can submit claims.
Only the finder can view all claims for their found post.
Only the finder can approve or reject a claim.
A user cannot claim their own found item.
🔒 Security & Validation

The backend performs important validation instead of relying only on frontend validation.

Examples include:

JWT authentication for protected routes
Checking whether a FoundPost exists
Checking whether a FoundPost is still ACTIVE
Preventing users from claiming their own items
Preventing duplicate pending claims
Using the authenticated user's ID instead of accepting the claimant ID from the request body
Authorization checks before viewing or modifying claims
Handling invalid MongoDB ObjectIds

🧠 Claim Processing Logic

When a student submits a claim:

1. User submits claim
        ↓
2. Backend verifies FoundPost exists
        ↓
3. Backend checks item is ACTIVE
        ↓
4. Backend checks user is not the finder
        ↓
5. Backend checks for duplicate pending claim
        ↓
6. Claim is created with PENDING status
        ↓
7. Finder reviews the claim
If Approved
Claim
  ↓
APPROVED

FoundPost
  ↓
RECOVERED

Notification
  ↓
Sent to claimant
If Rejected
Claim
  ↓
REJECTED

FoundPost
  ↓
Remains ACTIVE

Notification
  ↓
Sent to claimant
🔍 Search Flow

The search system allows users to find relevant found items.

User enters search/filter
          ↓
React sends API request
          ↓
Express receives request
          ↓
Controller builds MongoDB query
          ↓
MongoDB searches matching documents
          ↓
Results returned to frontend
          ↓
Found items displayed

The search functionality supports matching against item titles and descriptions, along with category and location filtering.

🖼️ Image Upload Flow

Found item images are uploaded using Multer and stored using Cloudinary.

User selects image
       ↓
React Frontend
       ↓
Multipart/Form Data
       ↓
Multer
       ↓
Cloudinary
       ↓
Image URL
       ↓
FoundPost stored in MongoDB

This keeps image storage separate from the main database while allowing the application to access the image through its URL.

🚀 Getting Started
Prerequisites

Make sure the following are installed:

Node.js
npm
MongoDB Atlas account
Git
📥 Clone the Repository
git clone https://github.com/Anjali0536/CampusFind.git

Navigate into the project:

cd CampusFind
⚙️ Backend Setup

Navigate to the backend:

cd backend

Install dependencies:

npm install

Create a .env file inside the backend directory.

Example:

PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

Start the backend:

npm run dev

The backend will run on:

http://localhost:5000

Health check:

GET /api/health

Expected response:

{
  "success": true,
  "message": "CampusFind API is running."
}
💻 Frontend Setup

Open another terminal.

Navigate to the frontend:

cd frontend

Install dependencies:

npm install

Start the development server:

npm run dev

The frontend will be available at the local Vite development URL shown in the terminal.

🔑 Environment Variables

Sensitive credentials should never be committed to GitHub.

Make sure .env is included in .gitignore.

Example:

.env
node_modules/
dist/
🧪 Current Implementation

The current version includes:

User authentication
JWT authorization
Found item reporting
Found item listing
Search and filtering
Item details
Claim submission
Claim approval and rejection
Item recovery status
In-app notifications
Image uploads
Cloudinary image storage
MongoDB persistence
Protected API routes
Role-based action checks between finder and claimant
🔮 Future Improvements

Possible future improvements include:

Admin moderation and escalation
Stronger verification for sensitive or high-value items
Automatic rejection of remaining pending claims after one claim is approved
Structured physical handover tracking
Handover confirmation
Item expiration and automatic archival
Report and moderation functionality
Claim-specific chat between users
Better spam and fake-post detection
AI-based matching between lost-item descriptions and found items
Campus security/reception integration
🎯 Project Goals

The main goals of Lost & Found are to:

Centralize campus lost-and-found information
Make found items easier to discover
Provide a structured claim process
Reduce dependency on scattered messaging groups
Provide better tracking of item status
Give students a simple and organized way to recover their belongings
👩‍💻 Contribution

This project was developed as a full-stack web application using the MERN stack.

The development involved:

Designing the application structure
Building REST APIs
Designing MongoDB/Mongoose models
Implementing authentication and authorization
Implementing the claim workflow
Developing the React frontend
Integrating image uploads
Implementing search and filtering
Implementing notifications
Connecting frontend and backend
📌 Project Summary

Lost & Found is a MERN-based campus platform designed to make the lost-and-found process more organized and accessible.

Instead of relying on scattered WhatsApp messages or informal communication, students can use a centralized system to:

Report → Search → Claim → Review → Approve/Reject → Recover

The project demonstrates practical implementation of full-stack development concepts including React, Node.js, Express, MongoDB, Mongoose, JWT authentication, REST APIs, Cloudinary, Multer, authorization, database relationships, and asynchronous communication between frontend and backend.

📄 License

This project is developed for educational and academic purposes.
