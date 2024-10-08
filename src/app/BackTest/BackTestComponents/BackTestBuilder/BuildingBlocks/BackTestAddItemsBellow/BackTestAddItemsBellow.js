import { BaseReactComponent } from "../../../../../../utils/form";
import { mobileCheck } from "../../../../../../utils/ReusableFunctions";
import BackTestAddingOptions from "../../Components/BackTestAddingOptions/BackTestAddingOptions";
import "./_backTestAddItemsBellow.scss";

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
  onAddAssetClick = (passedAsset = "BTC") => {
    console.log("passedAsset? ", passedAsset);
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
      equalWeight = Math.round(equalWeight * 100) / 100;
      let tempItemToBeChanged = itemToBeChanged.map((item, itemIndex) => {
        return {
          ...item,
          percentage: equalWeight,
        };
      });
      if (this.props.weightIndex !== undefined) {
        tempItemToBeChanged.splice(this.props.weightIndex + 1, 0, {
          item: { asset: passedAsset },
          percentage: equalWeight,
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
                item: {
                  asset: passedAsset,
                },
              },
            ],
          },
        };
      } else {
        itemToBeChanged = itemToBeChanged.condition.success.weight.weight_item;
        let arrLength = itemToBeChanged.length ? itemToBeChanged.length : 0;
        arrLength = arrLength + 1;
        let equalWeight = 100 / arrLength;
        equalWeight = Math.round(equalWeight * 100) / 100;
        let tempItemToBeChanged = itemToBeChanged.map((item) => {
          return {
            ...item,
            percentage: equalWeight,
          };
        });
        tempItemToBeChanged.push({
          item: { asset: passedAsset },
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
                item: {
                  asset: passedAsset,
                },
              },
            ],
          },
        };
      } else {
        itemToBeChanged = itemToBeChanged.failed.weight.weight_item;
        let arrLength = itemToBeChanged.length ? itemToBeChanged.length : 0;
        arrLength = arrLength + 1;
        let equalWeight = 100 / arrLength;
        equalWeight = Math.round(equalWeight * 100) / 100;
        let tempItemToBeChanged = itemToBeChanged.map((item) => {
          return {
            ...item,
            percentage: equalWeight,
          };
        });
        tempItemToBeChanged.push({
          item: { asset: passedAsset },
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

    if (this.props.changeStrategyBuilderString) {
      this.props.changeStrategyBuilderString(itemToBeChangedOriginal);
    }
    this.closeOptions();
  };
  onAddConditionClick = (
    passedCondition = {
      condition: {
        type: "CURRENT_PRICE",
        token: "BTC",
        operator: ">",
        amount: "100",
        time_period: "4",
        success: {},
        failed: {},
        compare_type: "function",
        compare_function: {
          type: "CURRENT_PRICE",
          time_period: "4",
          token: "ETH",
        },
      },
    }
  ) => {
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
      equalWeight = Math.round(equalWeight * 100) / 100;
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
        equalWeight = Math.round(equalWeight * 100) / 100;
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
        equalWeight = Math.round(equalWeight * 100) / 100;
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

    if (this.props.changeStrategyBuilderString) {
      this.props.changeStrategyBuilderString(itemToBeChangedOriginal);
    }
    this.closeOptions();
  };
  onAddPasteClick = () => {
    if (this.props.copiedItem) {
      if (this.props.copiedItem.itemType === "asset") {
        console.log(
          "this.props.copiedItem.item ? ",
          this.props.copiedItem.item
        );
        this.onAddAssetClick(this.props.copiedItem.item);
      } else if (this.props.copiedItem.itemType === "condition if") {
        this.onAddConditionClick(this.props.copiedItem.item);
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
