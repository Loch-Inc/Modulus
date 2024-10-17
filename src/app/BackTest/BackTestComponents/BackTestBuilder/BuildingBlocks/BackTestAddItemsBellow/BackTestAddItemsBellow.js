import {
  BuilderAddBellowAssetClicked,
  BuilderAddBellowConditionClicked,
  BuilderAddBellowPasteClicked,
} from "src/utils/AnalyticsFunctions";
import { BaseReactComponent } from "../../../../../../utils/form";
import { mobileCheck } from "../../../../../../utils/ReusableFunctions";
import BackTestAddingOptions from "../../Components/BackTestAddingOptions/BackTestAddingOptions";
import "./_backTestAddItemsBellow.scss";
import { getModulusUser } from "src/utils/ManageToken";

class BackTestAddItemsBellow extends BaseReactComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOptionsOpen: false,
      isMobile: mobileCheck(),
    };
  }
  toggleOptions = () => {
    this.setState({ isOptionsOpen: !this.state.isOptionsOpen });
  };
  closeOptions = () => {
    this.setState({ isOptionsOpen: false });
  };
  onAddAssetClick = (passedFunction, passedItem, openPopUp) => {
    const modulusUser = getModulusUser();
    if (modulusUser && modulusUser.email) {
      BuilderAddBellowAssetClicked({
        email_address: modulusUser.email,
      });
    }
    let passedAsset = "BTC";
    let addPopUpOpen = true;
    if (!openPopUp) {
      addPopUpOpen = false;
    }
    if (passedItem) {
      passedAsset = passedItem;
    }
    if (this.props.openCollapse) {
      this.props.openCollapse();
    }
    let itemToBeChangedOriginal = structuredClone(
      this.props.strategyBuilderString
    );
    let itemToBeChanged = itemToBeChangedOriginal;
    this.props.path.forEach((element) => {
      itemToBeChanged = itemToBeChanged[element];
    });

    if (
      this.props.blockType === "asset" ||
      this.props.blockType === "weight percentage"
    ) {
      let itemToBeChanged = itemToBeChangedOriginal;
      this.props.weightPath.forEach((element) => {
        itemToBeChanged = itemToBeChanged[element];
      });
      itemToBeChanged = itemToBeChanged.weight.weight_item;
      let arrLength = itemToBeChanged.length ? itemToBeChanged.length : 0;
      arrLength = arrLength + 1;
      let equalWeight = 100 / arrLength;

      if (equalWeight % 1 !== 0) {
        equalWeight = equalWeight.toFixed(4);
        equalWeight = parseFloat(equalWeight);
      }

      let tempItemToBeChanged = itemToBeChanged.map((item, itemIndex) => {
        return {
          ...item,
          percentage: equalWeight,
        };
      });
      if (this.props.weightIndex !== undefined) {
        if (addPopUpOpen) {
          tempItemToBeChanged.splice(this.props.weightIndex + 1, 0, {
            item: { asset: passedAsset },
            percentage: equalWeight,
            openPopup: true,
          });
        } else {
          tempItemToBeChanged.splice(this.props.weightIndex + 1, 0, {
            item: { asset: passedAsset },
            percentage: equalWeight,
          });
        }
      } else {
        if (addPopUpOpen) {
          tempItemToBeChanged.push({
            item: { asset: passedAsset },
            percentage: equalWeight,
            openPopup: true,
          });
        } else {
          tempItemToBeChanged.push({
            item: { asset: passedAsset },
            percentage: equalWeight,
          });
        }
      }
      itemToBeChanged.splice(0, itemToBeChanged.length);
      tempItemToBeChanged.forEach((item) => {
        itemToBeChanged.push({
          ...item,
          percentage: equalWeight,
        });
      });
    } else if (this.props.blockType === "condition if") {
      if (
        itemToBeChanged.condition.success &&
        Object.keys(itemToBeChanged.condition.success).length === 0
      ) {
        if (addPopUpOpen) {
          itemToBeChanged.condition.success = {
            weight: {
              weight_type: "SPECIFIED",
              weight_item: [
                {
                  percentage: "100",
                  item: {
                    asset: passedAsset,
                  },
                  openPopup: true,
                },
              ],
            },
          };
        } else {
          itemToBeChanged.condition.success = {
            weight: {
              weight_type: "SPECIFIED",
              weight_item: [
                {
                  percentage: "100",
                  item: {
                    asset: passedAsset,
                  },
                },
              ],
            },
          };
        }
      } else {
        itemToBeChanged = itemToBeChanged.condition.success.weight.weight_item;
        let arrLength = itemToBeChanged.length ? itemToBeChanged.length : 0;
        arrLength = arrLength + 1;
        let equalWeight = 100 / arrLength;
        if (equalWeight % 1 !== 0) {
          equalWeight = equalWeight.toFixed(4);
          equalWeight = parseFloat(equalWeight);
        }
        let tempItemToBeChanged = itemToBeChanged.map((item) => {
          return {
            ...item,
            percentage: equalWeight,
          };
        });
        if (addPopUpOpen) {
          tempItemToBeChanged.push({
            item: { asset: passedAsset },
            percentage: equalWeight,
            openPopup: true,
          });
        } else {
          tempItemToBeChanged.push({
            item: { asset: passedAsset },
            percentage: equalWeight,
          });
        }
        itemToBeChanged.splice(0, itemToBeChanged.length);
        tempItemToBeChanged.forEach((item) => {
          itemToBeChanged.push({
            ...item,
            percentage: equalWeight,
          });
        });
      }
    } else if (this.props.blockType === "condition else") {
      if (
        itemToBeChanged.failed &&
        Object.keys(itemToBeChanged.failed).length === 0
      ) {
        if (addPopUpOpen) {
          itemToBeChanged.failed = {
            weight: {
              weight_type: "SPECIFIED",
              weight_item: [
                {
                  percentage: "100",
                  item: {
                    asset: passedAsset,
                  },
                  openPopup: true,
                },
              ],
            },
          };
        } else {
          itemToBeChanged.failed = {
            weight: {
              weight_type: "SPECIFIED",
              weight_item: [
                {
                  percentage: "100",
                  item: {
                    asset: passedAsset,
                  },
                },
              ],
            },
          };
        }
      } else {
        itemToBeChanged = itemToBeChanged.failed.weight.weight_item;
        let arrLength = itemToBeChanged.length ? itemToBeChanged.length : 0;
        arrLength = arrLength + 1;
        let equalWeight = 100 / arrLength;
        if (equalWeight % 1 !== 0) {
          equalWeight = equalWeight.toFixed(4);
          equalWeight = parseFloat(equalWeight);
        }
        let tempItemToBeChanged = itemToBeChanged.map((item) => {
          return {
            ...item,
            percentage: equalWeight,
          };
        });
        if (addPopUpOpen) {
          tempItemToBeChanged.push({
            item: { asset: passedAsset },
            percentage: equalWeight,
            openPopup: true,
          });
        } else {
          tempItemToBeChanged.push({
            item: { asset: passedAsset },
            percentage: equalWeight,
          });
        }
        itemToBeChanged.splice(0, itemToBeChanged.length);
        tempItemToBeChanged.forEach((item) => {
          itemToBeChanged.push({
            ...item,
            percentage: equalWeight,
          });
        });
      }
    }

    if (passedFunction) {
      passedFunction(itemToBeChangedOriginal);
    }
    this.closeOptions();
  };
  onAddConditionClick = (passedFunction, passedItem, openPopUp) => {
    const modulusUser = getModulusUser();
    if (modulusUser && modulusUser.email) {
      BuilderAddBellowConditionClicked({
        email_address: modulusUser.email,
      });
    }
    let passedCondition = {
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
    };
    let addPopUpOpen = true;
    if (!openPopUp) {
      addPopUpOpen = false;
    }
    if (passedItem) {
      passedCondition = passedItem;
    } else if (addPopUpOpen) {
      passedCondition = {
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
          openPopup: true,
        },
      };
    }

    if (this.props.openCollapse) {
      this.props.openCollapse();
    }
    let itemToBeChangedOriginal = structuredClone(
      this.props.strategyBuilderString
    );
    let itemToBeChanged = itemToBeChangedOriginal;
    this.props.path.forEach((element) => {
      itemToBeChanged = itemToBeChanged[element];
    });

    if (
      this.props.blockType === "asset" ||
      this.props.blockType === "weight percentage"
    ) {
      let itemToBeChanged = itemToBeChangedOriginal;
      this.props.weightPath.forEach((element) => {
        itemToBeChanged = itemToBeChanged[element];
      });
      itemToBeChanged = itemToBeChanged.weight.weight_item;
      let arrLength = itemToBeChanged.length ? itemToBeChanged.length : 0;
      arrLength = arrLength + 1;
      let equalWeight = 100 / arrLength;
      if (equalWeight % 1 !== 0) {
        equalWeight = equalWeight.toFixed(4);
        equalWeight = parseFloat(equalWeight);
      }
      let tempItemToBeChanged = itemToBeChanged.map((item) => {
        return {
          ...item,
          percentage: equalWeight,
        };
      });

      if (this.props.weightIndex !== undefined) {
        tempItemToBeChanged.splice(this.props.weightIndex + 1, 0, {
          item: passedCondition,
          percentage: equalWeight,
        });
      } else {
        tempItemToBeChanged.push({
          item: passedCondition,
          percentage: equalWeight,
        });
      }
      itemToBeChanged.splice(0, itemToBeChanged.length);
      tempItemToBeChanged.forEach((item) => {
        itemToBeChanged.push({
          ...item,
          percentage: equalWeight,
        });
      });
    } else if (this.props.blockType === "condition if") {
      if (
        itemToBeChanged.condition.success &&
        Object.keys(itemToBeChanged.condition.success).length === 0
      ) {
        itemToBeChanged.condition.success = {
          weight: {
            weight_type: "SPECIFIED",
            weight_item: [
              {
                percentage: "100",
                item: passedCondition,
              },
            ],
          },
        };
      } else {
        itemToBeChanged = itemToBeChanged.condition.success.weight.weight_item;
        let arrLength = itemToBeChanged.length ? itemToBeChanged.length : 0;
        arrLength = arrLength + 1;
        let equalWeight = 100 / arrLength;
        if (equalWeight % 1 !== 0) {
          equalWeight = equalWeight.toFixed(4);
          equalWeight = parseFloat(equalWeight);
        }
        let tempItemToBeChanged = itemToBeChanged.map((item) => {
          return {
            ...item,
            percentage: equalWeight,
          };
        });
        tempItemToBeChanged.push({
          item: passedCondition,
          percentage: equalWeight,
        });
        itemToBeChanged.splice(0, itemToBeChanged.length);
        tempItemToBeChanged.forEach((item) => {
          itemToBeChanged.push({
            ...item,
            percentage: equalWeight,
          });
        });
      }
    } else if (this.props.blockType === "condition else") {
      if (
        itemToBeChanged.failed &&
        Object.keys(itemToBeChanged.failed).length === 0
      ) {
        itemToBeChanged.failed = {
          weight: {
            weight_type: "SPECIFIED",
            weight_item: [
              {
                percentage: "100",
                item: passedCondition,
              },
            ],
          },
        };
      } else {
        itemToBeChanged = itemToBeChanged.failed.weight.weight_item;
        let arrLength = itemToBeChanged.length ? itemToBeChanged.length : 0;
        arrLength = arrLength + 1;
        let equalWeight = 100 / arrLength;
        if (equalWeight % 1 !== 0) {
          equalWeight = equalWeight.toFixed(4);
          equalWeight = parseFloat(equalWeight);
        }
        let tempItemToBeChanged = itemToBeChanged.map((item) => {
          return {
            ...item,
            percentage: equalWeight,
          };
        });
        tempItemToBeChanged.push({
          item: passedCondition,
          percentage: equalWeight,
        });
        itemToBeChanged.splice(0, itemToBeChanged.length);
        tempItemToBeChanged.forEach((item) => {
          itemToBeChanged.push({
            ...item,
            percentage: equalWeight,
          });
        });
      }
    }

    if (passedFunction) {
      passedFunction(itemToBeChangedOriginal);
    }
    this.closeOptions();
  };
  onAddPasteClick = () => {
    const modulusUser = getModulusUser();
    if (modulusUser && modulusUser.email) {
      BuilderAddBellowPasteClicked({
        email_address: modulusUser.email,
      });
    }
    if (this.props.copiedItem) {
      if (this.props.copiedItem.itemType === "asset") {
        this.onAddAssetClick(
          this.props.changeStrategyBuilderString,
          this.props.copiedItem.item,
          false
        );
        this.props.changeStrategyBuilderPopUpString({});
      } else if (this.props.copiedItem.itemType === "condition if") {
        this.onAddConditionClick(
          this.props.changeStrategyBuilderString,
          this.props.copiedItem.item,
          false
        );
        this.props.changeStrategyBuilderPopUpString({});
      }
    }
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isOptionsOpenToggle !== this.props.isOptionsOpenToggle) {
      this.toggleOptions();
    }
  }

  render() {
    if (this.state.isOptionsOpen) {
      return (
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={`sbb-add-options-bellow ${
            this.state.isMobile ? "sbb-add-options-bellow-mobile" : ""
          }`}
        >
          {/* <div className="sbb-add-options-bar">
          <div
            onClick={this.toggleOptions}
            className="sbb-add-options-bar-add-container"
          >
            <Image
              src={StrategyBuilderAddIcon}
              className="sbb-add-options-bar-add"
            />
          </div>
        </div> */}

          <div className={`sbb-add-options-bellow-items `}>
            <BackTestAddingOptions
              changeStrategyBuilderString={
                this.props.changeStrategyBuilderString
              }
              changeStrategyBuilderPopUpString={
                this.props.changeStrategyBuilderPopUpString
              }
              copiedItem={this.props.copiedItem}
              setCopiedItem={this.props.setCopiedItem}
              closeOptions={this.closeOptions}
              onAddAssetClick={this.onAddAssetClick}
              onAddConditionClick={this.onAddConditionClick}
              onAddPasteClick={this.onAddPasteClick}
              blockType={this.props.blockType}
            />
          </div>
        </div>
      );
    }
    return null;
  }
}

export default BackTestAddItemsBellow;
