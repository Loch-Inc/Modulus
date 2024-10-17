import Highcharts from "highcharts/highstock";
import { BaseReactComponent } from "../../../../utils/form";
import {
  mobileCheck,
  strategyBuilderOperatorConvertorTextToSymbol,
  strategyBuilderTypeConvertorTextToSymbol,
} from "../../../../utils/ReusableFunctions";
import "./_backTestBuilder.scss";

import { cloneDeep } from "lodash";
import React from "react";
import { Image } from "react-bootstrap";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import {
  StrategyBuilderEmptyIcon,
  StrategyBuilderRedoIcon,
  StrategyBuilderUndoIcon,
} from "../../../../assets/images/icons";
import {
  createBackTestQuery,
  updateBackTestQuery,
  getBackTestQueries,
} from "../../Api/BackTestApi";
import BackTestBuilderMainBlock from "./BackTestBuilderMainBlock/BackTestBuilderMainBlock";
import BackTestAddingOptions from "./Components/BackTestAddingOptions/BackTestAddingOptions";
import {
  BuilderFirstAssetBlockAdded,
  BuilderFirstConditionBlockAdded,
  BuilderRedoClicked,
  BuilderStrategySaved,
  BuilderUndoClicked,
  ModulusBuilderCreateStrategyApiCallFailed,
  ModulusBuilderUpdateStrategyApiCallFailed,
} from "src/utils/AnalyticsFunctions";
import { getModulusUser } from "src/utils/ManageToken";

require("highcharts/modules/annotations")(Highcharts);

class BackTestBuilder extends BaseReactComponent {
  constructor(props) {
    super(props);
    this.scrollableRef = React.createRef();

    this.state = {
      shouldOpenPopUpBlocks: true,
      innerWidth: 650,
      emptyItems: [],
      isMobile: mobileCheck(),
      canUpdateBuilder: false,
      isStrategyEmpty: true,
      strategyBuilderString: {},
      strategyBuilderStringOpenPopUp: {},
      history: [],
      currentHistoryIndex: -1,
    };
  }

  updateStrategyBuilderString = (newStrategyBuilderString) => {
    this.setState((prevState) => {
      const newHistory = prevState.history.slice(
        0,
        prevState.currentHistoryIndex + 1
      );
      newHistory.push(cloneDeep(newStrategyBuilderString));

      return {
        strategyBuilderString: newStrategyBuilderString,
        history: newHistory,
        currentHistoryIndex: newHistory.length - 1,
      };
    });
  };

  undo = () => {
    this.changeStrategyBuilderPopUpString({});

    if (this.state.currentHistoryIndex <= 0) {
      return;
    }
    const modulusUser = getModulusUser();
    if (modulusUser && modulusUser.email) {
      BuilderUndoClicked({
        email_address: modulusUser.email,
      });
    }
    this.setState((prevState) => {
      if (prevState.currentHistoryIndex > 0) {
        console.log("Here ?", prevState.currentHistoryIndex);

        const newIndex = prevState.currentHistoryIndex - 1;
        console.log("newIndex ?", newIndex);
        return {
          currentHistoryIndex: newIndex,
          strategyBuilderString: cloneDeep(prevState.history[newIndex]),
        };
      }
      return null;
    });
  };

  redo = () => {
    this.changeStrategyBuilderPopUpString({});
    if (this.state.currentHistoryIndex >= this.state.history.length - 1) {
      return;
    }
    const modulusUser = getModulusUser();
    if (modulusUser && modulusUser.email) {
      BuilderRedoClicked({
        email_address: modulusUser.email,
      });
    }
    this.setState((prevState) => {
      if (prevState.currentHistoryIndex < prevState.history.length - 1) {
        const newIndex = prevState.currentHistoryIndex + 1;
        return {
          strategyBuilderString: cloneDeep(prevState.history[newIndex]),
          currentHistoryIndex: newIndex,
        };
      }
      return null;
    });
  };

