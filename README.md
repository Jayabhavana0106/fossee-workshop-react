
## Design Principles
- Mobile-first: base styles target 375px, enhanced for larger screens
- Clear visual hierarchy: Fraunces serif for headings, DM Sans for body
- Accessible: ARIA labels, skip links, focus rings, form error announcements
- Performance: Google Fonts subset loading, no heavy icon libraries, CSS animations only

## Responsiveness
- CSS Grid with auto-fit/minmax for adaptive layouts
- Sticky navbar with hamburger menu below 768px
- Fluid typography using clamp()
- Overflow-x scroll on tables for mobile

## Trade-offs
- Used mock/static data instead of real Django API calls (frontend-only demo)
- No code splitting — app is small enough that it's not needed
- Chose CSS variables over a UI library (Tailwind/MUI) to keep bundle small

## Hardest Part
Replicating the Django template logic (user roles, conditional nav items, auth state) in React without a real backend required designing a clean AuthContext that mimics session behavior without localStorage.


