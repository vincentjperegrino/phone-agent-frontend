# Retell SDK Integration Guide

## Get Started

Follow these steps to set up and use the Retell SDK in your project.

### 1. Replace Placeholders
Replace the placeholders `agentId` and `apiKey` in your code with your actual Retell API credentials. You can find your API key and create an agent in the [Retell Dashboard](https://dashboard.retellai.com/).

```javascript
const agentId = "YOUR_AGENT_ID";
const apiKey = "YOUR_KEY";
```

### 2. Install Dependencies
Run the following command to install all necessary dependencies:

```bash
npm install
```

### 3. Start the Application
Start your application with the following command:

```bash
npm run dev
```

## Notes
- Make sure you have the correct API key and agent ID from the Retell Dashboard.
- Ensure your network and browser allow WebSocket connections for the Retell SDK to function properly.