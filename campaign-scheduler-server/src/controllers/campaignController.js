const campaignSchema = require("../models/campaign");

module.exports = {

    async createCampaign(campaignData, userId) {
        try {
            const campaign = new campaignSchema({
                user: userId,
                title: campaignData.title,
                message: campaignData.message,
                scheduledTime: campaignData.scheduledTime,
                recipients: campaignData.recipients
            })

            await campaign.save();

            return { success: true, message: "Campaign created successfully" };
        } catch (error) {
            return { success: false, message: error.message };
        }
    },

    async getCampaigns(userId) {
        try {
            const campaigns = await campaignSchema.find({ user: userId });

            return { success: true, campaigns };
        } catch (error) {
            return { success: false, message: error.message };
        }
    },

    async getCampaignDetails(userId, campaignId) {
        try {
            const campaign = await campaignSchema.findOne({
                _id: campaignId,
                user: userId
            });

            return { success: true, campaign };
        } catch (error) {
            return { success: false, message: error.message };
        }
    },
}