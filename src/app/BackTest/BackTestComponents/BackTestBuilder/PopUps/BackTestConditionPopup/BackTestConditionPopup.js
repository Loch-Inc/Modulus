import { Image } from "react-bootstrap";
import OutsideClickHandler from "react-outside-click-handler";
import {
  CheckBoldWhiteIcon,
  StrategyBuilderConditionIcon,
  StrategyBuilderPopUpCloseIcon,
} from "../../../../../../assets/images/icons";
import { BaseReactComponent } from "../../../../../../utils/form";
import {
  mobileCheck,
  strategyBuilderAssetListriod,
  strategyBuilderLimitAmountTo,
  strategyBuilderTypeConvertorTextToSymbol,
} from "../../../../../../utils/ReusableFunctions";
import BackTestPopupDropdown from "../BackTestPopupDropdown/BackTestPopupDropdown";
import BackTestPopupInput from "../BackTestPopupInput/BackTestPopupInput";
import "./_backTestConditionPopup.scss";

class BackTestConditionPopup extends BaseReactComponent {
  constructor(props) {
    super(props);
    this.state = {
      //Price condition
      isMobile: mobileCheck(),
      allPriceConditions: [
        "Current price",
        "Cumulative return",
        "Exponential moving average",
        "Max drawdown",
        "Moving average price",
        "Moving average return",
        "Relative strength index",
        "Standard deviation of price",
        "Standard deviation of return",
        "Moving average convergence divergence",
        "Volume",
        "Market capitalization",
      ],
      selectedPriceConditions: this.props.selectedPriceConditions
        ? this.props.selectedPriceConditions
        : "",
      selectedFunctionPriceConditions: this.props
        .selectedFunctionPriceConditions
        ? this.props.selectedFunctionPriceConditions
        : "",
      selectedFunctionDaysConditions: this.props.selectedFunctionDaysConditions
        ? this.props.selectedFunctionDaysConditions
        : "",

      //Asset condition
      allAssetConditions: ["BTC", "ETH"],
      selectedAssetConditions: this.props.selectedAssetConditions
        ? this.props.selectedAssetConditions
        : "",
      selectedFunctionAssetConditions: this.props
        .selectedFunctionAssetConditions
        ? this.props.selectedFunctionAssetConditions
        : "",

      // Operator condition
      allOperatorConditions: ["greater than", "less than", "equals to"],
      selectedOperatorConditions: this.props.selectedOperatorConditions
        ? this.props.selectedOperatorConditions
        : "",

      // Amount condition

      selectedAmountConditions: this.props.selectedAmountConditions
        ? "" + this.props.selectedAmountConditions
        : "",
      selectedDaysConditions: this.props.selectedDaysConditions
        ? this.props.selectedDaysConditions
        : "",
      selectedFunctionAmountConditions: this.props
        .selectedFunctionAmountConditions
        ? this.props.selectedFunctionAmountConditions
        : "",
      shouldUpdateText: false,
    };
  }
  // Function type
  changeFunctionPriceConditions = (item, index) => {
    this.setState({
      selectedFunctionPriceConditions: item,
      selectedFunctionAmountConditions: 100,
    });
    this.props.changeFunctionPriceConditions(item);
  };
  changeFunctionAssetConditions = (item, index) => {
    this.setState({ selectedFunctionAssetConditions: item });
    this.props.changeFunctionAssetConditions(item);
  };
  changeFunctionDaysConditions = (item, index) => {
    this.setState({ selectedFunctionDaysConditions: item });
    this.props.changeFunctionDaysConditions(item);
  };
  // Function type
  changePriceConditions = (item, index) => {
    this.setState({
      selectedPriceConditions: item,
      selectedAmountConditions: 100,
    });
    this.props.changePriceConditions(item);
  };
  changeAssetConditions = (item, index) => {
    this.setState({ selectedAssetConditions: item });
    this.props.changeAssetConditions(item);
  };
  changeOperatorConditions = (item, index) => {
    this.setState({ selectedOperatorConditions: item });
    this.props.changeOperatorConditions(item);
  };
  changeAmountConditions = (item, index) => {
    this.setState({ selectedAmountConditions: item });
    this.props.changeAmountConditions(item);
  };
  changeDaysConditions = (item, index) => {
    this.setState({ selectedDaysConditions: item });
    this.props.changeDaysConditions(item);
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.selectedPriceConditions !==
        this.props.selectedPriceConditions ||
      prevProps.selectedAssetConditions !==
        this.props.selectedAssetConditions ||
      prevProps.selectedOperatorConditions !==
        this.props.selectedOperatorConditions ||
      prevProps.selectedFunctionPriceConditions !==
        this.props.selectedFunctionPriceConditions ||
      prevProps.selectedFunctionAssetConditions !==
        this.props.selectedFunctionAssetConditions ||
      prevProps.selectedFunctionDaysConditions !==
        this.props.selectedFunctionDaysConditions
    ) {
      this.setState({
        selectedPriceConditions: this.props.selectedPriceConditions,
        selectedAssetConditions: this.props.selectedAssetConditions,
        selectedOperatorConditions: this.props.selectedOperatorConditions,
        selectedFunctionPriceConditions:
          this.props.selectedFunctionPriceConditions,
        selectedFunctionAssetConditions:
          this.props.selectedFunctionAssetConditions,
        selectedFunctionDaysConditions:
          this.props.selectedFunctionDaysConditions,
      });
    }
    if (
      prevState.selectedPriceConditions !== this.state.selectedPriceConditions
    ) {
      this.setState({
        shouldUpdateText: !this.state.shouldUpdateText,
      });
    }
  }
  switchFunctionFixedToggle = () => {
    if (this.props.isFunction) {
      this.props.changeFunctionFixedToggle("fixed");
    } else {
      this.props.changeFunctionFixedToggle("function");
    }
  };
  componentDidMount() {
    let tempItem = strategyBuilderAssetListriod();
    let tempHolder = [];
    for (let i = 0; i < tempItem.length; i++) {
      tempHolder.push(tempItem[i].name);
    }
    this.setState({
      allAssetConditions: tempHolder,
    });
  }

  render() {
    return (
      <div
        className={`back-test-condition-popup-container ${
          this.state.isMobile
            ? "back-test-condition-popup-container-mobile"
            : ""
        }`}
      >
        <OutsideClickHandler onOutsideClick={this.props.closePopUp}>
          <div className="back-test-condition-popup">
            <div className="back-test-condition-popup-header-container">
              <div className="back-test-condition-popup-header-text">
                <Image
                  className="back-test-condition-popup-header-text-icon"
                  src={StrategyBuilderConditionIcon}
                />
                <div>Adjust condition</div>
              </div>
              <div
                onClick={this.props.closePopUp}
                className="back-test-condition-popup-header-close"
              >
                <Image
                  src={StrategyBuilderPopUpCloseIcon}
                  className="back-test-condition-popup-header-close-icon "
                />
              </div>
            </div>
            <div className="back-test-condition-popup-body">
              <div className="back-test-condition-popup-body-row">
                <div className="back-test-condition-popup-body-colored-block">
                  if
                </div>
                {this.props.shouldShowDays ? (
                  <>
                    <BackTestPopupInput
                      smallerInput
                      selectedOption={this.state.selectedDaysConditions}
                      isInputDropDown
                      onOptionSelect={this.changeDaysConditions}
                    />
                    <div className="back-test-condition-popup-body-colored-text ">
                      {this.state.selectedDaysConditions === "1"
                        ? "day"
                        : "days"}
                    </div>
                  </>
                ) : null}
                <BackTestPopupDropdown
                  allOptions={this.state.allPriceConditions}
                  selectedOption={this.state.selectedPriceConditions}
                  onOptionSelect={this.changePriceConditions}
                />
                <div className="back-test-condition-popup-body-colored-text">
                  of
                </div>
                <BackTestPopupDropdown
                  allOptions={this.state.allAssetConditions}
                  selectedOption={this.state.selectedAssetConditions}
                  onOptionSelect={this.changeAssetConditions}
                />
              </div>
              <div className="back-test-condition-popup-body-row">
                <div className="back-test-condition-popup-body-colored-block">
                  is
                </div>
                <BackTestPopupDropdown
                  allOptions={this.state.allOperatorConditions}
                  selectedOption={this.state.selectedOperatorConditions}
                  onOptionSelect={this.changeOperatorConditions}
                />
                <div
                  onClick={this.switchFunctionFixedToggle}
                  className="back-test-condition-popup-body-toggle"
                >
                  <div
                    className={`back-test-condition-popup-body-toggle-switch ${
                      this.props.isFunction
                        ? ""
                        : "back-test-condition-popup-body-toggle-switch-on"
                    }`}
                  >
                    <CheckBoldWhiteIcon />
                  </div>
                  <div className="back-test-condition-popup-body-toggle-text">
                    Fixed value
                  </div>
                </div>
              </div>
              <div className="back-test-condition-popup-body-row">
                <div className="back-test-condition-popup-body-colored-block zeroOpacity">
                  is
                </div>
                {this.props.isFunction ? (
                  <>
                    {this.props.shouldShowFunctionDays ? (
                      <>
                        <BackTestPopupInput
                          smallerInput
                          selectedOption={
                            this.state.selectedFunctionDaysConditions
                          }
                          isInputDropDown
                          onOptionSelect={this.changeFunctionDaysConditions}
                        />
                        <div className="back-test-condition-popup-body-colored-text ">
                          {this.state.selectedDaysConditions === "1"
                            ? "day"
                            : "days"}
                        </div>
                      </>
                    ) : null}
                    <BackTestPopupDropdown
                      allOptions={this.state.allPriceConditions}
                      selectedOption={
                        this.state.selectedFunctionPriceConditions
                      }
                      onOptionSelect={this.changeFunctionPriceConditions}
                    />
                    <div className="back-test-condition-popup-body-colored-text">
                      of
                    </div>
                    <BackTestPopupDropdown
                      allOptions={this.state.allAssetConditions}
                      selectedOption={
                        this.state.selectedFunctionAssetConditions
                      }
                      onOptionSelect={this.changeFunctionAssetConditions}
                    />
                  </>
                ) : (
                  <BackTestPopupInput
                    limitAmounTo={strategyBuilderLimitAmountTo(
                      strategyBuilderTypeConvertorTextToSymbol(
                        this.state.selectedPriceConditions
                      )
                    )}
                    updatedText={this.state.shouldUpdateText}
                    selectedOption={this.state.selectedAmountConditions}
                    isInputDropDown
                    selectedAmountSymbol={this.props.selectedAmountSymbol}
                    onOptionSelect={this.changeAmountConditions}
                  />
                )}
              </div>
            </div>
          </div>
        </OutsideClickHandler>
      </div>
    );
  }
}

export default BackTestConditionPopup;
