# Touch Type

A modern touch typing application built with Next.js, featuring personalized lessons, progress tracking, and real-time statistics.

## Features

- 🔐 User authentication with NextAuth.js
- 📊 Real-time WPM and accuracy tracking
- 📈 Detailed statistics and progress monitoring
- 🎯 Personalized typing lessons
- 💾 Progress saving and history
- 🎨 Modern UI with Tailwind CSS

## Tech Stack

- Next.js 15.1.0
- React 18.2.0
- TypeScript
- Prisma (PostgreSQL)
- NextAuth.js
- Tailwind CSS
- Radix UI Components

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/sjobergfredrik/touch-type.git
cd touch-type
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Then edit `.env` with your database and authentication settings.

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to start using the application.

## Project Structure

- `/app` - Next.js app router pages and layouts
- `/components` - Reusable React components
- `/lib` - Utility functions and shared code
- `/hooks` - Custom React hooks
- `/prisma` - Database schema and migrations

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.