const express = require('express');
const router = express.Router();
const { getMasterData, getBowChartData, getFilteredScores } = require('../controllers/data');

router.get('/data', async (req, res, next) => {
  const data = await getMasterData();
  res.send(data);
});

router.get('/chart/bow', async (req, res, next) => {
  const data = await getBowChartData();
  res.send(data);
});

router.post('/student/score', async (req, res, next) => {
  const requestData = req.body;
  const data = await getBowChartData(requestData);
  res.send(data);
});

module.exports = router;
