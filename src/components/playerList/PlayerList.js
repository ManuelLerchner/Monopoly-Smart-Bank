import React from "react";

import "./PlayerList.css";

export default function PlayerList({ players, type, callback }) {
    const click = (player) => () => {
        if (callback !== undefined) {
            callback(player);
        }
    };
    return (
        <form action="#" className="playerList">
            {players.map((player, i) => (
                <div
                    className="row centerRow  "
                    key={player.id + type}
                    onClick={click(player)}
                >
                    <div className="col l8 offset-l1">
                        <label>
                            <div className={"textPart " + type}>
                                <input
                                    name={type}
                                    type="radio"
                                    value={player.id}
                                />
                                <span className="name">{player.name}</span>
                            </div>
                        </label>
                    </div>
                    <div className="col l4">
                        <img
                            className="iconSmall hide-on-med-and-down"
                            src={player.img}
                            alt="Avatar"
                            onClick={click(player)}
                        />
                    </div>
                </div>
            ))}
        </form>
    );
}
