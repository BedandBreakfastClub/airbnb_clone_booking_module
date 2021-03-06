import React from 'react';
import styled from 'styled-components';
import dateFns from 'date-fns';

const Wrapper = styled.div`
  font-family: 'Montserrat', sans-serif;
  .booking-button {
    background-color: rgb(254, 90, 94, 1);
    border: none;
    color: #ffffff;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-weight: 800;
    margin: 0px;
    cursor: pointer;
    word-wrap: break-word;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: normal;
    border-radius: 5px;
    width: 300px;
    margin-top: 24px;
  }
  .button-plus {
    border-radius: 100%;
    vertical-align: middle !important;
  }
  .button-minus {
    border-radius: 100%;
    vertical-align: middle !important;
  }
  .dropdown {
    box-sizing: content-box;   
    width: 210px;
    height: 170px;
    padding: 30px;    
    border: 1px solid #e4e4e4;
    right: 20%;
    margin-right: 16px;
    margin-left: 12px;
    margin-top: 12px;
    background-color: rgba(255,255,255,1);
  }
  .guest-bar {
    border: 0px;
    z-index: 1;
  }
  .guest-display {
    border: 1px solid #e4e4e4;
    padding: 5px  
  }
  input[value] {
    font-family: 'Montserrat', sans-serif;
    font-size: 18px;
  }
  .guest-label {
    padding-top: 5px;
    padding-bottom: 5px;
    z-index: 1;
  }
  .guest-type {
    display: grid;
    grid-template-columns: 100px auto auto auto;
    padding-bottom: 10px;
  }
  .price-table {
    padding-top: 10px;
  }
  .fee-field {
    display: table;
    width: 100%;
    border-spacing: 0px;
  }
  .fee {
    display: table-cell;
    width: 100%;
    vertical-align: middle;
  }
  .amount {
    display: table-cell;
    vertical-align: middle;
  }
  .bottom-border {
    margin-top: 8px;
    margin-bottom: 8px;
  }
  .border {
    border-bottom: 1px solid #e4e4e4
  }
`;

