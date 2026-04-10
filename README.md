# Future-Self Mentor

An interactive React application that allows you to interface with a simulated mentor from your future. Built using Vite, React, and Vanilla CSS.

## Features
- **Dynamic Interaction Timeline**: Jump through eras of your life (Now, Year +2, Year +5, Year +10). The dashboard immediately reacts by updating your profile picture to an older variant, elevating your confidence score, and showing your delta in net worth.
- **Neural Oracle Check-In**: A custom chat bot interface dynamically driven by the onboarding goals that you defined. It answers questions using keyword targeting to offer thoughtful simulation advice.
- **Neon Glassmorphism Aesthetic**: The interface uses extensive backdrop filtering, dynamic blurs, and neon glows to give an immersive cyberpunk / futuristic advisor feel entirely implemented in Vanilla CSS.

## How to Run locally

### Quick Start (VS Code)
If you are using Visual Studio Code, you can start the application with a single click:
1. Open up the `future-self-app` folder inside VS Code.
2. Press `F5` on your keyboard (or click **Run -> Start Debugging**).
3. VS Code will automatically start the background server and pop open your browser.

### Manual Start
1. Ensure Node.js is installed.
2. Open a terminal inside the `future-self-app` directory.
3. Run `npm install` just to be certain dependencies are there.
4. Run `npm run dev`.
5. Open your browser and go to `http://localhost:5173/`.

## Architecture Details
- `/src/App.jsx`: Holds the primary timeline logic, mock state transitions, chat interactions, and routing views.
- `/src/index.css`: Contains the raw compiled Vanilla CSS tokens designed to match the original Tailwind layout footprint.
- `/public/`: Stores all auto-generated AI portraits for timeline avatars.
# Future-Self-Ai
