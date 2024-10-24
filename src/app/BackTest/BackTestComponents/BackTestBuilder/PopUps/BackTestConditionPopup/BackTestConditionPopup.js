import { Image } from "react-bootstrap";
import OutsideClickHandler from "react-outside-click-handler";
import {
  BuilderPopUpConditionAddClicked,
  BuilderPopUpConditionAmountChanged,
  BuilderPopUpConditionCloseClicked,
  BuilderPopUpConditionFirstAssetSelected,
  BuilderPopUpConditionFirstDaysChanged,
  BuilderPopUpConditionFixedValueSelected,
  BuilderPopUpConditionOperatorSelected,
  BuilderPopUpConditionSecondAssetSelected,
  BuilderPopUpConditionSecondDaysChanged,
  BuilderPopUpConditionSecondFunctionSelected,
} from "src/utils/AnalyticsFunctions";
import { getModulusUser } from "src/utils/ManageToken";
import {
  CheckBoldWhiteIcon,
  StrategyBuilderConditionIcon,
  StrategyBuilderPopUpAcceptIcon,
  StrategyBuilderPopUpCloseIcon,
} from "../../../../../../assets/images/icons";
import { BaseReactComponent } from "../../../../../../utils/form";
import {
  mobileCheck,
  strategyBuilderAssetList,
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
        { name: "Current price", alt: "Current price" },
        { name: "Cumulative return", alt: "Cumulative return" },
        {
          name: "Exponential moving average",
          alt: "Exponential moving average",
        },
        { name: "Max drawdown", alt: "Max drawdown" },
        { name: "Moving average price", alt: "Moving average price" },
        { name: "Moving average return", alt: "Moving average return" },
        { name: "Relative strength index", alt: "Relative strength index" },
        {
          name: "Standard deviation of price",
          alt: "Standard deviation of price",
        },
        {
          name: "Standard deviation of return",
          alt: "Standard deviation of return",
        },
        {
          name: "Moving average convergence divergence",
          alt: "Moving average convergence divergence",
        },
        { name: "Volume", alt: "Volume" },
        // { name: "Market capitalization", alt: "Market capitalization" },
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
      allAssetConditions: [
        {
          name: "BTC",
          alt: "Bitcoin",
        },
        {
          name: "ETH",
          alt: "Ethereum",
        },
      ],
      selectedAssetConditions: this.props.selectedAssetConditions
        ? this.props.selectedAssetConditions
        : "",
      selectedFunctionAssetConditions: this.props
        .selectedFunctionAssetConditions
        ? this.props.selectedFunctionAssetConditions
        : "",

      // Operator condition
      allOperatorConditions: [
        { name: "greater than", alt: ">" },
        { name: "less than", alt: "<" },
        { name: "equals to", alt: "=" },
      ],
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
    const modulusUser = getModulusUser();
    if (modulusUser && modulusUser.email) {
      BuilderPopUpConditionSecondFunctionSelected({
        email_address: modulusUser.email,
        functionName: item,
      });
    }
    this.setState({
      selectedFunctionPriceConditions: item,
      selectedFunctionAmountConditions: 100,
    });
    this.props.changeFunctionPriceConditions(item);
  };
  changeFunctionAssetConditions = (item, index) => {
    const modulusUser = getModulusUser();
    if (modulusUser && modulusUser.email) {
      BuilderPopUpConditionSecondAssetSelected({
        email_address: modulusUser.email,
        assetName: item,
      });
    }
    this.setState({ selectedFunctionAssetConditions: item });
    this.props.changeFunctionAssetConditions(item);
  };
  changeFunctionDaysConditions = (item, index) => {
    const modulusUser = getModulusUser();

    if (modulusUser && modulusUser.email) {
      BuilderPopUpConditionSecondDaysChanged({
        email_address: modulusUser.email,
        days: item,
      });
    }
    this.setState({ selectedFunctionDaysConditions: item });
    this.props.changeFunctionDaysConditions(item);
  };
  // Function type
  changePriceConditions = (item, index) => {
    const modulusUser = getModulusUser();
    if (modulusUser && modulusUser.email) {
      BuilderPopUpConditionSecondFunctionSelected({
        email_address: modulusUser.email,
        functionName: item,
      });
    }
    this.setState({
      selectedPriceConditions: item,
      selectedAmountConditions: 100,
    });
    this.props.changePriceConditions(item);
  };
  changeAssetConditions = (item, index) => {
    const modulusUser = getModulusUser();
    if (modulusUser && modulusUser.email) {
      BuilderPopUpConditionFirstAssetSelected({
        email_address: modulusUser.email,
        assetName: item,
      });
    }
    this.setState({ selectedAssetConditions: item });
    this.props.changeAssetConditions(item);
  };
  changeOperatorConditions = (item, index) => {
    const modulusUser = getModulusUser();
    if (modulusUser && modulusUser.email) {
      BuilderPopUpConditionOperatorSelected({
        email_address: modulusUser.email,
        operatorName: item,
      });
    }
    this.setState({ selectedOperatorConditions: item });
    this.props.changeOperatorConditions(item);
  };
  changeAmountConditions = (item, index) => {
    const modulusUser = getModulusUser();
    if (modulusUser && modulusUser.email) {
      BuilderPopUpConditionAmountChanged({
        email_address: modulusUser.email,
        amount: item,
      });
    }
    this.setState({ selectedAmountConditions: item });
    this.props.changeAmountConditions(item);
  };
  changeDaysConditions = (item, index) => {
    const modulusUser = getModulusUser();
    if (modulusUser && modulusUser.email) {
      BuilderPopUpConditionFirstDaysChanged({
        email_address: modulusUser.email,
        days: item,
      });
    }
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
        this.props.selectedFunctionDaysConditions ||
      prevProps.selectedAmountConditions !== this.props.selectedAmountConditions
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
        selectedDaysConditions: this.props.selectedDaysConditions
          ? this.props.selectedDaysConditions
          : "",
        selectedAmountConditions: this.props.selectedAmountConditions
          ? this.props.selectedAmountConditions
          : "",
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
      const modulusUser = getModulusUser();
      if (modulusUser && modulusUser.email) {
        BuilderPopUpConditionFixedValueSelected({
          email_address: modulusUser.email,
        });
      }
      this.props.changeFunctionFixedToggle("FIXED");
    } else {
      this.props.changeFunctionFixedToggle("FUNCTION");
    }
  };
  componentDidMount() {
    let tempItem = strategyBuilderAssetList();
    let tempHolder = [];
    for (let i = 0; i < tempItem.length; i++) {
      let tempObj = {
        name: tempItem[i].name,
        alt: tempItem[i].fullName,
      };
      tempHolder.push(tempObj);
    }
    this.setState({
      allAssetConditions: tempHolder,
    });
  }
  handleKeyDown = (e) => {
    if (e.key === "Enter") {
      this.closePopUpPass();
    }
  };
  closePopUpPass = () => {
    this.props.closePopUp();
  };
  onCloseClicked = (e) => {
    e.stopPropagation();
    this.closePopUpPass();
    const modulusUser = getModulusUser();
    if (modulusUser)
      BuilderPopUpConditionCloseClicked({
        email_address: modulusUser.email,
      });
  };
  onAddClicked = (e) => {
    e.stopPropagation();
    this.closePopUpPass();
    const modulusUser = getModulusUser();
    if (modulusUser)
      BuilderPopUpConditionAddClicked({
        email_address: modulusUser.email,
      });
  };

  render() {
    return (
      <div
        className={`back-test-condition-popup-container ${
          this.state.isMobile
            ? "back-test-condition-popup-container-mobile"
            : ""
        }`}
      >
        <OutsideClickHandler onOutsideClick={this.closePopUpPass}>
          <div className="back-test-condition-popup">
            <div className="back-test-condition-popup-header-container">
              <div className="back-test-condition-popup-header-text">
                <Image
                  className="back-test-condition-popup-header-text-icon"
                  src={StrategyBuilderConditionIcon}
                />
                <div>Adjust condition</div>
              </div>
              <div className="back-test-condition-popup-header-btns">
                <div
                  onClick={this.onAddClicked}
                  className="back-test-condition-popup-header-btn back-test-condition-popup-header-btn-highlighted"
                >
                  <Image
                    src={StrategyBuilderPopUpAcceptIcon}
                    className="back-test-condition-popup-header-btn-icon "
                  />
                </div>
                <div
                  onClick={this.onCloseClicked}
                  className="back-test-condition-popup-header-btn"
                >
                  <Image
                    src={StrategyBuilderPopUpCloseIcon}
                    className="back-test-condition-popup-header-btn-icon "
                  />
                </div>
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
                      handleKeyDown={this.handleKeyDown}
                    />
                    <div className="back-test-condition-popup-body-colored-text ">
                      day
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
                    Fixed value ({this.props.selectedAmountSymbol})
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
                          handleKeyDown={this.handleKeyDown}
                        />
                        <div className="back-test-condition-popup-body-colored-text ">
                          day
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
                    // selectedAmountSymbol={this.props.selectedAmountSymbol}
                    onOptionSelect={this.changeAmountConditions}
                    handleKeyDown={this.handleKeyDown}
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
