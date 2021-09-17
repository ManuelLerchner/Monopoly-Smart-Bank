import React, { useEffect, useRef, useState } from "react";

import "./RentMenu.css";

import $ from "jquery";
import { PlayerClass } from "../../Data/PlayerClass";
import PlayerList from "../../components/playerList/PlayerList";
import BuyModal from "../../components/buyModal/Modal";
import PropertyCard from "../../components/propertyCard/PropertyCard";

export default function RentMenu({ players, setPlayers }) {
    const [playerProperties, setplayerProperties] = useState([]);
    const [selectedProperty, setselectedProperty] = useState(null);

 

    const pay = () => {
        const renterID = $("input:radio[name=Renter]:checked").val();

        if (renterID === undefined) {
            // eslint-disable-next-line no-undef
            M.toast({
                html: "No Renter selected",
                classes: "rounded red black-text",
            });
            return;
        }

        if (selectedProperty === null) {
            // eslint-disable-next-line no-undef
            M.toast({
                html: "No Property selected",
                classes: "rounded red black-text",
            });
            return;
        }

        const renter = players.find((player) => player.id === renterID);

        const [succesfull, paymentMSG] = PlayerClass.sendMoney(
            renter,
            selectedProperty.owner,
            selectedProperty.calcRentCost()
        );
        if (!succesfull) {
            // eslint-disable-next-line no-undef
            M.toast({
                html: paymentMSG,
                classes: "rounded red black-text",
            });
            return;
        }

        let clone = players.map((player) => {
            if (player.id === renter.id) {
                return renter;
            }
            if (player.id === selectedProperty.owner.id) {
                return selectedProperty.owner;
            }
            return player;
        });

        setPlayers([...clone]);

        // eslint-disable-next-line no-undef
        M.toast({
            html: paymentMSG,
            classes: "rounded green  black-text",
        });
    };

    const select = () => {
        const ownerID = $("input:radio[name=Owner]:checked").val();

        if (ownerID === undefined) {
            // eslint-disable-next-line no-undef
            M.toast({
                html: "No Owner selected",
                classes: "rounded red black-text",
            });
            return;
        }

        const owner = players.find((player) => player.id === ownerID);

        setplayerProperties(owner.properties);
        openSelectProperty();
    };

    const closeSelectList = (property) => {
        setselectedProperty(property);
        var modalElems = document.querySelectorAll("#modalSelectProperty");
        modalElems.forEach((elem) => {
            // eslint-disable-next-line no-undef
            var instance = M.Modal.getInstance(elem);
            instance.close();
        });
    };

    const openSelectProperty = () => {
        var modalElems = document.querySelectorAll("#modalSelectProperty");
        modalElems.forEach((elem) => {
            // eslint-disable-next-line no-undef
            var instance = M.Modal.getInstance(elem);
            instance.open();
        });
    };

    return (
        <>
            <div className="row">
                <div className="col l2 offset-l1 s4 ">
                    <div className="card cardColor-pay ">
                        <div className="card-content white-text">
                            {/* Title */}

                            <div className="section">
                                <div className="card-title red-text center title">
                                    Renter
                                </div>
                            </div>

                            <PlayerList players={players} type={"Renter"} />
                        </div>
                    </div>
                </div>

                <div className="col l4 offset-l1 s4">
                    <div className="card cardColor-pay ">
                        <div className="card-content white-text">
                            {selectedProperty !== null && (
                                <div className="row smallRow ">
                                    <div className="gridWrapperOneColumn">
                                        <PropertyCard
                                            property={selectedProperty}
                                            setselectedProperty={
                                                setselectedProperty
                                            }
                                            clickCallback={closeSelectList}
                                            showType={"rent"}
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="row  padding10 center ">
                                <div className="col l4 offset-l1 s12 marginBottom">
                                    <button
                                        className=" btn-large btn-large-rent waves-effect waves-light green darken-1"
                                        onClick={select}
                                    >
                                        Find
                                        <i className="material-icons right hide-on-med-and-down ">
                                            place
                                        </i>
                                    </button>
                                </div>
                                <div className="col l4 offset-l2 s12 marginBottom">
                                    <button
                                        className=" btn-large btn-large-rent waves-effect waves-light red darken-2 "
                                        onClick={pay}
                                    >
                                        Pay
                                        <i className="material-icons right hide-on-med-and-down ">
                                            send
                                        </i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col l2 offset-l1 s4 ">
                    <div className="card cardColor-pay ">
                        <div className="card-content white-text">
                            {/* Title */}

                            <div className="section">
                                <div className="card-title light-green-text text-accent-4 center title">
                                    Owner
                                </div>
                            </div>

                            <PlayerList players={players} type={"Owner"} />
                        </div>
                    </div>
                </div>
            </div>

            <div id="modalSelectProperty" className="modal">
                <BuyModal
                    title={"Player Properties:"}
                    description={"Select a property where you want to build"}
                    properties={playerProperties}
                    clickCallback={closeSelectList}
                    showType={"rent"}
                />
            </div>
        </>
    );
}
