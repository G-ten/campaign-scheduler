import React, { useEffect, useRef, useState } from 'react'
import { getCampaignById } from '../api/api';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const CampaignDetail = () => {

    const [campaign, setCampaign] = useState({});
    const hasFetched = useRef(false);
    const { id } = useParams();

    useEffect(() => {
        if (!hasFetched.current) {
            getCampaign();
            hasFetched.current = true;
        }
    }, [])

    const getCampaign = async () => {
        try {
            const response = await getCampaignById(id);
            if (response && response.data && response.data.success) {
                setCampaign(response.data.campaign);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error);
        }
    }

    return (
        <div className="container py-4">
            <div className="card shadow p-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h4 className="card-title">{campaign.title}</h4>
                    <span className={`badge fs-6 py-2 text-capitalize ${campaign.status === "pending" ? "bg-warning text-dark" : "bg-success"}`}>
                        {campaign.status}
                    </span>
                </div>
                <p>{campaign.message}</p>
                <p><span className='fw-bold'>Scheduled:</span> {new Date(campaign.scheduledTime).toLocaleString()}</p>
                <h5 className='mb-3'>Recipients:</h5>
                <div className="row">
                    {campaign.recipients && campaign.recipients.length > 0 ? campaign.recipients.map((recipient) => (
                        <div key={recipient.email} className="col-12 col-md-6 col-lg-4 col-xxl-3 mb-4">
                            <div className="card h-100 shadow-sm">
                                <div className="card-body">
                                    <h6 className="card-subtitle mb-2">{recipient.name}</h6>
                                    <p className="card-text">{recipient.email}</p>
                                    <span
                                        className={`badge text-capitalize ${recipient.status === "sent"
                                            ? "bg-success"
                                            : recipient.status === "pending"
                                                ? "bg-warning text-dark"
                                                : "bg-danger"
                                            }`}
                                    >
                                        {recipient.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )) : <span>No recipients found</span>}
                </div>
            </div>
        </div>
    )
}

export default CampaignDetail