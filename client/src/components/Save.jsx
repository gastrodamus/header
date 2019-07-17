import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

Modal.setAppElement(document.getElementById('app'))

const SaveTitle = styled.button`
  height: 31px;
  font-size: 12px;
  font-weight: bold;
  border-radius: 4px;
  font-family: "Helvetica Neue", Helvetica, Arial;
  color: #666666;
  background: #FFFFFF;
  padding: 5px 8px;
  outline: none;
  &:hover {
    cursor: pointer;
    background: rgb(245, 245, 245);
  }
`;

const SignUpMunch = styled.h2`
  font-size: 22px;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: bold;
  color: #d32323;
  margin-bottom: 6px;
  display: flex;
  justify-content: center;
`;

const ConnectWithMunch = styled.p`
  font-size: 14px;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: bold;
  color: #333333;
  margin-bottom: 12px;
  display: flex;
  justify-content: center;
`;

const LegalMunch = styled.p`
  font-size: 12px;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: #333333;
  display: flex;
  justify-content: center;
  text-align: center;
`;

const FBButton = styled.button`
  text-align: center;
  background: #3b5998;
  color: #fff;
  border: 4px solid #3b5998;
  font-weight: bold;
  text-align: center;
  font-size: 14px;
  border-radius: 3px;
  width: 390px;
  margin: 5px;
`;

const GoogleButton = styled.button`
  text-align: center;
  background: #FFF;
  color: #666;
  border: 1px solid #666;
  font-weight: bold;
  text-align: center;
  font-size: 14px;
  border-radius: 3px;
  width: 390px;
  padding: 5px;
  margin 5px;
`;

const InputForm = styled.input`
  background: #fff;
  margin-bottom: 9px;
  padding: 5px 9px;
  font-size: 14px;
  border: 1px solid #999;
  border-radius: 3px;
  display: inline-block;
  margin-right: 10px;
`;

const InputFullForm = styled.input`
  background: #fff;
  margin-bottom: 9px;
  padding: 5px 9px;
  font-size: 14px;
  border: 1px solid #999;
  border-radius: 3px;
  width: 330px;
`;

const BirthdayText = styled.div`
  text-align: left;
  font-size: 14px;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: #333333;
  font-weight: bold;
  margin-left: 75px;
`;

const BirthdayOptions = styled.select`
  width: 120px;
  height: 30px;
`;

const SignUpButton = styled.button`
  background: #d32323;
  color: #fff;
  padding: 10px 13px;
  font-size: 16px;
  &:hover {
    cursor: pointer;
  }
  width: 330px;
  border-radius: 5px;
`;

const MemberLoginText = styled.small`
  font-size: 12px;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: #999999;
  text-align: center;
  margin-left: 200px;
`;

const Link = styled.a`
  color: #0073bb;
  text-decoration: underline;
  &:hover {
    cursor: pointer;
  }
`;

