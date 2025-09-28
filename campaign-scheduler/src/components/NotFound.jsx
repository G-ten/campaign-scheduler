import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div>
            <div className="container">
                <div className="row pt-4">
                    <div className="col-sm-12 mt-5">
                        <div className="col-sm-10 col-sm-offset-1 mx-auto text-center">
                            <div className="four_zero_four_bg">
                                <h1 className="text-center">404</h1>
                            </div>
                            <div className="contant_box_404">
                                <h3 className="h2">
                                    Look like you're lost
                                </h3>
                                <p>The page you are looking for not found!</p>
                                <Link to={'/'} className="link_404">Go to Home</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default NotFoundPage;