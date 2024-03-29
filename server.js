const express = require('express');
const app = express();
const ssl_certificate = require('get-ssl-certificate');

app.get('/getCertificateExpiration', (req, res) => {
    const domain = req.query.domain;
    console.log("server: " + domain);

    res.setHeader('Access-Control-Allow-Origin', '*');

    if(!domain || domain === "undefined") {
        return res.status(400).json({error: 'Domain param required!'});
    }

    ssl_certificate.get(domain).then((certificate) => {
        const expirationDate = certificate.valid_to;
        console.log('Domain: ' + domain + '\n' + 'Expiration Date: ' + expirationDate + '\n');
        return res.json({domain, expirationDate});
    }).catch((err) => {
        console.log(err);
        return res.status(500).json({error: 'Domain param required!'});
    })
})

const port = 3000;

app.listen(port, () => {
    console.log('server is running in port ' + port);
})