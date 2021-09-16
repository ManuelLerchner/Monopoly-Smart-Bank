import React, { useEffect, useState } from "react";

import "./BuyMenu.css";

import $ from "jquery";
import { PlayerClass } from "../../Data/PlayerClass";
import BuyModal from "../../components/buyModal/Modal";
import PropertyCard from "./../../components/propertyCard/PropertyCard";
import PlayerList from "../../components/playerList/PlayerList";

export default function BuyMenu({
    players,
    setPlayers,
    properties,
    setProperties,
    buildings,
}) {
    const [selectedProperty, setselectedProperty] = useState(null);
    const [playerProperties, setplayerProperties] = useState(null);

    //Rerender Materialize on rerender
    useEffect(() => {
        try {
            var modalElems = document.querySelectorAll(".modal");
            // eslint-disable-next-line no-undef
            M.Modal.init(modalElems, {});
        } catch (e) {
            console.log();
        }
    }, []);

    const closeModal = (property) => {
        setselectedProperty(property);
        var modalElems = document.querySelectorAll(".modal");
        modalElems.forEach((elem) => {
            // eslint-disable-next-line no-undef
            var instance = M.Modal.getInstance(elem);
            instance.close();
        });
    };

    const openBuyHome = () => {
        var modalElems = document.querySelectorAll("#modalBuyHome");
        modalElems.forEach((elem) => {
            // eslint-disable-next-line no-undef
            var instance = M.Modal.getInstance(elem);
            instance.open();
        });
    };

    const purchase = () => {
        const buyerID = $("input:radio[name=Buyer]:checked").val();

        if (buyerID === undefined) {
            // eslint-disable-next-line no-undef
            M.toast({
                html: "No Buyer selected",
                classes: "rounded red  black-text",
            });
            return;
        }

        if (selectedProperty === null) {
            // eslint-disable-next-line no-undef
            M.toast({
                html: "No Property selected",
                classes: "rounded red  black-text",
            });
            return;
        }

        const buyer = players.find((player) => player.id === buyerID);

        const [succesfull, paymentMSG] = PlayerClass.buyProperty(
            buyer,
            selectedProperty
        );

        if (!succesfull) {
            // eslint-disable-next-line no-undef
            M.toast({
                html: paymentMSG,
                classes: "rounded red black-text",
            });
            return;
        }

        setPlayers(
            players.map((player) => {
                if (player.id === buyer.id) {
                    return buyer;
                }
                return player;
            })
        );

        setProperties(
            properties.filter((prop) => prop.id !== selectedProperty.id)
        );

        // eslint-disable-next-line no-undef
        M.toast({
            html: paymentMSG,
            classes: "rounded green  black-text",
        });
    };

    const openBuyBuilding = () => {
        const buyerID = $("input:radio[name=Buyer]:checked").val();

        if (buyerID === undefined) {
            // eslint-disable-next-line no-undef
            M.toast({
                html: "No Buyer selected",
                classes: "rounded red  black-text",
            });
            return;
        }

        const buyer = players.find((player) => player.id === buyerID);

        setplayerProperties(buyer.properties);

        var modalElems = document.querySelectorAll("#modalSelectPropety");
        modalElems.forEach((elem) => {
            // eslint-disable-next-line no-undef
            var instance = M.Modal.getInstance(elem);
            instance.open();
        });
    };

    return (
        <div className="row">
            <div className="col l3 offset-l1 s4 ">
                <div className="card cardColor-buy ">
                    <div className="card-content white-text">
                        {/* Title */}

                        <div className="section">
                            <div className="card-title green-text center title">
                                Buyer
                            </div>
                        </div>

                        <PlayerList players={players} type={"Buyer"} />
                    </div>
                </div>
            </div>

            <div className="col l3 offset-l1 s4">
                {selectedProperty !== null && (
                    <div className="card cardColor-buy ">
                        <div className="card-content white-text">
                       

                            <div className="row smallRow ">
                                <div className="gridWrapperOneColumn">
                                    <PropertyCard
                                        property={selectedProperty}
                                        setselectedProperty={
                                            setselectedProperty
                                        }
                                        closeModal={() => {}}
                                    />
                                </div>
                            </div>

                            <div className="row center padding10">
                                <a
                                    className="waves-effect waves-light btn-large btn-large-buy blue lighten-1"
                                    href="#!"
                                    onClick={purchase}
                                >
                                    <i className="material-icons right  hide-on-small-only">
                                        attach_money
                                    </i>
                                    Purchase
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="col l2 offset-l1 s4">
                <div className="card cardColor-buy ">
                    <div className="card-content white-text ">
                        {/* Title */}
                        <div className="section">
                            <div className="card-title grey-text text-lighten-3 center title">
                                Type
                            </div>
                        </div>

                        <div className="row center ">
                            <div className="col s12">
                                <button
                                    className=" btn-large btn-large-type waves-effect waves-light orange darken-2 "
                                    onClick={openBuyBuilding}
                                >
                                    <i className="material-icons right  hide-on-small-only">
                                        home
                                    </i>
                                    Bulding
                                </button>
                            </div>
                        </div>

                        <div className="row center padding10">
                            <div className="col s12 ">
                                <a
                                    className=" btn-large btn-large-type waves-effect waves-light green darken-1  modal-trigger "
                                    href="#modalBuyProperties"
                                >
                                    <i className="material-icons right  hide-on-small-only">
                                        texture
                                    </i>
                                    Property
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="modalSelectPropety" className="modal">
                <BuyModal
                    title={"Player Properties:"}
                    description={
                        "Select a Property where you want to build a house:"
                    }
                    properties={playerProperties}
                    clickCallback={openBuyHome}
                />
            </div>

            <div id="modalBuyProperties" className="modal">
                <BuyModal
                    title={"Properties:"}
                    description={"Select a Property to buy"}
                    properties={properties}
                    clickCallback={closeModal}
                />
            </div>

            <div id="modalBuyHome" className="modal">
                <BuyModal
                    title={"Buildings:"}
                    description={"Select a Building to buy"}
                    properties={buildings}
                    clickCallback={() => {}}
                />
            </div>
        </div>
    );
}
