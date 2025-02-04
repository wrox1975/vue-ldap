import express from "express";
import ldap from "ldapjs";

const router = express.Router();

// Define routes
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Create the client
  const ldapClient = ldap.createClient({
    url: process.env.LDAP_URL,
    // For example: "ldap://my-ldap-host:389"
  });

  // Catch connection-level errors like ECONNREFUSED
  ldapClient.on("error", (err) => {
    console.error("LDAP connection error:", err.message);
    return res.status(500).send("LDAP connection failed");
  });

  // Depending on your environment, you might do:
  // let userDN = `${username}@reconext.com`;            // UPN form
  // or let userDN = `reconext\\${username}`;            // DOMAIN\username form
  // or a fully distinguished name if you already know it.

  const userDN = `${username}@reconext.com`; // Adjust as needed for your domain

  // Attempt to bind with the user's credentials
  ldapClient.bind(userDN, password, (err) => {
    if (err) {
      console.error("User bind error:", err);
      return res.status(401).send("Invalid credentials");
    }

    // If we get here, the bind succeeded → credentials are valid
    return res.send("Login successful");
  });
});

export { router as userRoutes };
