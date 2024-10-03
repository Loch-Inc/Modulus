import { DEFAULT_STRATEGY_NAME } from "src/utils/Constant";
import { BaseReactComponent } from "../../../../../../utils/form";
import {
  strategyBuilderChartShouldShowDate,
  strategyBuilderChartWhichSymbol,
  strategyBuilderOperatorConvertorSymbolToText,
  strategyBuilderOperatorConvertorTextToSymbol,
  strategyBuilderTypeConvertorSymbolToText,
  strategyBuilderTypeConvertorTextToSymbol,
} from "../../../../../../utils/ReusableFunctions";
import BackTestConditionPopup from "../../PopUps/BackTestConditionPopup/BackTestConditionPopup";
import "./_backTestConditionBuilderBlock.scss";

class BackTestConditionBuilderBlock extends BaseReactComponent {
  constructor(props) {
    super(props);
    this.state = {
      amount: props.amount,
      operator: props.operator,
      token: props.token,
      type: props.type,

      selectedPriceConditions: "",
      selectedAssetConditions: "",
      selectedOperatorConditions: "",
      selectedDaysConditions: "",
      selectedAmountConditions: 0,
      shouldShowDays: false,
      shouldShowFunctionDays: false,
      isPopUpOpen:
        props.saveStrategyName === DEFAULT_STRATEGY_NAME ? true : false,
      selectedAmountSymbol: "",

      // inside function
      selectedFunctionPriceConditions: "",
      selectedFunctionAssetConditions: "",
      selectedFunctionDaysConditions: "",
    };
  }
  componentDidMount() {
    this.setState({
      selectedPriceConditions: strategyBuilderTypeConvertorSymbolToText(
        this.props.type
      ),
      selectedFunctionPriceConditions: strategyBuilderTypeConvertorSymbolToText(
        this.props.function_type
      ),
      selectedAssetConditions: this.props.token,
      selectedFunctionAssetConditions: this.props.function_token,
      selectedDaysConditions: this.props.time_period,
      selectedFunctionDaysConditions: this.props.function_time_period,
      shouldShowDays: strategyBuilderChartShouldShowDate(this.props.type),
      shouldShowFunctionDays: strategyBuilderChartShouldShowDate(
        this.props.function_type
      ),
      selectedAmountSymbol: strategyBuilderChartWhichSymbol(this.props.type),
      selectedOperatorConditions: strategyBuilderOperatorConvertorSymbolToText(
        this.props.operator
      ),
      selectedAmountConditions: this.props.amount,
    });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.editBtnClicked !== this.props.editBtnClicked) {
      this.openPopUp();
    }
    if (prevProps.amount !== this.props.amount) {
      this.setState({ selectedAmountConditions: this.props.amount });
    }
    if (prevProps.operator !== this.props.operator) {
      let operatorSymbol = "";
      operatorSymbol = strategyBuilderOperatorConvertorSymbolToText(
        this.props.operator
      );
      this.setState({ selectedOperatorConditions: operatorSymbol });
    }
    if (prevProps.token !== this.props.token) {
      this.setState({ selectedAssetConditions: this.props.token });
    }
    if (prevProps.time_period !== this.props.time_period) {
      this.setState({ selectedDaysConditions: this.props.time_period });
    }
    if (prevProps.type !== this.props.type) {
      this.setState({
        selectedPriceConditions: strategyBuilderTypeConvertorSymbolToText(
          this.props.type
        ),
        selectedAmountConditions: this.props.amount,
        shouldShowDays: strategyBuilderChartShouldShowDate(this.props.type),
        selectedAmountSymbol: strategyBuilderChartWhichSymbol(this.props.type),
      });
    }
    if (prevProps.function_token !== this.props.function_token) {
      this.setState({
        selectedFunctionAssetConditions: this.props.function_token,
      });
    }
    if (prevProps.function_time_period !== this.props.function_time_period) {
      this.setState({
        selectedFunctionDaysConditions: this.props.function_time_period,
      });
    }
    if (prevProps.function_type !== this.props.function_type) {
      this.setState({
        selectedFunctionPriceConditions:
          strategyBuilderTypeConvertorSymbolToText(this.props.function_type),
        shouldShowFunctionDays: strategyBuilderChartShouldShowDate(
          this.props.function_type
        ),
      });
    }
  }
  closePopUp = () => {
    this.setState({ isPopUpOpen: false });
  };
  openPopUp = () => {
    this.setState({ isPopUpOpen: true });
  };
  // Inside function
  changeFunctionPriceConditions = (passedItem) => {
    let itemToBeChangedOriginal = structuredClone(
      this.props.strategyBuilderString
    );
    let itemToBeChanged = itemToBeChangedOriginal;
    this.props.path.forEach((element) => {
      itemToBeChanged = itemToBeChanged[element];
    });

    itemToBeChanged.compare_function.type =
      strategyBuilderTypeConvertorTextToSymbol(passedItem);
    itemToBeChanged.compare_function.amount = 100;

    if (this.props.changeStrategyBuilderString) {
      this.props.changeStrategyBuilderString(itemToBeChangedOriginal);
    }
  };
  changeFunctionAssetConditions = (passedItem) => {
    let itemToBeChangedOriginal = structuredClone(
      this.props.strategyBuilderString
    );
    let itemToBeChanged = itemToBeChangedOriginal;
    this.props.path.forEach((element) => {
      itemToBeChanged = itemToBeChanged[element];
    });
    itemToBeChanged.compare_function.token = passedItem;
    if (this.props.changeStrategyBuilderString) {
      this.props.changeStrategyBuilderString(itemToBeChangedOriginal);
    }
  };
  changeFunctionDaysConditions = (passedItem) => {
    let itemToBeChangedOriginal = structuredClone(
      this.props.strategyBuilderString
    );
    let itemToBeChanged = itemToBeChangedOriginal;
    this.props.path.forEach((element) => {
      itemToBeChanged = itemToBeChanged[element];
    });
    itemToBeChanged.compare_function.time_period = passedItem;
    if (this.props.changeStrategyBuilderString) {
      this.props.changeStrategyBuilderString(itemToBeChangedOriginal);
    }
  };

  // Inside function
  changeFunctionFixedToggle = (passedItem) => {
    let itemToBeChangedOriginal = structuredClone(
      this.props.strategyBuilderString
    );
    let itemToBeChanged = itemToBeChangedOriginal;
    this.props.path.forEach((element) => {
      itemToBeChanged = itemToBeChanged[element];
    });
    itemToBeChanged.compare_type = passedItem;
    if (this.props.changeStrategyBuilderString) {
      this.props.changeStrategyBuilderString(itemToBeChangedOriginal);
    }
  };
  changePriceConditions = (passedItem) => {
    let itemToBeChangedOriginal = structuredClone(
      this.props.strategyBuilderString
    );
    let itemToBeChanged = itemToBeChangedOriginal;
    this.props.path.forEach((element) => {
      itemToBeChanged = itemToBeChanged[element];
    });

    itemToBeChanged.type = strategyBuilderTypeConvertorTextToSymbol(passedItem);

    itemToBeChanged.amount = 100;

    if (this.props.changeStrategyBuilderString) {
      this.props.changeStrategyBuilderString(itemToBeChangedOriginal);
    }
  };
  changeAssetConditions = (passedItem) => {
    let itemToBeChangedOriginal = structuredClone(
      this.props.strategyBuilderString
    );
    let itemToBeChanged = itemToBeChangedOriginal;
    this.props.path.forEach((element) => {
      itemToBeChanged = itemToBeChanged[element];
    });
    itemToBeChanged.token = passedItem;
    if (this.props.changeStrategyBuilderString) {
      this.props.changeStrategyBuilderString(itemToBeChangedOriginal);
    }
  };
  changeOperatorConditions = (passedItem) => {
    let itemToBeChangedOriginal = structuredClone(
      this.props.strategyBuilderString
    );
    let itemToBeChanged = itemToBeChangedOriginal;
    this.props.path.forEach((element) => {
      itemToBeChanged = itemToBeChanged[element];
    });
    itemToBeChanged.operator =
      strategyBuilderOperatorConvertorTextToSymbol(passedItem);
    if (this.props.changeStrategyBuilderString) {
      this.props.changeStrategyBuilderString(itemToBeChangedOriginal);
    }
  };
  changeAmountConditions = (passedItem) => {
    let itemToBeChangedOriginal = structuredClone(
      this.props.strategyBuilderString
    );
    let itemToBeChanged = itemToBeChangedOriginal;
    this.props.path.forEach((element) => {
      itemToBeChanged = itemToBeChanged[element];
    });
    itemToBeChanged.amount = passedItem;
    if (this.props.changeStrategyBuilderString) {
      this.props.changeStrategyBuilderString(itemToBeChangedOriginal);
    }
  };
  changeDaysConditions = (passedItem) => {
    let itemToBeChangedOriginal = structuredClone(
      this.props.strategyBuilderString
    );
    let itemToBeChanged = itemToBeChangedOriginal;
    this.props.path.forEach((element) => {
      itemToBeChanged = itemToBeChanged[element];
    });
    itemToBeChanged.time_period = passedItem;
    if (this.props.changeStrategyBuilderString) {
      this.props.changeStrategyBuilderString(itemToBeChangedOriginal);
    }
  };

  render() {
    console.log("props.saveStrategyName ", this.props.saveStrategyName);
    return (
      <>
        <div className="sbb-content">
          <div className="back-test-condition-builder">
            <div className="dotDotText">
              {this.state.shouldShowDays ? (
                <>
                  {this.state.selectedDaysConditions
                    ? this.state.selectedDaysConditions
                    : "0"}
                  {"d "}
                  {"  "}
                </>
              ) : null}
              <span className="back-test-condition-builder-grey-text">
                {this.state.selectedPriceConditions}
              </span>{" "}
              of {this.state.selectedAssetConditions} is{" "}
              <span className="back-test-condition-builder-grey-text">
                {this.state.selectedOperatorConditions}
              </span>{" "}
              {this.props.compare_type === "function" ? (
                <span>
                  {this.state.shouldShowFunctionDays ? (
                    <>
                      {this.state.selectedFunctionDaysConditions
                        ? this.state.selectedFunctionDaysConditions
                        : "0"}
                      {"d "}
                      {"  "}
                    </>
                  ) : null}
                  <span className="back-test-condition-builder-grey-text">
                    {this.state.selectedFunctionPriceConditions}
                  </span>{" "}
                  of {this.state.selectedFunctionAssetConditions}
                </span>
              ) : (
                <span>
                  {this.state.selectedAmountSymbol === "$" ? "$" : ""}
                  {this.state.selectedAmountConditions
                    ? this.state.selectedAmountConditions
                    : 0}
                  {this.state.selectedAmountSymbol === "%" ? "%" : ""}{" "}
                </span>
              )}
            </div>
            {this.state.isPopUpOpen ? (
              <BackTestConditionPopup
                changeFunctionFixedToggle={this.changeFunctionFixedToggle}
                changePriceConditions={this.changePriceConditions}
                changeAssetConditions={this.changeAssetConditions}
                changeOperatorConditions={this.changeOperatorConditions}
                changeAmountConditions={this.changeAmountConditions}
                changeDaysConditions={this.changeDaysConditions}
                changeFunctionPriceConditions={
                  this.changeFunctionPriceConditions
                }
                changeFunctionAssetConditions={
                  this.changeFunctionAssetConditions
                }
                changeFunctionDaysConditions={this.changeFunctionDaysConditions}
                selectedDaysConditions={this.state.selectedDaysConditions}
                selectedPriceConditions={this.state.selectedPriceConditions}
                selectedAssetConditions={this.state.selectedAssetConditions}
                shouldShowDays={this.state.shouldShowDays}
                shouldShowFunctionDays={this.state.shouldShowFunctionDays}
                selectedOperatorConditions={
                  this.state.selectedOperatorConditions
                }
                selectedAmountConditions={this.state.selectedAmountConditions}
                selectedAmountSymbol={this.state.selectedAmountSymbol}
                closePopUp={this.closePopUp}
                isFunction={this.props.compare_type === "function"}
                // Inside function
                selectedFunctionPriceConditions={
                  this.state.selectedFunctionPriceConditions
                }
                selectedFunctionAssetConditions={
                  this.state.selectedFunctionAssetConditions
                }
                selectedFunctionDaysConditions={
                  this.state.selectedFunctionDaysConditions
                }
              />
            ) : null}
          </div>
        </div>
      </>
    );
  }
}

export default BackTestConditionBuilderBlock;