  // Update all methods that modify strategyBuilderString to use updateStrategyBuilderString
  // For example:
  changeStrategyBuilderString = (passedString) => {
    this.updateStrategyBuilderString(passedString);
  };
  changeStrategyBuilderPopUpString = (passedString) => {
    this.setState({
      strategyBuilderStringOpenPopUp: passedString,
    });
  };

  getStrategiesQueries = () => {
    if (
      this.props.passedStrategyList &&
      this.props.passedStrategyList.length > 0
    ) {
      let tempApiData = new URLSearchParams();
      let setStrategy = false;
      if (
        this.props.passedStrategyList &&
        this.props.passedStrategyList.length > 0
      ) {
        tempApiData.append(
          "strategy_list",
          JSON.stringify([...this.props.passedStrategyList])
        );
        if (this.props.passedUserList && this.props.passedUserList.length > 0) {
          tempApiData.append(
            "user_list",
            JSON.stringify([...this.props.passedUserList])
          );
        }
        // tempApiData.append(
        //   "user_list",
        //   JSON.stringify(["64dcc25ffd5e77c52e0fddf6"])
        // );
        setStrategy = true;
      }
      // tempApiData.append(
      //   "user_list",
      //   JSON.stringify(["66cc01184d9fe2be2b11806d"])
      // );
      this.props.getBackTestQueries(tempApiData, setStrategy);
    }
  };
  afterStrategyUpdate = (isSuccess) => {
    if (isSuccess) {
      this.getStrategiesQueries();
      if (this.props.hideSaveStrategy) {
        this.props.hideSaveStrategy();
      }
      if (
        this.props.getAssetDataAfterStrategyUpdate &&
        this.props.passedStrategyList &&
        this.props.passedStrategyList.length > 0
      ) {
        this.props.getAssetDataAfterStrategyUpdate(
          this.props.passedStrategyList[0]
        );
      }
      toast.success("Strategy updated successfully");
    } else {
      toast.error("An error has occurred. Please try again");
      const modulusUser = getModulusUser();
      if (modulusUser && modulusUser.email) {
        ModulusBuilderUpdateStrategyApiCallFailed({
          email_address: modulusUser.email,
          strategy_id: this.props.passedStrategyList[0],
        });
      }
    }
  };
  afterQueryCreation = (isApiPassed, tempStrategyId) => {
    if (isApiPassed) {
      const modulusUser = getModulusUser();
      let tempUserId = "";
      if (modulusUser && modulusUser.email) {
        BuilderStrategySaved({
          email_address: modulusUser.email,
          strategyName: this.props.saveStrategyName,
        });
        console.log("modulusUser? ", modulusUser);

        tempUserId = modulusUser.userId;
      }
      toast.success("Strategy created successfully");
      this.props.changeUserAndStrategy(tempUserId, tempStrategyId);
      this.getStrategiesQueries();
      if (this.props.hideSaveStrategy) {
        this.props.hideSaveStrategy();
      }
    } else {
      toast.error("An error has occurred. Please try again");
      const modulusUser = getModulusUser();
      if (modulusUser && modulusUser.email) {
        ModulusBuilderCreateStrategyApiCallFailed({
          email_address: modulusUser.email,
        });
      }
      if (this.props.showSaveStrategy) {
        this.props.showSaveStrategy();
      }
    }
  };
  strategyBuilderIsQueryValid = (obj, path, emptyHolderArr) => {
    if ("weight" in obj) {
      let totalWeight = 0;
      if (obj.weight && obj.weight.weight_item) {
        obj.weight.weight_item.forEach((curItem, curIndex) => {
          totalWeight = totalWeight + parseFloat(curItem.percentage);
          console.log("totalWeight? ", totalWeight);
          this.strategyBuilderIsQueryValid(
            curItem,
            [...path, "weight", "weight_item", curIndex],
            emptyHolderArr
          );
        });
        totalWeight = Math.round(totalWeight);
        if (!(totalWeight >= 99.8 && totalWeight <= 100)) {
          emptyHolderArr.push([...path, "weight"]);
        }
      }
    } else if ("item" in obj) {
      this.strategyBuilderIsQueryValid(
        obj.item,
        [...path, "item"],
        emptyHolderArr
      );
    } else if ("condition" in obj) {
      this.strategyBuilderIsQueryValid(
        obj.condition,
        [...path, "condition"],
        emptyHolderArr
      );
    } else {
      if ("success" in obj) {
        if (Object.keys(obj.success).length === 0) {
          emptyHolderArr.push([...path, "success"]);
        }
        this.strategyBuilderIsQueryValid(
          obj.success,
          [...path, "success"],
          emptyHolderArr
        );
      }
      if ("failed" in obj) {
        if (Object.keys(obj.failed).length === 0) {
          emptyHolderArr.push([...path, "failed"]);
        }
        this.strategyBuilderIsQueryValid(
          obj.failed,
          [...path, "failed"],
          emptyHolderArr
        );
      }
    }
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.BackTestQueryState !== this.props.BackTestQueryState) {
      const passedQueryData = this.props.BackTestQueryState;

      if (passedQueryData.length > 0 && passedQueryData[0].strategy) {
        // this.setState({
        //   strategyBuilderString: passedQueryData[0].strategy,
        // });
        this.updateStrategyBuilderString(passedQueryData[0].strategy);
        this.setState({
          shouldOpenPopUpBlocks: false,
        });
        setTimeout(() => {
          this.setState({
            shouldOpenPopUpBlocks: true,
          });
        }, 1000);
      }
    }
    if (prevProps.passedStrategyList !== this.props.passedStrategyList) {
      this.getStrategiesQueries();
    }
    if (prevState.strategyBuilderString !== this.state.strategyBuilderString) {
      this.updateWidth();
      if (
        this.state.strategyBuilderString &&
        Object.keys(this.state.strategyBuilderString).length === 0
      ) {
        if (this.props.changeIsStrategyEmpty) {
          this.props.changeIsStrategyEmpty(true);
        }
        this.setState({
          isStrategyEmpty: true,
        });
        if (this.props.hideSaveStrategy) {
          this.props.hideSaveStrategy();
        }
      } else {
        if (this.props.changeIsStrategyEmpty) {
          this.props.changeIsStrategyEmpty(false);
        }
        this.setState({
          isStrategyEmpty: false,
        });
        if (this.props.showSaveStrategy) {
          this.props.showSaveStrategy();
        }
      }
    }
    if (prevProps.saveStrategyCheck !== this.props.saveStrategyCheck) {
      this.setState({
        emptyItems: [],
      });
      let emptyHolderArr = [];
      this.strategyBuilderIsQueryValid(
        this.state.strategyBuilderString,
        [],
        emptyHolderArr
      );

      if (emptyHolderArr.length === 0) {
        let tempApiData = new URLSearchParams();
        tempApiData.append(
          "strategy_payload",
          JSON.stringify(this.state.strategyBuilderString)
        );
        if (this.props.saveStrategyName) {
          tempApiData.append("strategy_name", this.props.saveStrategyName);
        }
        if (
          this.props.passedUserList &&
          this.props.passedUserList.length > 0 &&
          this.props.passedStrategyList &&
          this.props.passedStrategyList.length > 0
        ) {
          let modulusUser = getModulusUser();
          const passedUser = this.props.passedUserList[0];
          if (modulusUser && modulusUser.userId === passedUser) {
            tempApiData.append("strategy_id", this.props.passedStrategyList[0]);
            console.log("My strategy");

            this.props.updateBackTestQuery(
              tempApiData,
              this.afterStrategyUpdate
            );
          } else {
            this.props.createBackTestQuery(
              tempApiData,
              this,
              this.afterQueryCreation
            );
          }
        } else {
          this.props.createBackTestQuery(
            tempApiData,
            this,
            this.afterQueryCreation
          );
        }
      } else {
        toast.error("Please fix all the issues with the strategy");
        this.setState({
          emptyItems: emptyHolderArr,
        });
      }
    }
    if (
      prevState.strategyBuilderString !== this.state.strategyBuilderString &&
      this.state.canUpdateBuilder
    ) {
      this.setState({
        emptyItems: [],
      });

      window.localStorage.setItem(
        "strategyBuilderStringLocal",
        JSON.stringify(this.state.strategyBuilderString)
      );
    }
  }
  updateWidth = () => {
    if (this.scrollableRef.current) {
      this.setState({
        innerWidth: this.scrollableRef.current.scrollWidth,
      });
    }
  };
  componentDidMount() {
    setTimeout(() => {
      this.updateWidth();
    }, 500);
    setTimeout(() => {
      this.setState({
        canUpdateBuilder: true,
      });
    }, 1000);

    // this.getStrategiesQueries();
    // const strategyBuilderStringLocal = window.localStorage.getItem(
    //   "strategyBuilderStringLocal"
    // );
    // if (strategyBuilderStringLocal) {
    //   this.setState({
    //     strategyBuilderString: JSON.parse(strategyBuilderStringLocal),
    //   });
    // }
    this.getStrategiesQueries();
  }
  changeType = (passedType) => {
    let operatorType = "";
    operatorType = strategyBuilderTypeConvertorTextToSymbol(passedType);

    let itemItem = {
      ...this.state.strategyBuilderString.condition,
      type: operatorType,
    };
    this.setState({
      strategyBuilderString: {
        condition: itemItem,
      },
    });
  };
  changeToken = (passedToken) => {
    let itemItem = {
      ...this.state.strategyBuilderString.condition,
      token: passedToken,
    };

    this.updateStrategyBuilderString(itemItem);
  };
  changeOperator = (passedOperator) => {
    let operatorSymbol = "";
    operatorSymbol =
      strategyBuilderOperatorConvertorTextToSymbol(passedOperator);
    let itemItem = {
      ...this.state.strategyBuilderString.condition,
      operator: operatorSymbol,
    };
    this.updateStrategyBuilderString(itemItem);
  };
  changeAmount = (passedAmount) => {
    let itemItem = {
      ...this.state.strategyBuilderString.condition,
      amount: passedAmount,
    };
    this.updateStrategyBuilderString(itemItem);
  };

  onAddAssetInEmptyClick = (passedFunction, item, isPopUp) => {
    const modulusUser = getModulusUser();
    if (modulusUser && modulusUser.email) {
      BuilderFirstAssetBlockAdded({
        email_address: modulusUser.email,
      });
    }
    if (isPopUp) {
      passedFunction({
        weight: {
          weight_type: "SPECIFIED",
          weight_item: [
            {
              openPopup: true,
              percentage: "100",
              item: {
                asset: "BTC",
              },
            },
          ],
        },
      });
    } else {
      passedFunction({
        weight: {
          weight_type: "SPECIFIED",
          weight_item: [
            {
              percentage: "100",
              item: {
                asset: "BTC",
              },
            },
          ],
        },
      });
    }
  };
  onAddConditionInEmptyClick = (passedFunction, item, isPopUp) => {
    const modulusUser = getModulusUser();
    if (modulusUser && modulusUser.email) {
      BuilderFirstConditionBlockAdded({
        email_address: modulusUser.email,
      });
    }
    if (isPopUp) {
      passedFunction({
        weight: {
          weight_type: "SPECIFIED",
          weight_item: [
            {
              percentage: "100",
              item: {
                condition: {
                  openPopup: true,
                  type: "CURRENT_PRICE",
                  token: "BTC",
                  operator: ">",
                  amount: "100",
                  time_period: "10",
                  success: {},
                  failed: {},
                  compare_type: "FUNCTION",
                  compare_function: {
                    type: "MOVING_AVERAGE_PRICE",
                    time_period: "10",
                    token: "BTC",
                  },
                },
              },
            },
          ],
        },
      });
    } else {
      passedFunction({
        weight: {
          weight_type: "SPECIFIED",
          weight_item: [
            {
              percentage: "100",
              item: {
                condition: {
                  type: "CURRENT_PRICE",
                  token: "BTC",
                  operator: ">",
                  amount: "100",
                  time_period: "10",
                  success: {},
                  failed: {},
                  compare_type: "FUNCTION",
                  compare_function: {
                    type: "MOVING_AVERAGE_PRICE",
                    time_period: "10",
                    token: "BTC",
                  },
                },
              },
            },
          ],
        },
      });
    }
  };
  render() {
    if (this.state.isStrategyEmpty) {
      return (
        <>
          <div className="btpcb-left-block">
            <div className="strategy-builder-container strategy-builder-container-empty">
              <div className="sbc-empty-container">
                <div className="sbc-empty-options-container-container">
                  <div className="sbc-empty-options-container">
                    <BackTestAddingOptions
                      changeStrategyBuilderString={
                        this.changeStrategyBuilderString
                      }
                      changeStrategyBuilderPopUpString={
                        this.changeStrategyBuilderPopUpString
                      }
                      closeOptions={() => null}
                      onAddAssetClick={this.onAddAssetInEmptyClick}
                      onAddConditionClick={this.onAddConditionInEmptyClick}
                    />
                  </div>
                </div>
                <div className="sbc-empty">
                  <Image
                    className="sbc-empty-image"
                    src={StrategyBuilderEmptyIcon}
                  />
                  <div className="sbc-empty-text">
                    Start building by
                    <br />
                    adding a block above
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
    return (
      <>
        <div className="btpcb-title btpcb-builder-title">
          {/* <div>Strategy Builder</div> */}
          <div className="btpcb-builder-title-undo-redo-container">
            <div
              onClick={this.undo}
              className={`btpcb-builder-title-undo-redo-item ${
                this.state.currentHistoryIndex <= 0
                  ? "btpcb-builder-title-undo-redo-item-disabled"
                  : ""
              }`}
            >
              <Image
                className={`btpcb-builder-title-undo-redo-icon`}
                src={StrategyBuilderUndoIcon}
              />
            </div>
            <div
              onClick={this.redo}
              className={`btpcb-builder-title-undo-redo-item ${
                this.state.currentHistoryIndex >= this.state.history.length - 1
                  ? "btpcb-builder-title-undo-redo-item-disabled"
                  : ""
              }`}
            >
              <Image
                className={`btpcb-builder-title-undo-redo-icon`}
                src={StrategyBuilderRedoIcon}
              />
            </div>
          </div>
        </div>
        <div className="btpcb-left-block">
          <div ref={this.scrollableRef} className="strategy-builder-container">
            <div className="sbc-logic-container">
              <BackTestBuilderMainBlock
                copiedItem={this.props.copiedItem}
                setCopiedItem={this.props.setCopiedItem}
                shouldOpenPopUpBlocks={this.state.shouldOpenPopUpBlocks}
                innerWidth={this.state.innerWidth}
                saveStrategyName={this.props.saveStrategyName}
                emptyItems={this.state.emptyItems}
                strategyBuilderString={this.state.strategyBuilderString}
                strategyBuilderStringOpenPopUp={
                  this.state.strategyBuilderStringOpenPopUp
                }
                changeStrategyBuilderString={this.changeStrategyBuilderString}
                changeStrategyBuilderPopUpString={
                  this.changeStrategyBuilderPopUpString
                }
                blocks={this.state.strategyBuilderString}
                path={[]}
                blockLevel={0}
                weightPath={[]}
                weightIndex={-1}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  BackTestQueryState: state.BackTestQueryState,
});
const mapDispatchToProps = {
  createBackTestQuery,
  getBackTestQueries,
  updateBackTestQuery,
};
export default connect(mapStateToProps, mapDispatchToProps)(BackTestBuilder);
