import React, { useEffect, useRef, useState } from 'react'
import CampaignCard from '../components/CampaignCard'
import { getCampaigns } from '../api/api';
import { toast } from 'react-toastify';

const Dashboard = () => {

    const [campaignList, setCampaignList] = useState([]);
    const hasFetched = useRef(false);

    useEffect(() => {
        if (!hasFetched.current) {
            getCampaignsList();
            hasFetched.current = true;
        }
    }, [])

    const getCampaignsList = async () => {
        try {
            const response = await getCampaigns();
            if (response && response.data && response.data.success) {
                setCampaignList(response.data.campaigns);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error);
        }
    }

    return (
        <div className='container py-5 px-4'>
            <div className='row'>
                <div className='col-12 col-sm-10 col-md-6 col-lg-4 col-xxl-3 mx-auto mx-md-0 mb-4'>
                    <CampaignCard isAddCampaign={true} ></CampaignCard>
                </div>
                {campaignList && campaignList.length >= 1 && campaignList.map((campaign) => (
                    <div key={campaign._id} className='col-12 col-sm-10 col-md-6 col-lg-4 col-xxl-3 mx-auto mx-md-0 mb-4'>
                        <CampaignCard campaign={campaign}></CampaignCard>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Dashboard
