import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import Details from './Details.jsx'

const StarTitle = styled.span`
  font-size: 16px;
  font-family: "Helvetica Neue", Helvetica, Arial;
  color: #333333;
  margin: 0px 6px 0px 0px;
`;

const ReviewCountTitle = styled.span`
  font-size: 16px;
  font-family: "Helvetica Neue", Helvetica, Arial;
  color: #666666;
`;

const SRDWrapper = {
  height: 50,
  marginTop: -15,
  marginRight: 170,
  display: 'flex',
  justifyContent: 'center',
};

const StarSymbolFull = styled.i`
  font-size: 15px;
  height: 20px;
  width: 26px; 
  background-color: #EE5B4F;
  color: #FFF;
  margin: 2px;
  border-radius: 3px;
  padding-top: 4px;
  vertical-align: center;
`;

const StarSymbolBlank = styled.i`
  font-size: 15px
  height: 20px;
  width: 26px; 
  background-color: #333;
  opacity: 0.5;
  color: #FFF;
  margin: 2px;
  border-radius: 3px;
  padding-top: 4px;
  vertical-align: center;
`;

const fullStar = <StarSymbolFull className="fas fa-star"></StarSymbolFull>;
const blankStar = <StarSymbolBlank className="fas fa-star"></StarSymbolBlank>;

class StarsReviewsDetails extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      props: this.props,
      stars: [blankStar, blankStar, blankStar, blankStar, blankStar],
    }
  }

  componentWillReceiveProps(newProps) {
    const state = Object.assign({}, this.state);
    if (this.props.averageStars !== newProps.averageStars) {
      state.props = newProps
      this.setState(state, () => {this.updateStars()});
    }
  }

  updateStars () {
    const state = Object.assign({}, this.state);
    const starCount = this.props.averageStars;
    for (var i = 0; i < starCount; i++) {
      state.stars[i] = fullStar;
    }
    this.setState(state);
  }

  render() {
    return(
      <div className="srd-wrapper">
        <div style={SRDWrapper}>
          <StarTitle>{[...this.state.stars]}</StarTitle>
          <ReviewCountTitle> reviews</ReviewCountTitle>
          <Details
            detailsModalStatus={this.props.detailsModalStatus}
            closeDetailsModal={this.props.closeDetailsModal}
            openDetailsModal={this.props.openDetailsModal}
            detailStyle={this.props.detailStyle}
            reviews={this.props.reviews}
            reviewCount={this.props.reviewCount}
          />
        </div>
      </div>
    )
  };
}

export default StarsReviewsDetails;
