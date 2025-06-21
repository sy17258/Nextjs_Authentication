# NextAuth - Modern Authentication System

A secure, modern authentication application built with Next.js 15, TypeScript, MongoDB, and Tailwind CSS. This project provides a complete authentication solution with email verification, JWT tokens, and a beautiful responsive UI.

![NextAuth Banner](https://img.shields.io/badge/NextAuth-Authentication%20System-blue?style=for-the-badge&logo=next.js)

## 🚀 Features

### 🔐 Security Features
- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - Bcrypt encryption for password security
- **Email Verification** - Automated email verification system
- **Protected Routes** - Middleware for route protection
- **Secure Cookies** - HTTP-only cookies for token storage

### 💻 User Experience
- **Responsive Design** - Works perfectly on all devices
- **Modern UI/UX** - Beautiful gradient designs with Tailwind CSS
- **Real-time Notifications** - Toast notifications for user feedback
- **Loading States** - Smooth loading indicators
- **Form Validation** - Client and server-side validation

### 🛠️ Technical Features
- **Next.js 15** - Latest Next.js with App Router
- **TypeScript** - Full type safety
- **MongoDB** - NoSQL database for user management
- **Email Service** - Mailtrap integration for email sending
- **Icon System** - Lucide React icons
- **Hot Reload** - React Hot Toast for notifications

## 🏗️ Project Structure

```
nextauth/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── users/
│   │   │       ├── login/route.ts
│   │   │       ├── logout/route.ts
│   │   │       ├── signup/route.ts
│   │   │       ├── me/route.ts
│   │   │       └── verifyemail/route.ts
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── signup/
│   │   │   └── page.tsx
│   │   ├── profile/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── verifyemail/
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── helpers/
│   │   └── mailer.ts
│   ├── lib/
│   │   └── dbConfig.ts
│   ├── middleware.ts
│   └── models/
│       └── userModel.js
├── .env
├── .env.sample
├── .gitignore
├── package.json
└── README.md
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB Atlas account or local MongoDB
- Mailtrap account for email testing

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sy17258/Nextjs_Authentication.git
   cd nextauth
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nextauth?retryWrites=true&w=majority
   TOKEN_SECRET=your_jwt_secret_minimum_32_characters
   MAILTRAP_USER=your_mailtrap_user
   MAILTRAP_PASS=your_mailtrap_password
   DOMAIN=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:3000`

## 📱 Pages Overview

### 🏠 Home Page
- Modern landing page with gradient design
- Features showcase
- Navigation with conditional rendering
- Call-to-action buttons

### 🔑 Authentication Pages
- **Login** (`/login`) - User sign-in with email/password
- **Signup** (`/signup`) - User registration with email verification
- **Email Verification** (`/verifyemail`) - Email confirmation page

### 👤 User Pages
- **Profile** (`/profile`) - User dashboard and account info
- **Profile Details** (`/profile/[id]`) - Detailed user information

## 🔧 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/users/signup` | POST | User registration |
| `/api/users/login` | POST | User authentication |
| `/api/users/logout` | GET | User logout |
| `/api/users/me` | POST | Get current user info |
| `/api/users/verifyemail` | POST | Verify user email |

## 📦 Dependencies

### Core Dependencies
```json
{
  "next": "15.0.0",
  "react": "19.0.0",
  "typescript": "5.0.0",
  "mongoose": "^8.0.0",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.0"
}
```

### UI Dependencies
```json
{
  "tailwindcss": "^3.4.0",
  "lucide-react": "^0.400.0",
  "react-hot-toast": "^2.4.0"
}
```

### Email Service
```json
{
  "nodemailer": "^6.9.0"
}
```

## 🌟 Key Features Explained

### Authentication Flow
1. User registers with email, username, and password
2. System sends verification email via Mailtrap
3. User clicks verification link
4. Email is verified, user can login
5. JWT token is generated and stored in HTTP-only cookies
6. Protected routes check for valid tokens

### Security Measures
- Passwords hashed with bcrypt (salt rounds: 10)
- JWT tokens with expiration
- HTTP-only cookies for token storage
- Input validation and sanitization
- Protected API routes with middleware

### Email System
- Automated email sending with Mailtrap
- HTML email templates
- Verification link generation
- Error handling for email failures

## 🎨 Design System

### Color Palette
- **Primary**: Indigo to Cyan gradient
- **Secondary**: Green for success states
- **Error**: Red for error states
- **Neutral**: Gray scale for text and backgrounds

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold, large sizes with gradients
- **Body**: Regular weight, readable sizes

## 🔐 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://...` |
| `TOKEN_SECRET` | JWT secret key (32+ chars) | `your_secret_key` |
| `MAILTRAP_USER` | Mailtrap username | `your_username` |
| `MAILTRAP_PASS` | Mailtrap password | `your_password` |
| `DOMAIN` | Application domain | `http://localhost:3000` |

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Manual Deployment
```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Shivam Yadav**
- GitHub: [@your-github-username](https://github.com/your-github-username)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/your-profile)
- Email: your.email@example.com

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- MongoDB for the database solution
- Tailwind CSS for the styling system
- Lucide React for the icon system
- Mailtrap for email testing services

## 📊 Project Stats

![GitHub repo size](https://img.shields.io/github/repo-size/your-username/nextauth)
![GitHub stars](https://img.shields.io/github/stars/your-username/nextauth)
![GitHub forks](https://img.shields.io/github/forks/your-username/nextauth)
![GitHub issues](https://img.shields.io/github/issues/your-username/nextauth)

---

⭐ **Star this repository if you found it helpful!**

Built with ❤️ by [Shivam Yadav](https://github.com/sy17258)
