import React, { useRef } from "react";
import { PlayerClass } from "../../Data/PlayerClass";

import "./SettingsMenu.css";

export default function SettingsMenu({
    startMoney,
    setStartMoney,
    maxHouses,
    setMaxHouses,
}) {
    const startMoneyRef = useRef(null);
    const totalHousesRef = useRef(null);

    const updateStartMoney = () => {
        const newVal = startMoneyRef.current.value;

        if (newVal === "") {
            // eslint-disable-next-line no-undef
            M.toast({
                html: "No new value provided",
                classes: "rounded red black-text",
            });
            return;
        }

        const val = PlayerClass.parseMoney(newVal);

        if (isNaN(val)) {
            // eslint-disable-next-line no-undef
            M.toast({
                html: "Invalid Money Format",
                classes: "rounded red black-text",
            });
            return;
        }

        setStartMoney(val);
    };

    const updateTotalHouses = () => {
        const val = totalHousesRef.current.value;

        if (val === "") {
            // eslint-disable-next-line no-undef
            M.toast({
                html: "No new value provided",
                classes: "rounded red black-text",
            });
            return;
        }

        const numInt = Number.parseInt(val);

        if (!Number.isInteger(numInt)) {
            // eslint-disable-next-line no-undef
            M.toast({
                html: "Invalid Money Format",
                classes: "rounded red black-text",
            });
            return;
        }

        setMaxHouses(val);
    };

    return (
        <div className="row ">
            <div className="col l8 offset-l2 m8 offset-m2 s12 ">
                <div className="card cardColor-main">
                    <div className="card-content white-text">
                        <div className="row  ">
                            <div className="col l10 offset-l1 ">
                                <table className="centered ">
                                    <thead>
                                        <tr>
                                            <th className="align-left">
                                                Option
                                            </th>
                                            <th className="align-left">
                                                Current
                                            </th>
                                            <th className="align-center">
                                                New
                                            </th>
                                            <th className="align-center">
                                                Update
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <td className="align-left">
                                                Start Money
                                            </td>

                                            <td className="align-left">
                                                {PlayerClass.formatMoney(
                                                    startMoney
                                                )}
                                            </td>

                                            <td className="align-right">
                                                <div className="row center">
                                                    <div className="input-field col s9 offset-s2">
                                                        <input
                                                            id="startmoney"
                                                            type="text"
                                                            ref={startMoneyRef}
                                                        />
                                                        <label htmlFor="startmoney">
                                                            New Start Value
                                                        </label>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="row center">
                                                    <div className="col s8 offset-s2">
                                                        <button
                                                            className="btn waves-effect orange darken-3 waves-light"
                                                            type="submit"
                                                            name="action"
                                                            onClick={
                                                                updateStartMoney
                                                            }
                                                        >
                                                            Update
                                                            <i className="material-icons right">
                                                                sync_alt
                                                            </i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td className="align-left">
                                                Total Houses
                                            </td>

                                            <td className="align-left">
                                                {maxHouses}
                                            </td>

                                            <td className="align-right">
                                                <div className="row center">
                                                    <div className="input-field col s9 offset-s2">
                                                        <input
                                                            id="totalhouses"
                                                            type="text"
                                                            ref={totalHousesRef}
                                                        />
                                                        <label htmlFor="totalhouses">
                                                            New Total Houses
                                                        </label>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="row center">
                                                    <div className="col s8 offset-s2">
                                                        <button
                                                            className="btn waves-effect orange darken-3 waves-light"
                                                            type="submit"
                                                            name="action"
                                                            onClick={
                                                                updateTotalHouses
                                                            }
                                                        >
                                                            Update
                                                            <i className="material-icons right">
                                                                sync_alt
                                                            </i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
