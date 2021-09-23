import React, { useRef, useState } from "react";

import PlayerList from "../../components/playerList/PlayerList";
import BuyModal from "../../components/modal/Modal";
import PropertyCard from "../../components/propertyCard/PropertyCard";

import { PlayerClass } from "../../Data/PlayerClass";
import $ from "jquery";

export default function RentMenu({ players, setPlayers, bank, set }) {
    const [playerProperties, setplayerProperties] = useState([]);
    const [selectedProperty, setselectedProperty] = useState(null);

    const amountRef = useRef();

    const sell = () => {
        const sellerID = $("input:radio[name=Seller]:checked").val();
        const buyerID = $("input:radio[name=Buyer]:checked").val();
        const amount = amountRef.current.value;

        if (sellerID === undefined) {
            // eslint-disable-next-line no-undef
            M.toast({
                html: "No Renter selected",
                classes: "rounded red black-text",
            });
            return;
        }
        if (buyerID === undefined) {
            // eslint-disable-next-line no-undef
            M.toast({
                html: "No Buyer selected",
                classes: "rounded red black-text",
            });
            return;
        }
        if (amount === "") {
            // eslint-disable-next-line no-undef
            M.toast({
                html: "No Amount set",
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

        const seller = [...players, bank].find(
            (player) => player.id === sellerID
        );
        const buyer = [...players, bank].find(
            (player) => player.id === buyerID
        );

        if (buyer.balance < amount) {
            // eslint-disable-next-line no-undef
            M.toast({
                html: "Not enought Money",
                classes: "rounded red black-text",
            });
            return;
        }

        const [succesfull, paymentMSG] = PlayerClass.sendMoney(
            buyer,
            seller,
            amount
        );

        if (!succesfull) {
            // eslint-disable-next-line no-undef
            M.toast({
                html: paymentMSG,
                classes: "rounded red black-text",
            });
            return;
        }

        if (selectedProperty.skyScraperBuilt) {
            seller.hasSkyScraperOn[selectedProperty.color] = false;
            buyer.hasSkyScraperOn[selectedProperty.color] = true;

            seller.skyscraper -= 1;
            buyer.skyscraper += 1;
        }

        if (selectedProperty.monopolyTowerBuilt) {
            seller.hasMonopolyTower = false;
            buyer.hasMonopolyTower = true;
        }

        buyer.houses += selectedProperty.housesCount;
        seller.houses += selectedProperty.housesCount;

        seller.properties = seller.properties.filter((property) => {
            return property.id !== selectedProperty.id;
        });

        selectedProperty.owner = buyer;
        buyer.properties.push(selectedProperty);

        seller.changes["properties"] = "-";
        buyer.changes["properties"] = "+";

        const balanceMoved =
            typeof amount === "string"
                ? PlayerClass.parseMoney(amount)
                : amount;

        buyer.history.push({
            msg: `Bought ${selectedProperty.name} from ${seller.name}`,
            time: new Date().toLocaleTimeString(),
            amount: balanceMoved,
            total: buyer.balance,
            direction: "-",
        });
        seller.history.push({
            msg: `Sold ${selectedProperty.name} to ${buyer.name}`,
            time: new Date().toLocaleTimeString(),
            amount: balanceMoved,
            total: seller.balance,
            direction: "-",
        });

        let clone = players.map((player) => {
            if (player.id === seller.id) {
                return seller;
            }
            if (player.id === buyer.id) {
                return buyer;
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
        const sellerID = $("input:radio[name=Seller]:checked").val();

        if (sellerID === undefined) {
            // eslint-disable-next-line no-undef
            M.toast({
                html: "No Seller selected",
                classes: "rounded red black-text",
            });
            return;
        }

        const owner = [...players, bank].find(
            (player) => player.id === sellerID
        );

        setplayerProperties(owner.properties);
        openSelectProperty();
    };

    const toggleMortage = (property) => {
        property.mortage = !property.mortage;

        let clone = players.map((player) => {
            return player;
        });

        setPlayers([...clone]);

        // eslint-disable-next-line no-undef
        M.toast({
            html: `Mortage toggled ${property.mortage ? "On" : "Off"} for ${
                property.name
            }`,
            classes: "rounded green black-text",
        });
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
                                    Seller
                                </div>
                            </div>

                            <PlayerList
                                players={[...players, bank]}
                                type={"Seller"}
                                callback={() => {
                                    setselectedProperty(null);
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="col l4 offset-l1 s4">
                    <div className="card cardColor-pay ">
                        <div className="card-content white-text">
                            {selectedProperty !== null && (
                                <div className="row smallRow center">
                                    {selectedProperty && (
                                        <p1>
                                            Click on Property to toggle mortage
                                        </p1>
                                    )}
                                    <div className="gridWrapperOneColumn padding10">
                                        <PropertyCard
                                            property={selectedProperty}
                                            clickCallback={toggleMortage}
                                            showType={"rent"}
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="row  padding10 center ">
                                <div className="col l3 offset-l1 marginBottom">
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
                                <div className="col l4 input-field">
                                    <input
                                        id="first_name"
                                        type="text"
                                        className="validate"
                                        autoComplete="off"
                                        ref={amountRef}
                                    />
                                    <label htmlFor="first_name">Amount</label>
                                </div>
                                <div className="col l3  marginBottom">
                                    <button
                                        className=" btn-large btn-large-rent waves-effect waves-light red darken-2 "
                                        onClick={sell}
                                    >
                                        Sell
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
                                    Buyer
                                </div>
                            </div>

                            <PlayerList
                                players={[...players, bank]}
                                type={"Buyer"}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div id="modalSelectProperty" className="modal">
                <BuyModal
                    title={"Player Properties:"}
                    description={"Select a property you want to sell"}
                    properties={playerProperties}
                    clickCallback={closeSelectList}
                    showType={"rent"}
                />
            </div>
        </>
    );
}
