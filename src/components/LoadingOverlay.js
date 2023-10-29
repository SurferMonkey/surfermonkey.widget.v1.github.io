import React from 'react';
import '../styles/Loading.css';
import loadingImage from '../Images/loadingGif2.gif';

const LoadingOverlay = ({ isLoading, loadingText }) => {
    return (
        <div
            className={`loading-overlay${isLoading ? ' active' : ''}`}
            style={{ display: isLoading ? 'flex' : 'none' }}
        >
            <img
                className="loading-image"
                src={loadingImage}
                alt="Loading"
            />
            <div className="loading-text" dangerouslySetInnerHTML={{ __html: loadingText }} />
        </div>
    );
};

export default LoadingOverlay;
