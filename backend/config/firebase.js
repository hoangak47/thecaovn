const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json"); // đường dẫn tới file JSON

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://thecaovn-70267.firebaseio.com", // Nếu bạn dùng Realtime Database
});

const db = admin.firestore(); // Nếu bạn dùng Firestore
module.exports = { admin, db };
