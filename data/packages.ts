import { PackageType } from '@/types';

export const samplePackages: PackageType[] = [
  {
    slug: 'luxury-dubai-escape-5n6d',
    title: 'Luxury Dubai Escape 5N/6D',
    destination: 'Dubai',
    country: 'UAE',
    durationDays: 6,
    travelType: 'Luxury',
    rating: 4.8,
    reviewsCount: 123,
    priceINR: 89999,
    discountPercent: 12,
    coverImage: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef',
    images: [
      'https://images.unsplash.com/photo-1518684079-3c830dcef090',
      'https://images.unsplash.com/photo-1546412414-8035e1776c9a',
      'https://images.unsplash.com/photo-1592621385612-4d7129426394'
    ],
    overview:
      'Enjoy a premium Dubai experience with skyline cruises, iconic landmarks, luxury shopping, and curated desert adventures.',
    itinerary: [
      { day: 1, title: 'Arrival and Marina Dhow Cruise', description: 'Airport transfer, check-in, evening dhow cruise with dinner.' },
      { day: 2, title: 'City Tour and Burj Khalifa', description: 'Visit major landmarks and access Burj Khalifa observatory.' },
      { day: 3, title: 'Desert Safari', description: '4x4 dune bashing, cultural camp, BBQ dinner, and live shows.' },
      { day: 4, title: 'Leisure and Shopping', description: 'Explore Dubai Mall, optional Atlantis Aquaventure.' },
      { day: 5, title: 'Abu Dhabi Excursion', description: 'Guided day tour with Sheikh Zayed Grand Mosque entry.' },
      { day: 6, title: 'Departure', description: 'Breakfast and transfer to airport.' }
    ],
    inclusions: ['4-star hotel stay', 'Daily breakfast', 'Airport transfers', 'Sightseeing tours', 'Visa assistance'],
    exclusions: ['Personal expenses', 'Travel insurance', 'Lunch and some dinners'],
    faq: [
      { q: 'Is visa included?', a: 'Visa assistance is included; visa fee is extra unless mentioned in offers.' },
      { q: 'Can itinerary be customized?', a: 'Yes, this package can be tailored for family or honeymoon preferences.' }
    ],
    coordinates: { lat: 25.2048, lng: 55.2708 },
    featured: true
  },
  {
    slug: 'bali-honeymoon-retreat-6n7d',
    title: 'Bali Honeymoon Retreat 6N/7D',
    destination: 'Bali',
    country: 'Indonesia',
    durationDays: 7,
    travelType: 'Honeymoon',
    rating: 4.9,
    reviewsCount: 97,
    priceINR: 109999,
    discountPercent: 10,
    coverImage: 'https://images.unsplash.com/photo-1573790387438-4da905039392',
    images: [
      'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5',
      'https://images.unsplash.com/photo-1589308454674-6d8f89b6f8a4',
      'https://images.unsplash.com/photo-1604999333679-b86d54738315'
    ],
    overview: 'Romantic Bali package with private villa stay, candlelight dinner, water adventures, and temple trails.',
    itinerary: [
      { day: 1, title: 'Arrival at Denpasar', description: 'Transfer to private villa and welcome setup.' },
      { day: 2, title: 'Ubud Tour', description: 'Rice terraces, monkey forest, and art market.' },
      { day: 3, title: 'Nusa Penida Island Day Trip', description: 'Snorkeling and beach photography spots.' },
      { day: 4, title: 'Leisure and Spa', description: 'Half-day leisure and couple spa session.' },
      { day: 5, title: 'Temple and Sunset Tour', description: 'Visit Tanah Lot and Uluwatu with cultural show.' },
      { day: 6, title: 'Adventure Sports', description: 'Water sports in Benoa and beach club evening.' },
      { day: 7, title: 'Departure', description: 'Checkout and airport transfer.' }
    ],
    inclusions: ['Private villa', 'Breakfast', 'Private transfers', 'Island tour', 'Candlelight dinner'],
    exclusions: ['Airfare', 'Travel insurance'],
    faq: [{ q: 'Is this package suitable for couples only?', a: 'It is curated for couples but can be adapted for small groups.' }],
    coordinates: { lat: -8.3405, lng: 115.092 },
    featured: true
  },
  {
    slug: 'thailand-adventure-blast-4n5d',
    title: 'Thailand Adventure Blast 4N/5D',
    destination: 'Thailand',
    country: 'Thailand',
    durationDays: 5,
    travelType: 'Adventure',
    rating: 4.7,
    reviewsCount: 204,
    priceINR: 65999,
    coverImage: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a',
    images: [
      'https://images.unsplash.com/photo-1563492065599-3520f775eeed',
      'https://images.unsplash.com/photo-1519451241324-20b4ea2c4220',
      'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86'
    ],
    overview: 'Fast-paced Thailand trip covering Bangkok nightlife, island hopping, and water activities.',
    itinerary: [
      { day: 1, title: 'Arrival Bangkok', description: 'Hotel check-in and evening market walk.' },
      { day: 2, title: 'Pattaya Coral Island', description: 'Speedboat transfer and optional parasailing.' },
      { day: 3, title: 'Bangkok City Tour', description: 'Temple visits and shopping district exploration.' },
      { day: 4, title: 'Safari World', description: 'Full-day wildlife and marine park experience.' },
      { day: 5, title: 'Departure', description: 'Transfer to airport after breakfast.' }
    ],
    inclusions: ['Hotel stay', 'Breakfast', 'Transfers', 'Coral island tour'],
    exclusions: ['Visa fee', 'Adventure activity upgrades'],
    faq: [{ q: 'Can this include Phuket?', a: 'Yes, we can extend this package to include Phuket/Krabi.' }],
    coordinates: { lat: 13.7563, lng: 100.5018 },
    featured: true
  }
];
