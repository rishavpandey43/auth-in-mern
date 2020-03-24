import React, { useState, useEffect } from "react";
import axios from "axios";

import "./profile.css";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const Profile = props => {
  useEffect(() => {
    const username = props.location.pathname.split("/")[2];
    axios
      .get(
        baseUrl + "api/v2/users/login-detail",
        {
          params: {
            username,
            token: localStorage.getItem("auth_practice_token")
          }
        },
        {
          headers: { "Content-Type": "application/json" }
        }
      )
      .then(res => {
        props.setUserDetail(res.data.user);
        axios
          .get("https://quotes.rest/qod?category=inspire")
          .then(res => {
            setQuote({
              quote: res.data.contents.quotes[0].quote,
              author: res.data.contents.quotes[0].author
            });
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }, []);

  const [quote, setQuote] = useState(null);

  return props.userDetail ? (
    <div className="profile-wrapper">
      <div className="container">
        <div className="main-wrapper">
          <div className="row">
            <div className="col-12 col-sm-6">
              <div className="profile-container">
                <div className="card">
                  <div className="card-head">
                    <h3>Your Profile</h3>
                  </div>
                  <div className="card-body">
                    <div className="short-summary">
                      <div className="user-img">
                        <img
                          src={require("../../assets/images/user.png")}
                          alt="user-img"
                          width="100px"
                          height="100px"
                        />
                      </div>
                      <div className="user-name">
                        <h3>
                          {props.userDetail.firstName +
                            " " +
                            props.userDetail.lastName}
                        </h3>
                      </div>
                    </div>
                    <div className="detail-summery">
                      <div className="heading">
                        <h3>About</h3>
                      </div>
                      <div className="content">
                        <div className="row">
                          <div className="col-12 col-sm-6">
                            <div className="label">
                              <label>username:</label>
                            </div>
                          </div>
                          <div className="col-12 col-sm-6">
                            <div className="value">
                              {props.userDetail.username}
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 col-sm-6">
                            <div className="label">
                              <label>Name:</label>
                            </div>
                          </div>
                          <div className="col-12 col-sm-6">
                            <div className="value">
                              {props.userDetail.firstName +
                                " " +
                                props.userDetail.lastName}
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 col-sm-6">
                            <div className="label">
                              <label>email:</label>
                            </div>
                          </div>
                          <div className="col-12 col-sm-6">
                            <div className="value">
                              {props.userDetail.email}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6">
              <div className="service-container">
                <div className="card">
                  <div className="card-head">
                    <h3>Today's Quote</h3>
                  </div>
                  <div className="card-body">
                    <div className="quote">
                      <span className="quote">{quote ? quote.quote : ""}</span>
                      <br />
                      <br />
                      <span className="quote">
                        {quote ? "~" + quote.author : ""}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Profile;
