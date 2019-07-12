import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

Modal.setAppElement(document.getElementById('app'));

const Button = styled.button`
  font-size: 12px;
  color: #999999;
  padding: 0 6px;
  margin-left: 10px; 
`;

const detailsStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: 630,
    width: 500,
  },
};

const monthlyTrendStyle = {
  display: 'flex',
  justifyContent: 'flex-start',
};

const yearContainer = {
  display: 'flex',
  justifyContent: 'space-between',
  marginLeft: 200,
};

const yearStyle = {
  padding: 10,
  height: 30,
};

class Details extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentYearToggled: false,
      lastYearToggled: false,
      twoYearsAgoToggled: false,
      threeYearsAgoToggled: false,
      fourYearsAgoToggled: false,
    };

    this.toggleState = this.toggleState.bind(this);
  }

  toggleState(e) {
    const classname = e.target.className;
    const state = Object.assign({}, this.state)
    if (classname === 'current-year') {
      state.currentYearToggled = !state.currentYearToggled;
    } else if (classname === 'last-year') {
      state.lastYearToggled = !state.lastYearToggled;
    } else if (classname === 'two-years-ago') {
      state.twoYearsAgoToggled = !state.twoYearsAgoToggled;
    } else if (classname === 'three-years-ago') {
      state.threeYearsAgoToggled = !state.threeYearsAgoToggled;
    } else if (classname === 'four-years-ago') {
      state.fourYearsAgoToggled = !state.fourYearsAgoToggled;
    }
    this.setState(state);
  }

  render () {
    return(
      <div>
        <Button
          className="details"
          onClick={this.props.openDetailsModal}
        >Details
        </Button>
        <Modal
          isOpen={this.props.detailsModalStatus}
          onRequestClose={this.props.closeDetailsModal}
          style={detailsStyle}
        >
          <div>
            <h2>Rating Details</h2>
          </div>
          <hr/>
          <div className="modal-body">
            <div className="graph">
              <div className="month-trend" style={monthlyTrendStyle}>
                <p>Monthly Trend</p>
                <div style={yearContainer}>
                  <span onMouseOver={this.toggleState} onMouseOut={this.toggleState} id={this.state.currentYearToggled.toString()} className="current-year" style={yearStyle}>2019</span>
                  <span onMouseOver={this.toggleState} onMouseOut={this.toggleState} id={this.state.lastYearToggled.toString()} className="last-year" style={yearStyle}>2018</span>
                  <span onMouseOver={this.toggleState} onMouseOut={this.toggleState} id={this.state.twoYearsAgoToggled.toString()} className="two-years-ago" style={yearStyle}>2017</span>
                  <span onMouseOver={this.toggleState} onMouseOut={this.toggleState} id={this.state.threeYearsAgoToggled.toString()} className="three-years-ago" style={yearStyle}>2016</span>
                  <span onMouseOver={this.toggleState} onMouseOut={this.toggleState} id={this.state.fourYearsAgoToggled.toString()} className="four-years-ago" style={yearStyle}>2015</span>
                </div>
              </div>
              <div>
                <div>***MONTHLY TREND LINE CHART***</div>
              </div>
              <small>Understand how a business' rating changes month-to-month. Learn More</small>
            </div>
            <h4>Overall Rating</h4>
            <hr/>
            <p>Munching since 2009 with 2125 reviews</p>
            <div>***STAR HISTOGRAM CHART***</div>
            <small>We calculate the overall star rating using only reviews that our automated software currently recommends. Learn More</small>
          </div>
        </Modal>
      </div>
    )
  };
};

export default Details;
