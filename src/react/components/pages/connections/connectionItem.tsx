import React from "react";
import { NavLink } from "react-router-dom";

export default function ConnectionItem({ item, onClick, onDelete }) {
    return (
        <li onClick={(e) => onClick(e, item)}>
            <NavLink to={`/connections/${item.id}`}>
                <i className="fas fa-edit"></i>
                <span className="px-2">{item.name}</span>
                <div className="float-right" onClick={(e) => onDelete(e, item)}><i className="fas fa-trash"></i></div>
            </NavLink>
        </li>
    );
}
