import React, { useEffect, useRef } from "react";

import "./LobbyScreen.css";

import { PlayerClass } from "../../Data/PlayerClass";

export default function AddPlayersForm({ setPlayers, setgameState }) {
    const nameRef = useRef();

    //Rerender Materialize on rerender
    useEffect(() => {
        try {
            var elemsCarousell = document.querySelectorAll(".carousel");
            var elemsForm = document.querySelectorAll("select");

            // eslint-disable-next-line no-undef
            M.Carousel.init(elemsCarousell, {
                dist: 0,
                padding: 100,
                numVisible: 10,
            });

            // eslint-disable-next-line no-undef
            M.updateTextFields();

            // eslint-disable-next-line no-undef
            M.FormSelect.init(elemsForm);
        } catch (e) {
            console.log();
        }
    });

    //Submit New Player Form
    const handleSubmit = (evt) => {
        evt.preventDefault();

        let name = nameRef.current.value;

        if (name === "") {
            return;
        }

        let length = 16;
        name =
            name.length > length ? name.substring(0, length - 3) + "..." : name;

        //Update PlayerList
        setPlayers((prevPlayers) => {
            const newPlayer = new PlayerClass(name, setPlayers);
            return [...prevPlayers, newPlayer];
        });

        nameRef.current.value = "";
    };

    return (
        <div className="row">
            <div className="col l4 offset-l4 m8 offset-m2 s12">
                <div className="card cardColor-lobby ">
                    <div className="card-content white-text">
                        {/*Title */}

                        <div className="section">
                            <div className="card-title light-blue-text text-lighten-2 center title">
                                Add Players
                            </div>
                        </div>

                        {/*Form */}

                        <div className="row">
                            <form onSubmit={handleSubmit}>
                                {/*Name  */}

                                <div className="row">
                                    {/*Icon  */}

                                    <div className="input-field col s12">
                                        <div className="col s1 input-field offset-s1">
                                            <i className="material-icons prefix">
                                                edit
                                            </i>
                                        </div>

                                        {/*Name Input  */}

                                        <div className="input-field col s6">
                                            <input
                                                id="icon_prefix"
                                                type="text"
                                                className="validate"
                                                autoComplete="off"
                                                ref={nameRef}
                                            />
                                            <label htmlFor="icon_prefix">
                                                Name
                                            </label>
                                        </div>

                                        {/*Add Player Button */}
                                        <div className="input-field col s3  ">
                                            <button
                                                className="btn waves-effect waves-light green"
                                                type="submit"
                                                name="action"
                                            >
                                                Add!
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>

                            {/*Start Game Button */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
