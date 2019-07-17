import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import Details from './Details.jsx'

const StarTitle = styled.span`
  font-size: 16px;
  font-family: "Helvetica Neue", Helvetica, Arial;
  color: #333333;
`;

const ReviewCountTitle = styled.span`
  font-size: 16px;
  font-family: "Helvetica Neue", Helvetica, Arial;
  color: #666666;
  margin-left: 5px;
`;

const SRDWrapper = styled.div`
  display: inline-block;
  `;

const StarSymbolFull = styled.i`
  text-align: center;
  font-size: 15px;
  height: 20px;
  width: 26px; 
  background-color: #EE5B4F;
  color: #FFF;
  border-radius: 3px;
  padding-top: 3px;
  margin: 2px;
`;

const StarSymbolBlank = styled.i`
  text-align: center;
  font-size: 15px
  height: 20px;
  width: 26px; 
  background-color: #333;
  opacity: 0.5;
  color: #FFF;
  border-radius: 3px;
  padding-top: 3px;
  margin: 2px;
`;

const StarsReviewsDetailsDiv = styled.div`
  margin-bottom: 7px;
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
      <StarsReviewsDetailsDiv>
        <SRDWrapper>
          <StarTitle>{[...this.state.stars]}</StarTitle>
          <ReviewCountTitle>{this.props.reviewCount} reviews</ReviewCountTitle>
          <Details
            detailsModalStatus={this.props.detailsModalStatus}
            closeDetailsModal={this.props.closeDetailsModal}
            openDetailsModal={this.props.openDetailsModal}
            detailStyle={this.props.detailStyle}
            reviews={this.props.reviews}
            reviewCount={this.props.reviewCount}
          />
        </SRDWrapper>
      </StarsReviewsDetailsDiv>
    )
  };
}

export default StarsReviewsDetails;