const Save = (props) => {
  const saveStyle = Object.assign({}, props.saveStyle)
  return (
    <div>
      <SaveTitle
        className="save"
        onClick={props.openSaveModal}
      ><i className="fas fa-bookmark"></i> Save
      </SaveTitle>
      <Modal
        isOpen={props.saveModalStatus}
        onRequestClose={props.closeSaveModal}
        style={saveStyle}
      >
        <div>
          <SignUpMunch>Sign Up for Munch</SignUpMunch>
          <ConnectWithMunch>Connect with great local businesses</ConnectWithMunch>
          <LegalMunch>By continuing, you agree to Munch's Terms Of Service and acknowledge Munch's Privacy Policy.</LegalMunch>
          <FBButton><i className="fab fa-facebook-square"></i> Sign Up with Facebook</FBButton>
          <GoogleButton><i className="fab fa-google"></i> Sign Up with Google</GoogleButton>
          <LegalMunch>Don't worry, we never post without your permission.</LegalMunch>
          <hr></hr>
        </div>
        <form>
          <div>
            <InputForm placeholder="First Name"></InputForm>
            <InputForm placeholder="Last Name"></InputForm>
            <InputFullForm placeholder="Email"></InputFullForm>
            <InputFullForm placeholder="Password"></InputFullForm>
            <InputFullForm placeholder="ZIP Code"></InputFullForm>
          </div>
          <div>
            <BirthdayText>
              <label>Birthday</label>
              <span> Optional</span>
            </BirthdayText>
            <div>
              <BirthdayOptions className="month">
                <option value>Month</option>
                <option value="1">Jan</option>
                <option value="2">Feb</option>
                <option value="3">Mar</option>
                <option value="4">Apr</option>
                <option value="5">May</option>
                <option value="6">Jun</option>
                <option value="7">Jul</option>
                <option value="8">Aug</option>
                <option value="9">Sep</option>
                <option value="10">Oct</option>
                <option value="11">Nov</option>
                <option value="12">Dec</option>
              </BirthdayOptions>
              <BirthdayOptions className="day">
                <option value>Day</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <option value="24">24</option>
                <option value="25">25</option>
                <option value="26">26</option>
                <option value="27">27</option>
                <option value="28">28</option>
                <option value="29">29</option>
                <option value="30">30</option>
                <option value="31">31</option>
              </BirthdayOptions>
              <BirthdayOptions className="year">
                <option value>Year</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
                <option value="2015">2015</option>
                <option value="2014">2014</option>
                <option value="2013">2013</option>
                <option value="2012">2012</option>
                <option value="2011">2011</option>
                <option value="2010">2010</option>
                <option value="2009">2009</option>
                <option value="2008">2008</option>
                <option value="2007">2007</option>
                <option value="2006">2006</option>
                <option value="2005">2005</option>
                <option value="2004">2004</option>
                <option value="2003">2003</option>
                <option value="2002">2002</option>
                <option value="2001">2001</option>
                <option value="2000">2000</option>
                <option value="1999">1999</option>
                <option value="1998">1998</option>
                <option value="1997">1997</option>
                <option value="1996">1996</option>
                <option value="1995">1995</option>
                <option value="1994">1994</option>
                <option value="1993">1993</option>
                <option value="1992">1992</option>
                <option value="1991">1991</option>
                <option value="1990">1990</option>
                <option value="1989">1989</option>
                <option value="1988">1988</option>
                <option value="1987">1987</option>
                <option value="1986">1986</option>
                <option value="1985">1985</option>
                <option value="1984">1984</option>
                <option value="1983">1983</option>
                <option value="1982">1982</option>
                <option value="1981">1981</option>
                <option value="1980">1980</option>
                <option value="1979">1979</option>
                <option value="1978">1978</option>
                <option value="1977">1977</option>
                <option value="1976">1976</option>
                <option value="1975">1975</option>
                <option value="1974">1974</option>
                <option value="1973">1973</option>
                <option value="1972">1972</option>
                <option value="1971">1971</option>
                <option value="1970">1970</option>
                <option value="1969">1969</option>
                <option value="1968">1968</option>
                <option value="1967">1967</option>
                <option value="1966">1966</option>
                <option value="1965">1965</option>
                <option value="1964">1964</option>
                <option value="1963">1963</option>
                <option value="1962">1962</option>
                <option value="1961">1961</option>
                <option value="1960">1960</option>
                <option value="1959">1959</option>
                <option value="1958">1958</option>
                <option value="1957">1957</option>
                <option value="1956">1956</option>
                <option value="1955">1955</option>
                <option value="1954">1954</option>
                <option value="1953">1953</option>
                <option value="1952">1952</option>
                <option value="1951">1951</option>
                <option value="1950">1950</option>
                <option value="1949">1949</option>
                <option value="1948">1948</option>
                <option value="1947">1947</option>
                <option value="1946">1946</option>
                <option value="1945">1945</option>
                <option value="1944">1944</option>
                <option value="1943">1943</option>
                <option value="1942">1942</option>
                <option value="1941">1941</option>
                <option value="1940">1940</option>
                <option value="1939">1939</option>
                <option value="1938">1938</option>
                <option value="1937">1937</option>
                <option value="1936">1936</option>
                <option value="1935">1935</option>
                <option value="1934">1934</option>
                <option value="1933">1933</option>
                <option value="1932">1932</option>
                <option value="1931">1931</option>
                <option value="1930">1930</option>
                <option value="1929">1929</option>
                <option value="1928">1928</option>
                <option value="1927">1927</option>
                <option value="1926">1926</option>
                <option value="1925">1925</option>
                <option value="1924">1924</option>
                <option value="1923">1923</option>
                <option value="1922">1922</option>
                <option value="1921">1921</option>
                <option value="1920">1920</option>
                <option value="1919">1919</option>
                <option value="1918">1918</option>
                <option value="1917">1917</option>
                <option value="1916">1916</option>
                <option value="1915">1915</option>
                <option value="1914">1914</option>
                <option value="1913">1913</option>
                <option value="1912">1912</option>
                <option value="1911">1911</option>
                <option value="1910">1910</option>
                <option value="1909">1909</option>
                <option value="1908">1908</option>
                <option value="1907">1907</option>
                <option value="1906">1906</option>
                <option value="1905">1905</option>
                <option value="1904">1904</option>
                <option value="1903">1903</option>
                <option value="1902">1902</option>
                <option value="1901">1901</option>
              </BirthdayOptions>
            </div>
          </div>
          <LegalMunch>You also understand that Munch may send marketing emails about Munch's products, services, and local events. You can unsubscribe at any time.</LegalMunch>
          <SignUpButton>Sign Up</SignUpButton>
        </form>
        <div>
          <MemberLoginText>Already on Munch? <Link>Log in</Link></MemberLoginText>
        </div>
      </Modal>
    </div>
  );
};

export default Save;
