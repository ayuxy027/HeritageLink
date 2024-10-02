# Simple Supabase Auth Setup Checklist for Hackathons

## 1. Project Setup
- [x] Create project in Supabase dashboard
- [x] Note down Project URL and public anon key

## 2. Environment Setup
- [x] Create `.env.local` file in your project root
- [x] Add Supabase URL and anon key to `.env.local`:
  ```
  NEXT_PUBLIC_SUPABASE_URL=your_project_url
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your_public_anon_key
  ```

## 3. Supabase Client Setup
- [x] Install Supabase JS client: `npm install @supabase/supabase-js`
- [x] Create `utils/supabase.js` with:
  ```javascript
  import { createClient } from '@supabase/supabase-js'

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  export const supabase = createClient(supabaseUrl, supabaseAnonKey)
  ```

## 4. Authentication Setup
- [x] Enable Email auth in Supabase dashboard (Authentication > Providers > Email)
- [x] Set up Google OAuth (if using):
  - Create credentials in Google Cloud Console
  - Add Client ID and Secret to Supabase (Authentication > Providers > Google)

## 5. Email Templates (Optional but Recommended)
- [x] Customize Confirm Signup email template in Supabase dashboard

## 6. Frontend Implementation
- [ ] Implement sign-up functionality
- [ ] Implement sign-in functionality
- [ ] Implement sign-out functionality
- [ ] Add email confirmation flow (if using)
- [ ] Add Google sign-in button (if using Google OAuth)

## 7. Basic Testing
- [ ] Test user registration
- [ ] Test user login
- [ ] Test user logout
- [ ] Test email confirmation (if implemented)
- [ ] Test Google sign-in (if implemented)

## 8. Error Handling
- [ ] Add basic error messages for auth failures

Remember: For a hackathon, focus on getting the core functionality working. You can always enhance security and add more features later!