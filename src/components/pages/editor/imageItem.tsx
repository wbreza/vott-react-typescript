import React from 'react';

export default function ImageItem({item, onClick}) {
    return (
        <li className="list-group-item" key={item.id}>
            <a href={"#link" + (item.id + 1)}>
                <div className="card">
                    <img className="card-img-top" src={item.image} alt="Card image" onClick={() => onClick(item.image)}></img>
                    <div className="card-body">
                        <p className="card-text">Image 1    Tags: 2</p>
                    </div>
                </div>
            </a>
        </li>
    );
}