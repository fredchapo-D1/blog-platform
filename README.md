# Blog Platform API

## Description
This project is a backend system for a blog platform. It allows users to register, login, create blog posts, and interact through comments. It also includes role-based permissions for admin users.

## Features

### User Management
- User registration
- User login
- Role-based access (admin and normal user)

### Blog Posts (CRUD)
- Create posts
- View all posts
- Update posts
- Delete posts

### Permissions
- Users can update/delete their own posts
- Admins can update/delete any post

### Comments System
- Users can add comments to posts
- View comments for each post

## Technologies Used
- Node.js
- Express.js

## How to Run
1. Install dependencies:
   npm install

2. Start the server:
   node server.js

3. Test endpoints using Postman

## Example Endpoints
- POST /register
- POST /login
- POST /posts
- GET /posts
- PUT /posts/:index
- DELETE /posts/:index
- POST /comments
- GET /comments/:postIndex

## Notes
- Data is stored in memory and will reset when the server restarts