const express = require("express");
const router = express.Router();
const campaignController = require("../controllers/campaignController");

const authMiddleware = require('../middleware/authMiddleware');

router.post("/createCampaign", authMiddleware, async (req, res) => {
    try {
        const result = await campaignController.createCampaign(req.body, req.user.userId);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message || "Server Error" });
    }
});

router.get("/getCampaignList", authMiddleware, async (req, res) => {
    try {
        const result = await campaignController.getCampaigns(req.user.userId);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message || "Server Error" });
    }
});

router.get("/getCampaignDetails/:id", authMiddleware, async (req, res) => {
    try {        
        const result = await campaignController.getCampaignDetails(req.user.userId, req.params.id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message || "Server Error" });
    }
});

module.exports = router;