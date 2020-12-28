var express = require('express');
var router = express.Router();

const stg = require('../../settings.json')
var pgp = require('pg-promise')(/* options */)
var db = pgp('postgres://' + stg['postgresql']['login'] + ':' + stg['postgresql']['password'] + '@' + stg['postgresql']['host'] + ':' + stg['postgresql']['port'] + '/' + stg['postgresql']['database']);
const fetch = require('node-fetch');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'StopDropshipping' });
});

/* GET FAQ page. */
router.get('/faq', function(req, res, next) {
  res.render('faq', { title: 'StopDropshipping' });
});

/* GET Contact page. */
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'StopDropshipping' });
});

/* GET product page. */
router.get('/product/:productURL', function(req, res, next) {
  var data = [];
  try {
    url = new URL(req.params['productURL']);
    data.existSite = true;
    data.url = url;
    db.one('SELECT * FROM sites WHERE URL = $1', url.host)
    .then(function (data) {
      console.log('DATA:', data);
    })
    .catch(function (error) {
      data.existSite = false;
    })
    data.logo = 'https://www.google.com/s2/favicons?domain=' + url.host;
    (async () => {
      const response = await fetch(url + '.json');
      const json = await response.json();
      console.log(json);
    })();

    
  } catch(err) {
    url = "URL invalide, veuillez <a href='/' style='color: purple; text-decoration: none;'>recommencer ici</a>";
    console.log(err)
  }
  console.log(data);
  // db.one('INSERT INTO sites(URL, NAME, DROPSHIPPING, LOGO) VALUES ($1, $2, $3, $4)', url.host, url.host.split('.')[0], dropshipping, logo)
  res.render('product', { title: 'StopDropshipping', product: url});
});


module.exports = router;
