# HB Portal — Domain-Restricted Authentication

## Project Overview

HB Portal is a web-based authentication application built with Expo, React Native, and Firebase Authentication. It allows users to sign in with Google and restricts access to verified accounts using the official `@hbplus.fit` email domain.

**Live Deployment:** https://jovial-malabi-446a7c.netlify.app

**GitHub Repository:** https://github.com/Saurabhgera21/domain-auth-app

## Features

- Google sign-in using Firebase Authentication
- Restriction to verified `@hbplus.fit` email accounts
- Access-denied message for unauthorized accounts
- Protected dashboard
- Logout functionality
- Web deployment using Netlify
- Cross-platform project structure using Expo and React Native

## Technologies Used

- React Native
- Expo and Expo Router
- TypeScript
- Firebase Authentication
- Google OAuth sign-in
- Netlify

## Setup Instructions

### Prerequisites

Install the following:

- Node.js (LTS version recommended)
- npm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/Saurabhgera21/domain-auth-app.git
cd domain-auth-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Firebase

1. Create a project in the Firebase Console.
2. Register a web app in the Firebase project.
3. Enable Google as a sign-in provider under Authentication.
4. Add your local and deployed website domains to the authorized domains list.
5. Update `src/firebase.ts` with the Firebase configuration for your project.

Use your own Firebase project configuration. Never publish private service-account credentials or secret keys.

### 4. Run the application locally

```bash
npx expo start
```

To run the web version:

```bash
npx expo start --web
```

### 5. Build the web application

```bash
npx expo export --platform web
```

The generated static website files are placed in the `dist` directory.

## Authentication Flow

1. The user opens the HB Portal login page.
2. The user selects **Continue with Google**.
3. Firebase Authentication opens the Google sign-in flow.
4. The application receives the authenticated user information.
5. The application checks the user's email address, verification status, and email domain.
6. If the account satisfies the restrictions, access to the dashboard is permitted.
7. Otherwise, the user is signed out and shown an access-restricted message.
8. Authorized users can log out using the logout option.

## How Domain Restriction Works

The authentication logic is implemented in `src/auth.ts`.

The application checks that:

- The user has an email address.
- The email address is verified.
- The email belongs to the exact `hbplus.fit` domain.

For example:

- `employee@hbplus.fit` — eligible for access if verified.
- `employee@gmail.com` — rejected.
- `employee@otherdomain.com` — rejected.
- `employee@hbplus.fit.example.com` — rejected.

The application normalizes the email address and checks for an exact domain match. Unauthorized users are signed out.

The dashboard also checks the current authentication state and allowed email domain before displaying protected content.

## Deployment

The web application is deployed on Netlify.

**Live URL:** https://jovial-malabi-446a7c.netlify.app

To deploy a new version, generate a fresh web build and publish the contents of the `dist` directory using Netlify.

## Testing

The deployment and Google sign-in flow were tested using an unauthorized personal Gmail account. The application correctly displayed the access-restricted message.

A successful login with an authorized `@hbplus.fit` account requires access to a verified account from that domain.

## Author

Developed as an authentication and domain-restriction assignment.
