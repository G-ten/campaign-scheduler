const cron = require("node-cron");
const campaignSchema = require("../models/campaign");
const { sendMail } = require("../services/mailService");

module.exports = {
    startScheduler() {
        cron.schedule("*/30 * * * * *", async () => {
            try {
                const now = new Date();
                const dueCampaigns = await campaignSchema.find({ status: "pending", scheduledTime: { $lte: now } });

                for (const campaign of dueCampaigns) {
                    await Promise.all(
                        campaign.recipients.map(async (recipient) => {
                            try {
                                await sendMail(recipient.email, campaign.title, campaign.message);
                                recipient.status = "sent";
                            } catch (err) {
                                recipient.status = "failed";
                                recipient.error = err.message;
                            }
                        })
                    );

                    campaign.markModified("recipients");
                    campaign.status = "completed";
                    await campaign.save();
                }
            } catch (err) {

            }
        });
    }
};