import { BaseReactComponent } from "../../../../../../utils/form";
import BackTestAddingOptions from "../../Components/BackTestAddingOptions/BackTestAddingOptions";
import "./_backTestAddItems.scss";

class BackTestAddItems extends BaseReactComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOptionsOpen: false,
    };
  }
  toggleOptions = () => {
    this.setState({ isOptionsOpen: !this.state.isOptionsOpen });
  };
  closeOptions = () => {
    this.setState({ isOptionsOpen: false });
  };
  onAddAssetClick = () => {
    let itemToBeChangedOriginal = structuredClone(
      this.props.strategyBuilderString
    );
    let itemToBeChanged = itemToBeChangedOriginal;
    this.props.path.forEach((element) => {
      itemToBeChanged = itemToBeChanged[element];
    });
    if (this.props.blockType === "asset") {
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
          weight: equalWeight,
        };
      });
      tempItemToBeChanged.push({
        token: "BTC",
        weight: equalWeight,
      });
      itemToBeChanged.splice(0, itemToBeChanged.length);
      tempItemToBeChanged.forEach((item) => {
        itemToBeChanged.push({
          ...item,
          weight: equalWeight,
        });
      });
    } else if (this.props.blockType === "weight") {
      itemToBeChanged.asset.tokenList.push({
        token: "BTC",
        weight: 100,
      });
    } else if (this.props.blockType === "condition if") {
      itemToBeChanged.condition.success = {
        asset: {
          tokenList: [
            {
              token: "BTC",
              weight: 100,
            },
          ],
          action: "sell",
        },
      };
    } else if (this.props.blockType === "condition else") {
      itemToBeChanged.failed = {
        asset: {
          tokenList: [
            {
              token: "BTC",
              weight: 100,
            },
          ],
          action: "sell",
        },
      };
    } else if (this.props.blockType === "add item") {
      itemToBeChanged = itemToBeChanged.weight.weight_item;
      console.log("itemToBeChanged ", itemToBeChanged);
      let arrLength = itemToBeChanged.length;
      arrLength = arrLength + 1;
      let equalWeight = 100 / arrLength;
      if (equalWeight % 1 !== 0) {
        equalWeight = equalWeight.toFixed(4);
        equalWeight = parseFloat(equalWeight);
      }
      let tempWeightItemToBeChanged = itemToBeChanged.map((item, index) => {
        return {
          ...item,
          percentage: equalWeight,
        };
      });
      itemToBeChanged.splice(0, itemToBeChanged.length);
      tempWeightItemToBeChanged.forEach((item) => {
        itemToBeChanged.push(item);
      });
      itemToBeChanged.push({
        percentage: equalWeight,
        item: {
          asset: "BTC",
        },
      });
    }
    if (this.props.changeStrategyBuilderString) {
      this.props.changeStrategyBuilderString(itemToBeChangedOriginal);
    }
    this.closeOptions();
  };
  onAddConditionClick = () => {
    let itemToBeChangedOriginal = structuredClone(
      this.props.strategyBuilderString
    );
    let itemToBeChanged = itemToBeChangedOriginal;
    this.props.path.forEach((element) => {
      itemToBeChanged = itemToBeChanged[element];
    });
    if (this.props.blockType === "add item") {
      itemToBeChanged = itemToBeChanged.weight.weight_item;
      let arrLength = itemToBeChanged.length;
      arrLength = arrLength + 1;
      let equalWeight = 100 / arrLength;
      if (equalWeight % 1 !== 0) {
        equalWeight = equalWeight.toFixed(4);
        equalWeight = parseFloat(equalWeight);
      }

      let tempWeightItemToBeChanged = itemToBeChanged.map((item, index) => {
        return {
          ...item,
          percentage: equalWeight,
        };
      });
      itemToBeChanged.splice(0, itemToBeChanged.length);
      tempWeightItemToBeChanged.forEach((item) => {
        itemToBeChanged.push(item);
      });

      itemToBeChanged.push({
        percentage: equalWeight,
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
      });
    }
    if (this.props.changeStrategyBuilderString) {
      this.props.changeStrategyBuilderString(itemToBeChangedOriginal);
    }
    this.closeOptions();
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isOptionsOpenToggle !== this.props.isOptionsOpenToggle) {
      this.toggleOptions();
    }
  }

  render() {
    if (this.state.isOptionsOpen) {
      return (
        <div className={`sbb-add-options`}>
          <div className={`sbb-add-options-items `}>
            <BackTestAddingOptions
              copiedItem={this.props.copiedItem}
              setCopiedItem={this.props.setCopiedItem}
              closeOptions={this.closeOptions}
              onAddAssetClick={this.onAddAssetClick}
              onAddConditionClick={this.onAddConditionClick}
              blockType={this.props.blockType}
            />
          </div>
        </div>
      );
    }
    return null;
  }
}

export default BackTestAddItems;
