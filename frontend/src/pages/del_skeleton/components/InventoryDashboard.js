import React from 'react';

const InventoryDashboard = () => {
    return (
        <>
        <div className="d-flex">
            <div className="card text-dark bg-light mb-3 col-2 ms-3" >
                <div className="card-header text-center">PC</div>
                <div className="card-body text-center">
                    <h1>12</h1>
                </div>
            </div>

            <div className="card text-dark bg-light mb-3 col-2 ms-3" >
                <div className="card-header text-center">NB</div>
                <div className="card-body text-center">
                    <h1>67</h1>
                </div>
            </div>

            <div className="card text-dark bg-light mb-3 col-2 ms-3" >
                <div className="card-header text-center">PBWN</div>
                <div className="card-body text-center">
                    <h1>109</h1>
                </div>
            </div>

            <div className="card text-dark bg-light mb-3 col-2 ms-3" >
                <div className="card-header text-center">PCN</div>
                <div className="card-body text-center">
                    <h1>109</h1>
                </div>
            </div>
        </div>
        </>
    );
};

export default InventoryDashboard;