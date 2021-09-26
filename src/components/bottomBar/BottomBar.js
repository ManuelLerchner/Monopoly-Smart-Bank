import React, { useEffect } from "react";
import PlayerCard from "../playerCard/PlayerCard";

import "./BottomBar.css";

export default function BottomBar({ players }) {
    useEffect(() => {
        try {
            var elemsCarousell = document.querySelectorAll(".carousel");
            // eslint-disable-next-line no-undef
            M.Carousel.init(elemsCarousell, {
                dist: 0,
                padding: 100,
                numVisible: 10,
            });
        } catch (e) {}
    });

    let style = {
        transform: `translateX(${players.length % 2 === 0 ? 130 : 0}px)`,
    };

    return (
        <div className="stickBottom">
            <div id="bottomBar" className="carousel">
                <div style={style}>
                    {players.map((player) => {
                        return <PlayerCard key={player.id} player={player} />;
                    })}
                </div>
            </div>
        </div>
    );
}
