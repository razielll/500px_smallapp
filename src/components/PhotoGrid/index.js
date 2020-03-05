import React from 'react';
import './style.css';


const PhotoGrid = ({ photos }) => {
    return photos.map((photo, i) => (
        <div onClick={() => this.handleModal(photo.id)} className="img-wrapper" key={Math.random() + i}>
            <div className="rating">{photo.rating}⭐</div>
            <img className="img-resp" src={photo.image_url} alt={photo.name} title={photo.name} />
            <div className="user-info"><img src={photo.user.userpic_https_url} height="32" width="32" /> {photo.user.username} </div>
        </div>
    ));
};

export default PhotoGrid;
