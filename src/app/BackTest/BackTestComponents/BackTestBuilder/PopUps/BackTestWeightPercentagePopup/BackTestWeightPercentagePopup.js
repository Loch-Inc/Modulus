import { Image } from "react-bootstrap";
import OutsideClickHandler from "react-outside-click-handler";
import {
  StrategyBuilderPopUpAcceptIcon,
  StrategyBuilderPopUpCloseIcon,
  StrategyBuilderWeightIcon,
} from "../../../../../../assets/images/icons";
import { BaseReactComponent } from "../../../../../../utils/form";
import { mobileCheck } from "../../../../../../utils/ReusableFunctions";
import BackTestPopupInput from "../BackTestPopupInput/BackTestPopupInput";
import "./_backTestWeightPercentagePopup.scss";
import { BuilderPopUpWeightPercentageChanged } from "src/utils/AnalyticsFunctions";
import { getModulusUser } from "src/utils/ManageToken";

class BackTestWeightPercentagePopup extends BaseReactComponent {
  constructor(props) {
    super(props);
    this.state = {
      //Price condition
      isMobile: mobileCheck(),
      selectedWeightPercentage: this.props.selectedOption
        ? this.props.selectedOption
        : "0",
    };
  }
  changeWeightPercentage = (item, index) => {
    const modulusUser = getModulusUser();
    if (modulusUser && modulusUser.email) {
      BuilderPopUpWeightPercentageChanged({
        email_address: modulusUser.email,
        weightName: item,
      });
    }
    this.setState({ selectedWeightPercentage: item });
    this.props.onOptionSelect(item);
  };
  handleKeyDown = (e) => {
    if (e.key === "Enter") {
      this.props.closePopUp();
    }
  };
  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    return (
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`back-test-weight-percentage-popup-container ${
          this.state.isMobile
            ? "back-test-weight-percentage-popup-container-mobile"
            : ""
        }`}
      >
        <OutsideClickHandler onOutsideClick={this.props.closePopUp}>
          <div className="back-test-weight-percentage-popup">
            <div className="back-test-weight-percentage-popup-header-container">
              <div className="back-test-weight-percentage-popup-header-text">
                <Image
                  className="back-test-weight-percentage-popup-header-text-icon"
                  src={StrategyBuilderWeightIcon}
                />
                <div>Adjust weight percentage</div>
              </div>
              <div className="back-test-weight-percentage-popup-header-btns">
                <div
                  onClick={this.props.closePopUp}
                  className="back-test-weight-percentage-popup-header-btn back-test-weight-percentage-popup-header-btn-highlighted"
                >
                  <Image
                    src={StrategyBuilderPopUpAcceptIcon}
                    className="back-test-weight-percentage-popup-header-btn-icon "
                  />
                </div>
                <div
                  onClick={this.props.closePopUp}
                  className="back-test-weight-percentage-popup-header-btn"
                >
                  <Image
                    src={StrategyBuilderPopUpCloseIcon}
                    className="back-test-weight-percentage-popup-header-btn-icon "
                  />
                </div>
              </div>
            </div>
            <div className="back-test-weight-percentage-popup-body">
              <div className="back-test-weight-percentage-popup-body-row">
                <div className="back-test-weight-percentage-popup-body-colored-block">
                  Weight allocated
                </div>

                <BackTestPopupInput
                  selectedOption={this.state.selectedWeightPercentage}
                  isInputDropDown
                  selectedAmountSymbol="%"
                  onOptionSelect={this.changeWeightPercentage}
                  limitAmounTo={100}
                  handleKeyDown={this.handleKeyDown}
                />
              </div>
            </div>
          </div>
        </OutsideClickHandler>
      </div>
    );
  }
}

export default BackTestWeightPercentagePopup;
