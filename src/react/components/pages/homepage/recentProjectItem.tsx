import React from "react";

export default function RecentProjectItem({ item, onClick, onDelete }) {
    return (
        <li>
            <a onClick={(e) => onClick(e, item)}>
                <i className="fas fa-folder-open"></i>
                <span className="px-2">{item.name}</span>
                <div className="float-right" onClick={(e) => onDelete(e, item)}><i className="fas fa-trash"></i></div>
            </a>
        </li>
    );
}
