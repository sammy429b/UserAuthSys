# User Authentication System

<!-- ## Why Did I Build This? -->

The User Authentication System was built to provide a secure and scalable way to manage user access and authentication in web applications. In modern web development, protecting user data and ensuring secure login processes are crucial. This project aims to demonstrate a robust authentication mechanism using best practices.


## Built with :
 [![MongoDB][MongoDB]][MongoDB-url]
 [![Express.js][Express.js]][Express-url]
 [![React][React.js]][React-url]
 [![Node.js][Node.js]][Node-url]
 [![JWT][JWT]][JWT-url]
 [![TypeScript][TypeScript]][TypeScript-url]
 [![Redis][Redis]][Redis-url]
 [![Nodemailer][Nodemailer]][Nodemailer-url]
 [![Shadcn][Shadcn]][Shadcn-url]


## Get Started


1.  **Clone the Repository**

    ```bash
    git clone https://github.com/sammy429b/UserAuthSys.git
    cd UserAuthSys
    ```


2.  **Install Dependencies**

    Frontend

    ```bash
    cd Client
    npm install
    ```

    Backend

    ```bash
    cd ../Server
    npm install
    ```

3.  **Set Up Environment Variables**

    Create `.env` files in both the `client` and `server` directories with the necessary environment variables. Refer `.env.example` files for required variables.    

4. **Start the Application**

   Backend

   ```bash
   cd Server
   npm run dev
   ```

   Frontend

   ```bash
   cd ../Client
   npm run dev
   ```



## How I Did It?

### Key Steps

1. **Project Setup**:
   - Initialized the frontend with React.js and TypeScript.
   - Set up the backend with Node.js, Express.js, and TypeScript.
2. **Database Design**:
   - Used MongoDB for storing user data.
   - Utilized Redis for managing OTPs.
3. **Authentication Service**:
   - Implemented JWT for secure token-based authentication.
   - Created routes for user registration, login, OTP verification, and password management.
   - Used bcrypt for secure password hashing.
4. **Email Notifications**:
   - Integrated Nodemailer for sending automated email notifications for password resets.
5. **API Integration**:
   - Connected frontend to backend using Axios for API calls.
   - Managed authentication state in React using the context API.
6. **Responsive UI Design**:
   - Developed a responsive UI with React.js and Shadcn.

## Future Enhancements

1. **Role-Based Access Control (RBAC)**:
   - Implement different user roles (e.g., admin, user) with specific permissions.
2. **OAuth Integration**:
   - Add support for third-party authentication providers like Google, Facebook, and GitHub.
3. **Rate Limiting**:
   - Implement rate limiting to protect against brute-force attacks.
4. **Enhanced Security**:
   - Add features like account lockout after multiple failed login attempts and email verification.
5. **Scalability Improvements**:
   - Optimize the system for better performance under high load conditions, including horizontal scaling strategies.



[React.js]: https://img.shields.io/badge/React.js-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Shadcn]: https://img.shields.io/badge/Shadcn-000000?style=for-the-badge&logo=shadcn&logoColor=white
[Shadcn-url]: https://shadcn.dev/
[TypeScript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[Node.js]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
[Node-url]: https://nodejs.org/
[Express.js]: https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white
[Express-url]: https://expressjs.com/
[MongoDB]: https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com/
[Redis]: https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white
[Redis-url]: https://redis.io/
[JWT]: https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white
[JWT-url]: https://jwt.io/
[Nodemailer]: https://img.shields.io/badge/Nodemailer-339933?style=for-the-badge&logo=nodemailer&logoColor=white
[Nodemailer-url]: https://nodemailer.com/