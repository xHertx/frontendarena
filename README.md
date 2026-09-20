# Frontend Arena - EchoesApp

This repository contains the **EchoesApp**, a React application built with Vite for the Frontend Arena hackathon/project.

## Deploying to Vercel

Since the frontend application is located inside the `EchoesApp` directory, you will need to specify the **Root Directory** when importing this repository into Vercel.

**Steps to deploy:**
1. Log in to [Vercel](https://vercel.com/) and click **Add New... > Project**.
2. Import the `frontendarena` repository from your GitHub account.
3. In the **Configure Project** section, look for the **Root Directory** setting.
4. Click **Edit** and select the `EchoesApp` folder.
5. Vercel will automatically detect that it's a Vite project. The default Build Command (`npm run build`) and Output Directory (`dist`) are correct.
6. Click **Deploy**.

## Running Locally

To run this project locally on your machine:

1. Navigate to the app directory:
   ```bash
   cd EchoesApp
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Tech Stack
- React
- Vite
- JavaScript / CSS
