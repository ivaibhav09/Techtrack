# Job Portal Web Application  

This is a full-stack **Job Portal Web Application** built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). The platform facilitates job seekers and employers by offering features like job postings, user authentication, job applications, and real-time notifications.  

## Features  
- **User Authentication**: Secure login and registration with JSON Web Tokens (JWT).  
- **Role-Based Access**: Separate interfaces and functionalities for job seekers and employers.  
- **Job Posting and Management**: Employers can create, update, and delete job postings.  
- **Apply for Jobs**: Job seekers can browse job listings and apply.  
- **Real-Time Notifications**: Receive alerts on job applications and responses.  
- **Admin Panel**: Manage users and job postings.  

## Tech Stack  
### Frontend  
- **React.js**: For building a responsive and interactive user interface.  
- **Redux**: For state management across components.  

### Backend  
- **Node.js**: Handles server-side logic.  
- **Express.js**: For creating RESTful APIs.  

### Database  
- **MongoDB**: Used for storing application data.  

### Other Tools and Libraries  
- **Mongoose**: For MongoDB object modeling.  
- **JWT**: For secure authentication.  
- **Postman**: For testing APIs during development.  

## Project Structure  

## Installation and Setup  
### Prerequisites  
- Node.js installed on your system.  
- MongoDB set up locally or on a cloud platform (e.g., MongoDB Atlas).  

### Steps  
1. **Clone the repository**:  
   ```bash
   git clone https://github.com/your-username/job-portal.git
   cd job-portal
   PORT=5000

### setup
MONGO_URI=your-mongo-connection-string
JWT_SECRET=your-secret-key

