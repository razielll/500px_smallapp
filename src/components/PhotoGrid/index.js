import React from 'react';
import './style.css';


// We desctructure the things we need from the 'props' passed into the function
const PhotoGrid = ({ photos, current_page, total_pages, handleNextPage, handlePrevPage, handleModal }) => {
    return (
        <>
            <div className="images-container">
                {photos.map((photo, i) => (
                    <div onClick={() => handleModal(photo.id)} className="img-wrapper" key={Math.random() + i}>
                        <div className="rating">{photo.rating}⭐</div>
                        <img className="img-resp" src={photo.image_url} alt={photo.name} title={photo.name} />
                        <div className="user-info"><img src={photo.user.userpic_https_url} height="32" width="32" /> {photo.user.username} </div>
                    </div>
                ))}
            </div>

            <div className="btns-wrapper">

                {current_page > 1 &&
                    <div className="btn-wrapper">
                        <button className="btn prev-btn" onClick={handlePrevPage}>Back</button>
                    </div>
                }

                {current_page < total_pages &&
                    <div className="btn-wrapper first">
                        <button className="btn next-btn" onClick={handleNextPage}>Next</button>
                    </div>
                }
            </div>
            {current_page >= 1 && total_pages >= 1 && <p>Page {current_page} of {total_pages}</p>}
        </>
    )
};

export default PhotoGrid;
