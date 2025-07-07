# Portfolio Website - Replit Development Guide

## Overview

This is a modern full-stack portfolio website built with React and Express. The application features a sleek, dark-themed design showcasing Samiksha Agrawal's work as a software developer and data analyst. It includes sections for personal information, experience, skills, projects, and contact information, with a responsive design that works across all devices.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React hooks and TanStack Query for server state
- **Routing**: Wouter for client-side routing
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: PostgreSQL session store
- **API Pattern**: RESTful API with `/api` prefix

### Development Setup
- **Monorepo Structure**: Client and server code in same repository
- **Hot Reload**: Vite dev server with Express middleware integration
- **TypeScript**: Full type safety across frontend and backend
- **ESM**: Modern ES modules throughout the stack

## Key Components

### Frontend Structure
```
client/
├── src/
│   ├── components/ui/     # shadcn/ui components
│   ├── pages/            # Route components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   └── main.tsx          # Application entry point
```

### Backend Structure
```
server/
├── index.ts              # Express server setup
├── routes.ts             # API route definitions
├── storage.ts            # Database abstraction layer
└── vite.ts              # Vite integration for development
```

### Shared Resources
```
shared/
└── schema.ts             # Database schema and TypeScript types
```

## Data Flow

### Database Schema
- **Users Table**: Basic user authentication with username/password
- **Drizzle ORM**: Type-safe database operations with PostgreSQL
- **Zod Validation**: Schema validation for API inputs

### API Communication
- **TanStack Query**: Efficient data fetching with caching
- **Type Safety**: Shared types between frontend and backend
- **Error Handling**: Centralized error handling with proper HTTP status codes

### Authentication Flow
- Session-based authentication using PostgreSQL session store
- User registration and login endpoints ready for implementation
- Protected routes with authentication middleware support

## External Dependencies

### UI Framework
- **shadcn/ui**: Complete component library with Radix UI primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library for consistent iconography

### Database & ORM
- **Drizzle ORM**: Type-safe database toolkit
- **Neon Database**: Serverless PostgreSQL hosting
- **PostgreSQL**: Primary database engine

### Development Tools
- **Vite**: Fast build tool and dev server
- **TypeScript**: Type safety and better developer experience
- **ESBuild**: Fast JavaScript bundler for production

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React app to `dist/public`
2. **Backend Build**: ESBuild bundles Express server to `dist/index.js`
3. **Database**: Drizzle migrations applied to PostgreSQL

### Environment Configuration
- **Development**: Uses tsx for TypeScript execution
- **Production**: Compiled JavaScript with Node.js
- **Database**: Environment variable `DATABASE_URL` for connection

### Scripts
- `npm run dev`: Development server with hot reload
- `npm run build`: Production build for both frontend and backend
- `npm run start`: Production server
- `npm run db:push`: Apply database schema changes

## Changelog

```
Changelog:
- July 07, 2025. Initial setup with Alex Johnson template
- July 07, 2025. Updated all content with Samiksha Agrawal's information:
  - Personal details (name, title, description)
  - Social media links (GitHub, LinkedIn, Email)
  - About section with current internships
  - Skills updated with actual tech stack
  - Projects replaced with real portfolio projects
  - Added Experience section with internship details
  - Updated navigation to include experience section
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```

## Technical Notes

### Portfolio Features
- **Dark Theme**: Custom CSS variables for consistent theming
- **Responsive Design**: Mobile-first approach with breakpoint utilities
- **Modern Fonts**: Inter and JetBrains Mono for professional appearance
- **Smooth Animations**: CSS transitions and animations for better UX

### Development Considerations
- **Type Safety**: Full TypeScript coverage prevents runtime errors
- **Component Architecture**: Reusable UI components with proper prop types
- **Performance**: Optimized builds and efficient data fetching
- **Accessibility**: Semantic HTML and proper ARIA attributes

### Database Strategy
- **Schema Evolution**: Drizzle migrations for version control
- **Type Generation**: Database types automatically generated from schema
- **Connection Pooling**: Efficient database connections with Neon
- **Error Handling**: Proper error messages and status codes

This architecture provides a solid foundation for a professional portfolio website with room for future enhancements like blog functionality, project galleries, or admin panels.