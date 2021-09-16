import React from "react";

export default function Footer() {
    return (
        <footer class="page-footer  blue-grey darken-2">
            <div class="container">
                <div class="row">
                    <div class="col l6 s12">
                        <h5 class="white-text">Monopoly Smart-Bank</h5>
                        <p class="grey-text text-lighten-4">
                            This project is an attempt to automate the Monopoly
                            Bank.
                            <br />
                            <br />
                            You can add new players in the lobby and use some
                            standard features, such as transfering money ,
                            buying appartments and properties, and claim the
                            start-money.
                            <br />
                            <br />
                            Additionally you can interact with some advanced and
                            custom features, like buying stocks or use custom
                            monopoly cards with RFID-chips inside, so that you
                            just need to scan the card to read its price and
                            effects.
                        </p>
                    </div>
                    <div class="col l3 offset-l3 s12">
                        <h5 class="white-text">Links</h5>
                        <ul>
                            <li>
                                <a class="grey-text text-lighten-3" href="#!">
                                    Link 1
                                </a>
                            </li>
                            <li>
                                <a class="grey-text text-lighten-3" href="#!">
                                    Link 2
                                </a>
                            </li>
                            <li>
                                <a class="grey-text text-lighten-3" href="#!">
                                    Link 3
                                </a>
                            </li>
                            <li>
                                <a class="grey-text text-lighten-3" href="#!">
                                    Link 4
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="footer-copyright">
                <div class="container">© 2021 Manuel Lerchner</div>
            </div>
        </footer>
    );
}
