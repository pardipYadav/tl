# Divine Simparna Holidays

Production-ready Tour & Travel booking platform scaffold built with Next.js App Router, Tailwind CSS, TypeScript, MongoDB, NextAuth, and payment integrations.

## Tech Stack

- Next.js (App Router)
- Tailwind CSS
- TypeScript
- Framer Motion
- React Hook Form + Zod
- MongoDB + Mongoose
- NextAuth (Credentials + Google)
- Stripe + Razorpay route handlers
- Cloudinary uploads
- SEO-ready metadata + sitemap + robots

## Features Included

- Modern travel homepage (hero video, smart search, featured packages, destinations, testimonials, blogs, offers, newsletter)
- Dynamic destination pages (`/destinations/[slug]`)
- Tour package listing with filters, sorting, pagination (`/packages`)
- Package detail with gallery, itinerary, inclusions/exclusions, pricing, FAQs, map, booking form, payment options
- Booking system with validation, database save, email hooks, and admin notification
- Auth system with login/register + dashboard protection
- User dashboard (`/dashboard`) for booking tracking
- Admin panel (`/admin`) with analytics-style overview
- Blog listing + detail pages
- Wishlist page scaffold
- AI trip planner + itinerary generator APIs
- Review API scaffold
- Coupon validation API
- Cloudinary upload API
- SEO support (`app/sitemap.ts`, `app/robots.ts`, metadata)

## Folder Structure

```text
/app
/components
/lib
/hooks
/models
/api
/types
/data
/utils
/styles
```

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Configure environment:
```bash
cp .env.example .env.local
```

3. Update `.env.local` values for MongoDB/Auth/Stripe/Razorpay/Cloudinary/SMTP.

4. Seed sample data:
```bash
npm run seed
```

5. Start development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Sample Credentials (after seed)

- Admin: `admin@divinesimparnaholidays.com` / `Admin@123`
- User: `rahul@example.com` / `User@123`

## Important Production Notes

- Replace Stripe/Razorpay placeholder frontend flows with full checkout SDK integration.
- Add webhook routes for payment verification and booking status updates.
- Add role-based admin API guards for all write endpoints.
- Configure image/video asset hosting and CDN caching.
- Add monitoring/logging (Sentry, structured logs) and CI checks.
