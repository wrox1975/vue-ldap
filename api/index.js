const express = require('express');
const bodyParser = require('body-parser');
const ldap = require('ldapjs');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(bodyParser.json());

const ldapClient = ldap.createClient({
  url: process.env.LDAP_URL,
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const searchOptions = {
    scope: 'sub',
    filter: `(sAMAccountName=${username})`
  };

  ldapClient.search(process.env.LDAP_SEARCH_BASE, searchOptions, (err, searchRes) => {
    if (err) return res.status(500).send(err);

    searchRes.on('searchEntry', (entry) => {
      const dn = entry.object.dn;
      ldapClient.bind(dn, password, (err) => {
        if (err) return res.status(401).send('Invalid credentials');
        res.send('Login successful');
      });
    });

    searchRes.on('end', (result) => {
      if (result.status !== 0) return res.status(500).send(result);
    });
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
