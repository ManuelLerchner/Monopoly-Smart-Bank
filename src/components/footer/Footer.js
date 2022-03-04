import React from "react";

export default function Footer() {
    return (
        <footer className="page-footer  blue-grey darken-3">
            <div className="container">
                <div className="row">
                    <div className="col l4 s12">
                        <h5 className="orange-text text-darken-1">
                            Monopoly Smart-Bank
                        </h5>
                        <p className="grey-text text-lighten-4">
                            This project is an attempt to automate the Monopoly
                            Bank.
                            <br />
                            <br />
                            You can add new players in the lobby and use some
                            standard features, such as transfering money ,
                            buying appartments and properties. Or receive rent
                            from other players.
                            <br />
                            <br />
                            In the future you can also interact with some
                            advanced and custom features, like buying stocks or
                            use custom monopoly cards with RFID-chips inside, so
                            that you just need to scan the card to read its
                            price and attributes.
                        </p>
                    </div>
                    <div className="col l4 offset-l1 s7 ">
                        <h5 className="orange-text text-darken-1">Features</h5>
                        <p className="grey-text text-lighten-4">
                            Here is a basic guide to the website:
                        </p>
                        <ol>
                            <li>Add Players in the "Lobby"</li>
                            <li>Transfer money between players in "Pay"</li>
                            <li>Buy properties and buildings in "Buy"</li>
                            <li>Receive rent from others in "Rent"</li>
                            <li>
                                Pay or receive money from the bank in "Bank"
                            </li>
                            <li>Toggle mortage on a property in "Sell"</li>
                            <li>Look at the game history in "Overview"</li>
                            <li>
                                Reopen the website on your mobile and
                                live-spectate the game
                            </li>
                        </ol>
                        <p className="grey-text text-lighten-4">
                            The game progress gets saved in local storage. If
                            you want to reset the game click the "Reset" button
                            in the Lobby.
                        </p>
                    </div>
                    <div className="col l2  offset-l1 s3 offset-s1">
                        <h5 className="orange-text text-darken-1">Links</h5>
                        <ul>
                            <li>
                                <a
                                    className="grey-text text-lighten-3"
                                    href="https://manuellerchner.de/"
                                >
                                    Website
                                </a>
                            </li>
                            <li>
                                <a
                                    className="grey-text text-lighten-3"
                                    href="https://manuellerchner.de/about"
                                >
                                    About Me
                                </a>
                            </li>

                            <li>
                                <a
                                    className="grey-text text-lighten-3"
                                    href="https://github.com/ManuelLerchner"
                                >
                                    Github
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-copyright">
                <div className="container">© 2021 Manuel Lerchner</div>
            </div>
        </footer>
    );
}
