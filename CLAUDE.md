# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
LeadFlow AI is a real-estate lead management and automation system built with Next.js, Prisma, and SQLite. It features multi-tenancy (Organization-based), lead scoring, AI-driven conversations, and appointment scheduling.

## Common Commands
- Develop: `npm run dev`
- Build: `npm run build`
- Start: `npm run start`
- Lint: `npm run lint`
- Database Seed: `npm run seed`
- Database Migration (Prisma): `npx prisma migrate dev`
- Database Studio: `npx prisma studio`

## Architecture
- **Framework**: Next.js (using App Router based on file structure).
- **Database**: SQLite via Prisma ORM.
- **Authentication**: Next-Auth.
- **Styling**: Tailwind CSS.
- **UI Components**: React with Recharts for analytics.

### Data Model
- **Organization**: Top-level entity for multi-tenancy.
- **User**: Agents belonging to an organization.
- **Lead**: Potential clients with scoring, status, and preferences.
- **Conversation & Message**: Chat history between leads and AI/Agents.
- **Property**: Real estate listings managed by organizations.
- **Appointment & FollowUp**: Scheduling and reminders for lead conversion.
- **AIInteraction**: Logs for AI prompt/response tracking and token usage.
- **AuditLog**: Tracking administrative and user actions per organization.

## Tech Stack
- Next.js 16
- React 19
- Prisma 5
- Zod (Validation)
- Bcryptjs (Password Hashing)
