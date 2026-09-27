// This code runs securely on Vercel's cloud servers, not the browser!
export default function handler(request, response) {
  // Grab a name sent from the frontend user, or default to "Guest"
  const { name = 'World' } = request.query;

  // This is where you would normally write to a database!
  const serverTimestamp = new Date().toISOString();

  // Send back a secure JSON response from the server
  response.status(200).json({
    message: `Hello ${name} from your secure Vercel Backend!`,
    time: serverTimestamp,
    serverStatus: "Online & Functional"
  });
}
