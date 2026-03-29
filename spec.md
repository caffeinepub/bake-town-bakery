# Bake Town Bakery

## Current State
New project. Empty backend and frontend scaffolding only.

## Requested Changes (Diff)

### Add
- Full single-page website for Bake Town Bakery (Khajrana, Indore)
- Hero section: tagline, WhatsApp Order Now CTA
- Menu section: Cakes, Pastries, Fast Food categories with item cards (name, price, image, WhatsApp order button)
- About section: bakery story, freshness/quality/taste highlights
- Reviews section: 4.5 star rating, sample customer reviews
- Contact section: address, phone button, WhatsApp button, Google Maps embed
- Sticky floating WhatsApp button (bottom-right)
- Authorization component for admin-editable menu
- Smooth scroll animations
- SEO meta tags

### Modify
- Nothing (new project)

### Remove
- Nothing

## Implementation Plan
1. Backend: menu item management (CRUD) with admin auth, store items by category
2. Frontend:
   - Black + Yellow theme (index.css tokens)
   - Sticky nav with logo
   - Hero section with hero image
   - Menu section with category tabs and item cards
   - About section
   - Reviews section with star ratings
   - Contact section with map
   - Floating WhatsApp button
   - Smooth scroll animations (Intersection Observer)
   - Mobile-first responsive layout
