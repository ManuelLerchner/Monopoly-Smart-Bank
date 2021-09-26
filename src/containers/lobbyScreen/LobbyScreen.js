import React, { useEffect, useRef, useState } from "react";

import "./LobbyScreen.css";

import { PlayerClass } from "../../Data/PlayerClass";
import { loadBuildingData, loadPropertyData } from "../../Data/loadGameData";

export default function LobbyScreen({
    setPlayers,
    startMoney,
    setBuildings,
    setAvailableProperties,
    setBank,
}) {
    const nameRef = useRef();
    const [pressCounter, setPressCounter] = useState(0);

    //Rerender Materialize on rerender
    useEffect(() => {
        try {
            // eslint-disable-next-line no-undef
            M.updateTextFields();
        } catch (e) {}
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
            const newPlayer = new PlayerClass(name, startMoney);
            return [...prevPlayers, newPlayer];
        });

        nameRef.current.value = "";
    };

    const resetGame = () => {
        setTimeout(function () {
            setPressCounter(0);
        }, 8000);

        setPressCounter(pressCounter + 1);

        if (pressCounter === 5) {
            // eslint-disable-next-line no-undef
            M.toast({
                html: `Game reset`,
                classes: "rounded black white-text",
            });
            setPlayers([]);

            setBank(() => {
                let bank = new PlayerClass("Bank");
                bank.balance = 10 ** 10;
                return bank;
            });

            loadPropertyData().then((data) => {
                setAvailableProperties(data);
            });

            setBuildings(loadBuildingData());
            setPressCounter(0);
        } else {
            // eslint-disable-next-line no-undef
            M.toast({
                html: `Press ${5 - pressCounter}  more times to reset Game`,
                classes: "rounded red black-text",
            });
        }
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

                                <div className="row noMargin">
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
                                <div className="row center ">
                                    {/*Add Player Button */}
                                    <div className="input-field col s12  ">
                                        <div className="col s6 offset-s3">
                                            <button
                                                className=" btn btn-large-rent waves-effect waves-light red darken-2"
                                                onClick={resetGame}
                                            >
                                                Reset Game
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
