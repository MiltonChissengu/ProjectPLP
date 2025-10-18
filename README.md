1. System Overview
    Main Modules:
        User authentication and registration (users, companies, administrators)
        Job search and listing (job postings)
        Online courses (content, student progress, lightweight certification)
        Coaching (messaging between user and mentor/admin)
        Local business promotion (simple page/store per business)
        Impact dashboard (metrics: vacancies filled, courses completed, micro-businesses registered)

    Tech stack:
        Backend: Node.js + Express
        Database: MySQL
        Authentication: JWT + refresh tokens, passwords with bcrypt
        Frontend: HTML/CSS/JS
        File storage: local (dev) / S3 (prod)
        Deployment: Netfliy

2. Authentication and Security
    Passwords: bcrypt (salt 12)
    Tokens: jsonwebtoken with ACCESS_TOKEN_EXPIRY (~15m) and REFRESH_TOKEN_EXPIRY (7d)
    Secure routes with auth.middleware.js middleware that validates JWT and populates req.user.
    Role-based middleware: requireRole('EMPLOYER'), etc.
    Input validation: express-validator.
    Rate limiting on critical endpoints.
    Sanitize inputs to prevent SQL injection/NoSQL injection.