
# Crime Report App

The Crime Report App is a Next.js application that allows users to anonymously create crime reports, upload images, and submit additional details for analysis. The system uses Google Gemini (AI) for analyzing reports. Admins have access to a dashboard where they can manage report statuses, and users can track the progress of their reports.

This app leverages technologies like Prisma, Neon (PostgreSQL), Tailwind CSS, and more to provide a user-friendly experience and secure reporting system.

Features
User Reporting:

Users can submit crime reports with essential details like title, description, location, and image uploads.
Reports can be created anonymously.
Location can be set manually or using the built-in geolocation functionality.
AI Integration (Google Gemini):

All reports submitted by users are analyzed using Google Gemini (AI) for classification and further processing.
Admin Dashboard:

Admins have access to a dashboard to manage reports, including updating the status of each report.
Admin can track and categorize reports based on their analysis.
User Tracking:

Users can track the status of their submitted reports in real time.
Receive updates on the progress of their reports.
Database:

Data is stored securely in a PostgreSQL database powered by Neon.
Prisma ORM is used for easy and efficient database queries.
User Interface:

Styled using Tailwind CSS to provide a clean and responsive design.
Technologies Used
Next.js: Framework for building server-side rendered React applications.
Prisma: ORM for database interactions.
Neon Database (PostgreSQL): Cloud-native PostgreSQL database for storing report data.
Tailwind CSS: Utility-first CSS framework for styling the application.
Google Gemini (AI): Used for analyzing and categorizing crime reports.
Leaflet: JavaScript library for interactive maps (used for location-based reports).
Axios: For making API requests.
Installation
To run this project locally, follow these steps:

Clone the repository:

bash
Copy code
git clone https://github.com/vi3318/crime-report-app.git
cd crime-report-app
Install the dependencies:

bash
Copy code
npm install
Set up environment variables in a .env file in the root of the project. You will need to add the following:

makefile
Copy code
DATABASE_URL="Your Neon PostgreSQL connection string"
GOOGLE_API_KEY="Your Google Gemini API key"
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="Your Google Maps API Key" (if using maps)
Run the application:

bash
Copy code
npm run dev
The app will now be running at http://localhost:3000.

Project Structure
Copy code
├── components/          # React components (e.g., Map, LocationInput, ReportForm)
├── pages/               # Next.js pages (API routes, public views, etc.)
│   ├── api/             # Backend API routes
│   ├── dashboard/       # Admin dashboard pages
│   └── index.tsx        # Main landing page for users to submit reports
├── prisma/              # Prisma database models
│   └── schema.prisma    # Database schema file
├── public/              # Static files (images, assets, etc.)
├── styles/              # Tailwind CSS custom styles
├── .env                 # Environment variables
├── next.config.js       # Next.js configuration
├── package.json         # Project dependencies and scripts
└── README.md            # Project documentation
Usage
User Flow
The user lands on the main page and can fill out a report form, including the crime title, description, and location.
The user can choose to upload an image related to the crime report.
After submitting the report, the app sends the data to the backend for storage and analysis by Google Gemini AI.
The user will be provided with a unique report ID to track the progress of their report.
Admin Dashboard
Admins can log in to access the dashboard, which lists all submitted reports.
Admins can update the status of each report (e.g., Pending, In Progress, Resolved).
Admins can view detailed information about each report and monitor the progress of the AI analysis.
Report Tracking (for Users)
Users can track the status of their submitted report by entering their report ID.
The user will see an updated status and any comments from the admin or AI analysis results.
Deployment
This application can be deployed to Vercel (or any other platform of your choice) for both frontend and backend.

Deployment to Vercel
Push the code to your GitHub repository.
Connect the repository to Vercel.
Set up environment variables in Vercel to match the ones used locally (DATABASE_URL, GOOGLE_API_KEY, etc.).
Deploy your application.
Contributing
If you'd like to contribute to this project, feel free to fork the repository and submit pull requests. Please ensure that your changes adhere to the project's coding style and include tests where applicable.

License
This project is licensed under the MIT License.

Notes:
Make sure you replace placeholders like "Your Neon PostgreSQL connection string", "Your Google Gemini API key", etc., with your actual values.
You can adjust any part of the README based on your app's specific features or setup.
