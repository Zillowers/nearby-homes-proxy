const express = require('express');
const httpProxy = require('http-proxy');
const port = 8080;

const apiProxy = httpProxy.createProxyServer();
const serverOne = 'http://htlin.io';  //serves mortgage calculator
const serverTwo = 'http://sdcloadbalancer-369030579.us-east-1.elb.amazonaws.com';  //serves home description
const serverThree = 'http://52.15.91.9'; //serves image carousel
const serverFour = 'http://13.56.254.51'; //serves nearby homes

const app = express();
app.use('/homes/:id', express.static('./public') );

app.all("/homes/:id/prices", function(req, res) {
 apiProxy.web(req, res, {target: serverOne});
});

app.all("/homes/:id/detail-information", function(req, res) {
 apiProxy.web(req, res, {target: serverTwo});
});

app.all("/homes/:id/images", function(req, res) {
 apiProxy.web(req, res, {target: serverThree});
});

app.all("/homes/:id/nearbyHomes", function(req, res) {
 apiProxy.web(req, res, {target: serverFour});
});

app.listen(port, () => {
 console.log(`listening at ${port}`);
});