class Guest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      drop: false,
      adults: 1,
      children: 0,
      infants: 0,
      total: 1,
      updated: false,
    };

    this.handleDropMenu = this.handleDropMenu.bind(this);
    this.handleCloseMenu = this.handleCloseMenu.bind(this);
  }

  handleDropMenu(event) {
    this.setState({
      drop: true,
    }, () => document.addEventListener('click', this.handleCloseMenu));
  }

  handleCloseMenu(event) {
    if (!this.menu.contains(event.target)) {
      this.setState({
        drop: false,
      }, () => document.removeEventListener('click', this.handleCloseMenu));
    }
  }

  handleAdultIncrement() {
    const { adults, children } = this.state;
    if (this.props.max > adults + children) {
      this.setState(prevState => ({
        adults: prevState.adults + 1,
        total: prevState.total + 1,
        updated: true,
      }));
    }
  }

  handleAdultDecrement() {
    const { adults } = this.state;
    if (adults > 1) {
      this.setState(prevState => ({
        adults: prevState.adults - 1,
        total: prevState.total - 1,
        updated: true,
      }));
    }
  }

  handleChildrenIncrement() {
    const { adults, children } = this.state;
    if (this.props.max > adults + children) {
      this.setState(prevState => ({
        children: prevState.children + 1,
        total: prevState.total + 1,
        updated: true,
      }));
    }
  }

  handleChildrenDecrement() {
    const { children } = this.state;
    if (children > 0) {
      this.setState(prevState => ({
        children: prevState.children - 1,
        total: prevState.total - 1,
        updated: true,
      }));
    }
  }

  handleInfantIncrement() {
    const { infants } = this.state;
    if (infants < 8) {
      this.setState(prevState => ({
        infants: prevState.infants + 1,
        total: prevState.total + 1,
        updated: true,
      }));
    }
  }

  handleInfantDecrement() {
    const { infants } = this.state;
    if (infants > 0) {
      this.setState(prevState => ({
        infants: prevState.infants - 1,
        total: prevState.total - 1,
        updated: true,
      }));
    }
  }

  renderPriceSummary() {
    const { start, end, data } = this.props;
    const { drop } = this.state;
    if (drop === false && start !== 'Check In' && end !== 'Check Out') {
      return (
        <div className="price-table">
          <div>
            <div className="total fee-field">
              <div className="fee per-day">
                <small><b>{`$${data.pricing} x ${dateFns.differenceInCalendarDays(end, start)} nights`}</b></small>
              </div>
              <div className="amount">
                <small>${data.pricing * dateFns.differenceInCalendarDays(end, start)}</small>
              </div>
            </div>
            <div className="bottom-border">
              <div className="border"></div>
            </div>
          </div>
          <div>
            <div className="cleaning fee-field">
              <div className="fee cleaning">
                <small><b>{`Cleaning fee`}</b></small>
              </div>
              <div className="amount">
                <small>${data.cleaning_fee}</small>
              </div>
            </div>
            <div className="bottom-border">
              <div className="border"></div>
            </div>
          </div>
          <div>
            <div className="service fee-field">
              <div className="fee service">
                <small><b>{`Service fee`}</b></small>
              </div>
              <div className="amount">
                <small>${data.service_fee}</small>
              </div>
            </div>
            <div className="bottom-border">
              <div className="border"></div>
            </div>
            <div className="fee-field">
              <div className="fee total">
                <small><b>Total</b></small>
              </div>
              <div className="amount">
                <small>${data.pricing * dateFns.differenceInCalendarDays(end, start) + data.cleaning_fee + data.service_fee}</small>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  renderGuestBar() {
    const { total } = this.state;
    if (total === 1) {
      return (
        <input className="guest-bar" type="text" value="1 guest" onClick={this.handleDropMenu} readOnly />
      );
    }
    return (
      <input className="guest-bar" type="text" value={`${total} guests`} onClick={this.handleDropMenu} readOnly />
    );
  }

  render() {
    const { drop, adults, children, infants } = this.state;
    const { data, max } = this.props;

    return (
        <Wrapper>
          <div>
            <div className="guest-label">
              <label>
                <small><b>Guests</b></small>
              </label>
            </div>
            <div className="guest-display">
              {this.renderGuestBar()}
            </div>
            <div>
            </div>
            <div>
              { drop ? (
              <div className="dropdown" ref={ele => this.menu = ele}>
                <div className="guest-type adults">
                  <div className="adults-label">
                    <span>Adults</span>
                  </div>
                  <div>
                    <input className="button-minus" value="-" type="button" onClick={() => this.handleAdultDecrement()} />
                  </div>
                  <div>
                    <span>{adults}</span>
                  </div>
                  <div>
                    <input className="button-plus" value="+" type="button" onClick={() => this.handleAdultIncrement()} />
                  </div>
                </div>
                <div className="guest-type children">
                  <div className="children-label">
                    <span>Children</span>
                  </div>
                  <div>
                    <input className="button-minus" value="-" type="button" onClick={() => this.handleChildrenDecrement()} />
                  </div>
                  <div>
                    <span>{children}</span>
                  </div>
                  <div>
                    <input className="button-plus" value="+" type="button" onClick={() => this.handleChildrenIncrement()} />
                  </div>
                </div>
                <div className="guest-type infants">
                  <div className="infants-label">
                    <span>Infants</span>
                  </div>
                  <div>
                    <input className="button-minus" value="-" type="button" onClick={() => this.handleInfantDecrement()} />
                  </div>
                  <div>
                    <span>{infants}</span>
                  </div>
                  <div>
                    <input className="button-plus" value="+" type="button" onClick={() => this.handleInfantIncrement()} />
                  </div>
                </div>
                <div>
                  <span>{max === 1 ? `${max} guest maximum. Infants don't count toward the number of guests.` : `${max} guests maximum. Infants don't count toward the number of guests.`}</span>
                </div>
              </div>) : null }
              {data && this.renderPriceSummary()}
              {!drop ? (<input className="booking-button" value="Book" type="button" />) : null}
            </div>
          </div>
        </Wrapper>
    );
  }
}

export default Guest;
