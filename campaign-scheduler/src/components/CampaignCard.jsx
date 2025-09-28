import React from 'react'
import { Link } from 'react-router-dom';

const CampaignCard = ({ campaign, isAddCampaign }) => {
    return (
        <Link to={isAddCampaign ? '/create-campaign' : `/campaign/${campaign && campaign._id}`} className='w-100 h-100'>
            {isAddCampaign ?
                <h5 className='d-flex align-items-center justify-content-center h-100 w-100 card shadow border-0 py-5'>
                    Add Campaign
                </h5>
                :
                <div className="card shadow border-0 h-100">
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                            <h5 className="card-title text-break">{campaign.title}</h5>
                            <span className={`badge py-2 ms-2 text-capitalize ${campaign.status === "pending" ? "bg-warning text-dark" : "bg-success"}`}>
                                {campaign.status}
                            </span>
                        </div>
                        <p className="card-text text-muted overflow-ellipsis fs-6">{campaign.message}</p>
                        <div className="d-flex align-items-center text-muted small">
                            <span className='small fw-medium text-dark me-1'>Scheduled:</span>
                            <span className='small fw-medium'>{new Date(campaign.scheduledTime).toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            }
        </Link>
    )
}

export default CampaignCard;