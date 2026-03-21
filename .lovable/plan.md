

# OpenGov Nigeria — MVP Implementation Plan

## Overview
A transparency platform for Nigerian citizens to track government budgets, monitor projects, report corruption, and hold politicians accountable. Starting with Gombe State as the pilot.

## Design System
- **Colors**: Green (#16A34A) for trust/primary, White backgrounds, Dark gray (#111827) text, Red (#DC2626) for alerts/corruption flags, Yellow (#FACC15) for ongoing status
- **Font**: Inter — clean, modern, professional
- **Style**: Minimal dashboard aesthetic, mobile-first, large touch targets

## Backend (Supabase via Lovable Cloud)
- **Auth**: Email/password signup with public user profiles (username, state, LGA, avatar)
- **Database tables**: profiles, projects, budget_allocations, citizen_reports, project_ratings, politician_profiles, notifications
- **Storage**: Bucket for report photo/video uploads
- **RLS**: Public read for projects/budgets, authenticated write for reports/ratings

## Pages & Features

### 1. Landing Page (Homepage)
- Hero section: "Track Government Projects in Nigeria" with search bar
- Two CTAs: "View Projects" and "Report an Issue"
- Quick stats cards (total projects, completed, ongoing, abandoned)
- Nigeria map preview with project pins (Google Maps)
- Recent citizen reports feed (cards with images)

### 2. Dashboard Page
- Sidebar navigation (Dashboard, Projects, Reports, Politicians, Map, Settings)
- Budget allocation bar chart (Federal → State → LGA breakdown)
- Project status pie chart
- Recent projects table with state, budget, and status columns

### 3. Projects Page
- Filter bar: State dropdown, Status filter (Completed/Ongoing/Abandoned), Budget range
- Project cards grid with image, name, budget, status badge, and "View Details" button
- Color-coded status badges: 🟢 Completed, 🟡 Ongoing, 🔴 Abandoned

### 4. Project Details Page
- Full project info: name, budget, contractor, start date, location on Google Map
- Citizen reports section with uploaded photos and comments
- Star rating display (1-5) with ability to rate and comment

### 5. Citizen Reporting Page (Key Feature)
- Simple form: Select project, upload photos/videos, write description
- Big, easy submit button — optimized for mobile
- Requires login to submit

### 6. Map View Page
- Full-screen Google Maps centered on Gombe State
- Color-coded pins for project status
- Click pin → project preview popup with link to details

### 7. Politician Profiles Page
- List of politicians with photo, name, position
- Individual profile: performance score, projects under them, citizen feedback

### 8. Notifications
- Bell icon in header
- Alerts for: new projects in user's area, missed deadlines, budget releases

### 9. Auth Pages
- Login and signup pages with email/password
- Profile setup (username, state, LGA, avatar)

## Payments (Stripe — Donations)
- "Support OpenGov" donation button on the site
- One-time donation flow via Stripe checkout
- Will require Stripe secret key setup

## Mock Data
- Pre-populated with ~15-20 realistic Gombe State projects
- Sample budget allocations and politician profiles
- Admin capability to add/edit real data later

## Mobile Responsiveness
- All pages fully responsive
- Large buttons, simplified navigation on mobile
- Easy photo upload flow for citizen reporting

