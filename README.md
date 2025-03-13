Wander Wise - AI Travel Planner

Wander Wise is an AI-powered travel planner that creates personalized itineraries based on user preferences. It simplifies travel planning by providing hotel recommendations and detailed day-wise plans tailored to the user's budget, destination, and group size.

Features

- AI-Powered Itinerary Generation: Uses Gemini AI to generate personalized travel plans.

- Google OAuth Sign-In: Secure authentication via Google.

- Hero Page: Features a dynamic image carousel and branding.

- Create Trip Page: Collects user details such as:

  - Destination

  - Number of days

  - Budget

  - Number of people

- View Trip Page: Displays the AI-generated trip itinerary.

- Trip History: Shows all previously generated trips.

- Hotel Recommendations: Provides accommodation options based on the user's budget.

- Interactive Map: Uses GoMaps for location-based visualization.

- Image Integration: Fetches destination images from Unsplash.

Tech Stack

- Frontend: React, Vite, Tailwind CSS, Material UI

- Backend & Database: Firebase Firestore

- AI Service: Gemini AI

- Authentication: Google OAuth

- APIs & Libraries:

- Axios for API requests

- React Router for navigation

- Unsplash API for images

- GoMaps API for maps and location-based data

Installation & Setup

1. Clone the repository

   git clone https://github.com/your-username/wander-wise.git
   cd wander-wise

2. Install dependencies

   npm install

3. Create a .env file and add your API keys:

   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_UNSPLASH_ACCESS_KEY=your_unsplash_access_key
   VITE_GOOGLE_OAUTH_CLIENT_ID=your_google_oauth_client_id

4. Run the application

   npm run dev

Usage

- Sign in using Google OAuth.

- Create a trip by entering details such as destination, budget, and duration.

- View the AI-generated itinerary with hotel recommendations and planned activities.

- Access past trips via the Trip History page.
