var express = require('express');
var router = express.Router();

const stg = require('../../settings.json')
var pgp = require('pg-promise')(/* options */)
var db = pgp('postgres://' + stg['postgresql']['login'] + ':' + stg['postgresql']['password'] + '@' + stg['postgresql']['host'] + ':' + stg['postgresql']['port'] + '/' + stg['postgresql']['database']);
const axios = require("axios");

/* GET home page. */
router.get('/', function(req, res, next) {
  db.any('SELECT * FROM public.sites WHERE dropshipping = true').then(data => {
    res.render('index', { title: 'StopDropshipping', data: data});
  }).catch(error => {
    console.log(error);
  });
  
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
    data.url = url;
    data.logo = 'https://s2.googleusercontent.com/s2/favicons?domain_url=' + url.host;
    db.one('SELECT * FROM public.sites WHERE URL = $1', url.host)
    .then(function (data) {})
    .catch(function (error) {
      db.one('INSERT INTO public.sites(URL, NAME, DROPSHIPPING, LOGO) VALUES ($1, $2, $3, $4)', [url.host, url.host.split('.')[0], false, data.logo]).then(data => {}).catch(error => {});
    })
    axios.get(url + ".json")
         .then((response)=>{
           data.image = response.data.product.image.src
           data.aliseeks = "https://www.aliseeks.com/search/image?aref=undefined&av=1.0.0.4&imageurl=" + data.image;
           db.one('UPDATE public.sites SET DROPSHIPPING = true WHERE URL = $1', url.host).then(data => {}).catch(error => {});
           db.one('INSERT INTO public.products(URL_PRODUCT, URL, IMAGE, ALISEEKS) VALUES ($1, $2, $3, $4)', [data.url.href, url.host, data.image, data.aliseeks]).then(data => {}).catch(error => {});
         }).catch((error)=>{
           data.image = "error";
         }).then(function () {
          res.render('product', { title: 'StopDropshipping', data: data});
        });;
  
  } catch(err) {
    url = "URL invalide, veuillez <a href='/' style='color: purple; text-decoration: none;'>recommencer ici</a>";
    console.log(err)
  }
});


module.exports = router;
