import React from "react";

import "./MainMenu.css";

export default function MainMenu() {
    return (
        <div className="row ">
            <div className="col l6 offset-l3 m8 offset-m2 s10 offset-s1">
                <div className="card cardColor">
                    <div className="card-content white-text">
                        <div className="ButtonBox">
                            <div className="">
                                <a
                                    class="waves-effect waves-light btn-large red darken-2"
                                    href="#!"
                                >
                                    <i class="material-icons right">
                                        attach_money
                                    </i>
                                    Pay
                                </a>
                            </div>
                            <div className="">
                                <a
                                    class="waves-effect waves-light btn-large deep-orange darken-1"
                                    href="#!"
                                >
                                    <i class="material-icons right">
                                        account_balance
                                    </i>
                                    Buy
                                </a>
                            </div>
                            <div className="">
                                <a
                                    class="waves-effect waves-light btn-large green darken-1"
                                    href="#!"
                                >
                                    <i class="material-icons right">
                                        double_arrow
                                    </i>
                                    Start
                                </a>
                            </div>
                            <div className="">
                                <a
                                    class="waves-effect waves-light btn-large  light-blue darken-3"
                                    href="#!"
                                >
                                    <i class="material-icons right">
                                        trending_up
                                    </i>
                                    Stock
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
