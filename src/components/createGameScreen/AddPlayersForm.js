import React, { useEffect, useRef } from "react";

import "./AddPlayersForm.css";

import { PlayerClass } from "../../Data/PlayerClass";

export default function AddPlayersForm({ setPlayers, setgameState }) {
    const nameRef = useRef();
    const iconRef = useRef();

    //Rerender Materialize on rerender
    useEffect(() => {
        try {
            var elemsCarousell = document.querySelectorAll(".carousel");
            var elemsForm = document.querySelectorAll("select");

            // eslint-disable-next-line no-undef
            M.Carousel.init(elemsCarousell, {
                dist: 0,
                padding: 100,
                numVisible: 10
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
        let icon = iconRef.current.options[iconRef.current.selectedIndex].value;

        if (name === "") {
            return;
        }

        if (icon === "empty") {
            return;
        }

        let length = 16;
        name =
            name.length > length ? name.substring(0, length - 3) + "..." : name;

        //Update PlayerList
        setPlayers((prevPlayers) => {
            const newPlayer = new PlayerClass(name, icon);
            return [...prevPlayers, newPlayer];
        });

        nameRef.current.value = "";
    };

    //Start Game Button
    const startGame = () => {
        setgameState("main");
    };

    return (
        <div className="row">
            <div className="col l4 offset-l4 m8 offset-m2 s12">
                <div className="card blue-grey darken-3 transparent1 ">
                    <div className="card-content white-text">
                        {/*Title */}

                        <div className="section">
                            <div className="card-title orange-text center">
                                Add Players!
                            </div>
                        </div>

                        {/*Form */}

                        <div className="row">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="input-field col s12">
                                        {/*Icon  */}

                                        <div className="col s1 input-field offset-s1">
                                            <i className="material-icons prefix">
                                                sentiment_satisfied
                                            </i>
                                        </div>

                                        {/*Select Icon  */}
                                        <div className="input-field col s6">
                                            <select
                                                className="icons "
                                                defaultValue="empty"
                                                ref={iconRef}
                                            >
                                                <option value="empty" disabled>
                                                    Choose Icon
                                                </option>
                                                <option
                                                    value="A"
                                                    data-icon="images/sample-1.jpg"
                                                >
                                                    A
                                                </option>
                                                <option
                                                    value="B"
                                                    data-icon="images/office.jpg"
                                                >
                                                    B
                                                </option>
                                                <option
                                                    value="C"
                                                    data-icon="images/yuna.jpg"
                                                >
                                                    C
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

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
                                                ref={nameRef}
                                            />
                                            <label htmlFor="icon_prefix">
                                                Name
                                            </label>
                                        </div>

                                        {/*Add Player Button */}
                                        <div className="input-field col s3 ">
                                            <button
                                                className="btn waves-effect waves-light"
                                                type="submit"
                                                name="action"
                                            >
                                                Add Player!
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>

                            {/*Start Game Button */}

                            <div className="row">
                                <div className="input-field col s3 offset-s1">
                                    <button
                                        className="btn waves-effect waves-light orange darken-3 startButton"
                                        type="submit"
                                        name="action"
                                        onClick={startGame}
                                    >
                                        Start Game!
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
