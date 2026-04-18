
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

## Key Improvements
- Simplified navigation flow
- Improved readability with better typography
- Mobile-friendly layout redesign
- Accessible form handling and focus states

## UI Improvements (After)

Used React Context API to manage auth state and conditional rendering across components.

### Landing Page
<img width="1359" height="679" alt="Screenshot 2026-04-18 123457" src="https://github.com/user-attachments/assets/3523add9-7b86-4757-afc8-82e457703623" />

Improved layout, spacing, and typography to create clear visual hierarchy.

### Mobile Responsiveness
<img width="404" height="546" alt="Screenshot 2026-04-18 124542" src="https://github.com/user-attachments/assets/f1175ad5-6be0-4bad-805c-52d89211316d" />
<img width="404" height="546" alt="Screenshot 2026-04-18 124630" src="https://github.com/user-attachments/assets/27254d01-5810-4fbc-8fcc-960927517670" />

Redesigned layout for 375px screens with better stacking and readability.

<img width="1346" height="678" alt="image" src="https://github.com/user-attachments/assets/8ce62874-4386-4cb7-aeaf-1246909f0779" />
<img width="1341" height="672" alt="Screenshot 2026-04-18 131854" src="https://github.com/user-attachments/assets/bb1b6e9d-41ff-4ba5-8240-29aed1a7c349" />

Added sticky navigation and hamburger menu for better usability on smaller screens.
