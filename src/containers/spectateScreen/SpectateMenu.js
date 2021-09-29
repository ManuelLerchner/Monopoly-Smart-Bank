import React, { useEffect, useRef, useState } from "react";
import { PlayerClass } from "../../Data/PlayerClass";

import "./SpectateMenu.css";

import Messages from "../../Socket/Messages";

export default function SpectateMenu({ socket, gameID }) {
    const [listeningID, setListeningID] = useState("/");

    //Rerender Materialize on rerender
    useEffect(() => {
        setTimeout(() => {
            // eslint-disable-next-line no-undef
            M.updateTextFields();
        }, 1000);
    });

    const submitForm = (e) => {
        e.preventDefault();

        setListeningID(e.target[0].value);

        socket.emit("changeRoom", e.target[0].value);

        e.target[0].value = "";
    };

    const simulateMessage = () => {
        socket.emit("message", { groupID: gameID, value: "Test message" });
    };

    return (
        <>
            <div class="row">
                <div className="col l8 offset-l2 m8 offset-m2 s12 ">
                    <div className="card cardColor-main">
                        <div className="card-content white-text">
                            <div className="row  ">
                                <div className="col l10 offset-l1 ">
                                    <h4>{"Game ID: " + gameID}</h4>
                                    <h4>{"Listening ID: " + listeningID}</h4>
                                    <div class="row">
                                        {socket ? (
                                            <Messages
                                                listeningID={listeningID}
                                                socket={socket}
                                            />
                                        ) : (
                                            <p>Socket not connected</p>
                                        )}
                                    </div>
                                    <form class="col s12" onSubmit={submitForm}>
                                        <div class="input-field col s6">
                                            <input
                                                id="icon_prefix"
                                                type="text"
                                            />
                                            <label for="icon_prefix">
                                                First Name
                                            </label>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <a
                href="#!"
                class="btn-floating btn-large waves-effect waves-light red"
                onClick={simulateMessage}
            >
                <i class="material-icons">add</i>
            </a>
        </>
    );
}
