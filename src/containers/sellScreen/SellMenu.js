import React, { useRef, useState } from "react";

import PlayerList from "../../components/playerList/PlayerList";
import BuyModal from "../../components/modal/Modal";
import PropertyCard from "../../components/propertyCard/PropertyCard";

import { PlayerClass } from "../../Data/PlayerClass";
import $ from "jquery";

import "./SellMenu.css";

export default function RentMenu({ players, setPlayers, bank }) {
    const [playerProperties, setplayerProperties] = useState([]);
    const [selectedProperty, setselectedProperty] = useState(null);
    const [pressCounter, setPressCounter] = useState(0);

    const amountRef = useRef();

    const sell = () => {
        const sellerID = $("input:radio[name=Seller]:checked").val();
        const buyerID = $("input:radio[name=Buyer]:checked").val();
        const amount = amountRef.current.value;

        if (sellerID === undefined) {
            // eslint-disable-next-line no-undef
            M.toast({
                html: "No Seller selected",
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
        seller.houses -= selectedProperty.housesCount;

        if (buyer === bank) {
            selectedProperty.skyScraperBuilt = false;
            selectedProperty.monopolyTowerBuilt = false;
            selectedProperty.buildingSlotsTaken = 0;
            selectedProperty.housesCount = 0;
            selectedProperty.buildings = [];
            selectedProperty.buildingsWorth = 0;
            selectedProperty.negativeBuildings = 0;
            selectedProperty.mortage = false;
        }

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
            msg: `${buyer.name} bought ${selectedProperty.name} from ${seller.name}`,
            time: new Date().toLocaleTimeString(),
            amount: balanceMoved,
            total: buyer.balance,
            direction: "-",
        });
        seller.history.push({
            msg: `${seller.name} Sold ${selectedProperty.name} to ${buyer.name}`,
            time: new Date().toLocaleTimeString(),
            amount: balanceMoved,
            total: seller.balance,
            direction: "-",
        });

        buyer.calcEstimatedValue();
        seller.calcEstimatedValue();

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

        const ownerID = $("input:radio[name=Seller]:checked").val();
        const owner = [...players, bank].find(
            (player) => player.id === ownerID
        );

        let clone = players.map((player) => {
            return player;
        });

        if (property.mortage === true) {
            PlayerClass.sendMoney(bank, owner, property.calcRentCost());
        } else {
            PlayerClass.sendMoney(owner, bank, property.calcRentCost());
        }

        setPlayers([...clone]);

        // eslint-disable-next-line no-undef
        M.toast({
            html: `Mortage toggled ${property.mortage ? "On" : "Off"} for ${
                property.name
            }`,
            classes: "rounded green black-text",
        });
    };

    const sellSurgeon = (property) => {
        const amount = property.negativeBuildings * 0.5 * 10 ** 6;

        const sellerID = $("input:radio[name=Seller]:checked").val();

        const seller = [...players, bank].find(
            (player) => player.id === sellerID
        );

        const [succesfull, paymentMSG] = PlayerClass.sendMoney(
            seller,
            bank,
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

        property.negativeBuildings = 0;

        let clone = players.map((player) => {
            return player;
        });

        setPlayers([...clone]);
    };

    const declareBankruptcy = () => {
        const sellerID = $("input:radio[name=Seller]:checked").val();
        const buyerID = $("input:radio[name=Buyer]:checked").val();

        if (sellerID === undefined) {
            // eslint-disable-next-line no-undef
            M.toast({
                html: "No Seller selected",
                classes: "rounded red black-text",
            });
            return;
        }
        if (buyerID !== bank.id) {
            // eslint-disable-next-line no-undef
            M.toast({
                html: "Bank needs to be the buyer",
                classes: "rounded red black-text",
            });
            return;
        }

        if (sellerID === bank.id) {
            // eslint-disable-next-line no-undef
            M.toast({
                html: "Bank cannot go bancrupt, we are not in Greece",
                classes: "rounded red black-text",
            });
            return;
        }

        setTimeout(function () {
            setPressCounter(0);
        }, 8000);

        setPressCounter(pressCounter + 1);

        const seller = [...players, bank].find(
            (player) => player.id === sellerID
        );

        if (pressCounter === 5) {
            // eslint-disable-next-line no-undef
            M.toast({
                html: `${seller.name} declared Bankruptcy`,
                classes: "rounded black white-text",
            });

            seller.properties.forEach((property) => {
                if (property.skyScraperBuilt) {
                    seller.hasSkyScraperOn[property.color] = false;
                    bank.hasSkyScraperOn[property.color] = true;

                    bank.skyscraper += 1;
                }

                if (property.monopolyTowerBuilt) {
                    seller.hasMonopolyTower = false;
                    bank.hasMonopolyTower = true;
                }

                bank.houses += property.housesCount;
                seller.houses -= property.housesCount;

                property.skyScraperBuilt = false;
                property.monopolyTowerBuilt = false;
                property.buildingSlotsTaken = 0;
                property.housesCount = 0;
                property.buildings = [];
                property.buildingsWorth = 0;
                property.negativeBuildings = 0;
                property.mortage = false;

                seller.properties = seller.properties.filter((property) => {
                    return false;
                });

                property.owner = bank;
                bank.properties.push(property);
            });

            seller.changes["properties"] = "-";
            bank.changes["properties"] = "+";

            seller.history.push({
                msg: `${seller.name} declared bankruptcy`,
                time: new Date().toLocaleTimeString(),
                amount: seller.balance,
                total: 0,
                direction: "/",
            });

            seller.balance = 0;
            seller.skyscraper = 0;
            seller.calcEstimatedValue();

            let clone = players.filter((player) => {
                return true;
            });

            setPlayers([...clone]);

            setPressCounter(0);
        } else {
            // eslint-disable-next-line no-undef
            M.toast({
                html: `${seller.name}, press ${
                    5 - pressCounter
                }  more times to declare Bankruptcy`,
                classes: "rounded red black-text",
            });
        }
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
                            <div className="row  center  padding10 noMarginBot">
                                <div className="col s6 ">
                                    <button
                                        className=" btn btn-large-rent waves-effect waves-light red darken-4"
                                        onClick={declareBankruptcy}
                                    >
                                        Declare Bankruptcy
                                    </button>
                                </div>

                                <div className="col s6">
                                    {selectedProperty && (
                                        <button
                                            className=" btn btn-large-rent waves-effect waves-light orange darken-2"
                                            onClick={() => {
                                                toggleMortage(selectedProperty);
                                            }}
                                        >
                                            Toggle Mortage
                                        </button>
                                    )}
                                </div>
                            </div>

                            {selectedProperty !== null && (
                                <div className="row smallRow center noMarginBot noPaddingTop">
                                    <div className="row noMarginBot  ">
                                        <div className="gridWrapperOneColumn ">
                                            <PropertyCard
                                                property={selectedProperty}
                                                showType={"rent"}
                                            />
                                        </div>
                                    </div>

                                    <div className="row  noMarginBot left ">
                                        <div className="col s12 ">
                                            {selectedProperty.negativeBuildings >
                                                0 && (
                                                <button
                                                    className=" btn btn-large-rent waves-effect waves-light blue darken-1"
                                                    onClick={() => {
                                                        sellSurgeon(
                                                            selectedProperty
                                                        );
                                                    }}
                                                >
                                                    {"Remove Distrubance: " +
                                                        PlayerClass.formatMoney(
                                                            0.5 *
                                                                10 ** 6 *
                                                                selectedProperty.negativeBuildings
                                                        )}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="row   center ">
                                <div className="col l3 offset-l1 s12 marginBottom">
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
                                <div className="col l4 s8 offset-s2 input-field">
                                    <input
                                        id="first_name"
                                        type="text"
                                        className="validate"
                                        autoComplete="off"
                                        ref={amountRef}
                                    />
                                    <label htmlFor="first_name">Amount</label>
                                </div>
                                <div className="col l3  s12 marginBottom">
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
