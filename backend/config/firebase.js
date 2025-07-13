require("dotenv").config();
const admin = require("firebase-admin");
// const serviceAccount = require("../serviceAccountKey.json");

const raw = process.env.GOOGLE_CREDENTIALS;
// const raw = JSON.stringify(serviceAccount);
if (!raw) throw new Error("GOOGLE_CREDENTIALS missing");

const credentials = JSON.parse(raw);
credentials.private_key = credentials.private_key.replace(/\\n/g, "\n");

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

const db = admin.firestore(); // Nếu bạn dùng Firestore
module.exports = { admin, db };
