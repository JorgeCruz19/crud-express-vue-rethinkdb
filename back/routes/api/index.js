const express = require('express');
const router = express.Router();

const snippetsRoutes = require('./snippets');

router.use("/", snippetsRoutes);


module.exports = router;