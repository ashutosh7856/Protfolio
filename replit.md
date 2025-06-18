# Khushi Kumari - Portfolio Website

## Overview

This is a modern, responsive personal portfolio website for Khushi Kumari, a freelance Web Developer & AI Automation Specialist. The site features a clean, tech-focused design with a professional, friendly vibe using a bold but minimal color scheme (blue/black/white). The target audience is international clients and startups looking for custom websites, GPT-powered tools, or landing pages.

## System Architecture

The application follows a modern full-stack architecture optimized for a portfolio website:

- **Frontend**: React-based SPA with TypeScript, using Vite for build tooling
- **Backend**: Express.js server with TypeScript support for contact form handling
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent design
- **Responsive Design**: Mobile-first approach with smooth animations and transitions
- **SEO Optimization**: Meta tags and social preview optimizations

## Key Components

### Portfolio Pages
- **Home Page**: Hero section with name, title, tagline, and CTAs
- **About Me**: Personal story, skills, tools, and goals
- **Services Page**: Service offerings with pricing and booking CTAs
- **Projects Page**: Portfolio showcase with live demos and source code links
- **Contact Page**: Contact form and communication options
- **Testimonials**: Client reviews and feedback

### Frontend Architecture
- **Component Structure**: Organized into logical folders (pages/, components/, ui/)
- **UI Components**: shadcn/ui component library for consistent design system
- **Animations**: Smooth transitions and hover effects using CSS animations
- **Typography**: Modern fonts (Inter family)

## Data Flow

1. **Portfolio Navigation**:
   - Single-page application with section-based navigation
   - Mobile-responsive navigation with hamburger menu
   - Smooth scrolling between sections

2. **Contact Form Workflow**:
   - Frontend form validation with real-time feedback
   - API endpoint `/api/contact` handles form submissions
   - Success/error messages displayed to users
   - Form data logged on server for follow-up

3. **Service Presentation**:
   - Clear pricing and service descriptions
   - Call-to-action buttons directing to contact form
   - Professional showcase of skills and tools

## External Dependencies

### Core Framework Dependencies
- **React 18** with TypeScript for UI framework
- **Express.js** for backend server
- **Vite** for development server and build tooling
- **Drizzle ORM** with PostgreSQL adapter for database operations

### UI and Styling
- **Tailwind CSS** for utility-first styling
- **Radix UI** components via shadcn/ui for accessible UI primitives
- **Lucide React** for consistent iconography

### 3D and Graphics
- **React Three Fiber** for potential 3D rendering capabilities
- **React Three Drei** for additional 3D utilities
- **Custom Canvas Engine** for 2D garden rendering

### State and Data Management
- **Zustand** for lightweight state management
- **TanStack Query** for server state management
- **Zod** for runtime type validation

## Deployment Strategy

The application is configured for deployment on Replit with the following setup:

- **Development**: Single command (`npm run dev`) starts both frontend and backend
- **Build Process**: Vite builds the frontend, esbuild bundles the backend
- **Production**: Optimized build serves static files through Express
- **Database**: PostgreSQL connection via environment variables
- **Port Configuration**: Configured for Replit's port forwarding system

The deployment uses Replit's autoscale deployment target with automatic builds triggered by the `npm run build` command and production starts with `npm run start`.

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- June 17, 2025. Initial setup