import React from "react";

export default function PlayerRow({ role, player }) {
    return (
        <div className="row centerRow ">
            <div className="col l8 offset-l1">
                <label>
                    <div className={role}>
                        <input name={role} type="radio" value={player.id} />
                        <span className="name">{player.name}</span>
                    </div>
                </label>
            </div>

            <img
                className="iconSmall hide-on-med-and-down"
                src={player.img}
                alt="Avatar"
            />
        </div>
    );
}
