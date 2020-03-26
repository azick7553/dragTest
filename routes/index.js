var express = require('express');
var router = express.Router();

var db = require('../queries');


router.get('/api/navigation', db.getSingleNavigation);
router.get('/api/links/:id', db.getLink);
router.post('/api/links', db.createLink);
router.put('/api/links/:id', db.updateLink);
router.delete('/api/links/:id', db.removeLink);


module.exports = router;