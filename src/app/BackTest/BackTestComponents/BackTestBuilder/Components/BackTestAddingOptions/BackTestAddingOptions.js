import { Image } from "react-bootstrap";
import OutsideClickHandler from "react-outside-click-handler";
import {
  CopyClipboardIcon,
  StrategyBuilderAssetIcon,
  StrategyBuilderConditionIcon,
} from "../../../../../../assets/images/icons";
import { BaseReactComponent } from "../../../../../../utils/form";
import "./_backTestAddingOptions.scss";

class BackTestAddingOptions extends BaseReactComponent {
  constructor(props) {
    super(props);
    this.state = {
      isAssets: true,
      isCondition: true,
    };
  }
  componentDidMount() {
    // if (
    //   this.props.blockType === "condition if" ||
    //   this.props.blockType === "condition else"
    // ) {
    //   this.setState({ isCondition: true });
    // }
    // copiedItem={this.props.copiedItem}
    //           setCopiedItem={this.props.setCopiedItem}
  }

  render() {
    return (
      <OutsideClickHandler
        display="contents"
        onOutsideClick={this.props.closeOptions}
      >
        <div className="sbc-header">
          {this.state.isAssets ? (
            <div
              onClick={() => {
                this.props.onAddAssetClick(
                  this.props.changeStrategyBuilderString,
                  undefined,
                  false
                );
                this.props.onAddAssetClick(
                  this.props.changeStrategyBuilderPopUpString,
                  undefined,
                  true
                );
              }}
              className="sbc-main-blocks sbc-main-blocks-asset"
            >
              <div className="sbc-main-blocks-image-container">
                <Image
                  src={StrategyBuilderAssetIcon}
                  className="sbc-main-blocks-image"
                />
              </div>
              <div>Assets</div>
            </div>
          ) : null}
          {/* <div className="sbc-main-blocks sbc-main-blocks-weight">
          <div className="sbc-main-blocks-image-container">
            <Image
              src={StrategyBuilderWeightIcon}
              className="sbc-main-blocks-image"
            />
          </div>
          <div>Weights</div>
        </div> */}
          {this.state.isCondition ? (
            <div
              onClick={() => {
                this.props.onAddConditionClick(
                  this.props.changeStrategyBuilderString,
                  undefined,
                  false
                );
                this.props.onAddConditionClick(
                  this.props.changeStrategyBuilderPopUpString,
                  undefined,
                  true
                );
              }}
              className="sbc-main-blocks sbc-main-blocks-condition"
            >
              <div className="sbc-main-blocks-image-container">
                <Image
                  src={StrategyBuilderConditionIcon}
                  className="sbc-main-blocks-image"
                />
              </div>
              <div>Conditions</div>
            </div>
          ) : null}
          {this.props.copiedItem?.itemType ? (
            <div
              onClick={
                this.props.onAddPasteClick
                  ? this.props.onAddPasteClick
                  : () => null
              }
              className="sbc-main-blocks sbc-main-blocks-paste"
            >
              <div className="sbc-main-blocks-image-container">
                <Image
                  src={CopyClipboardIcon}
                  className="sbc-main-blocks-image"
                />
              </div>
              <div>Paste</div>
            </div>
          ) : null}
          {/* <div className="sbc-main-blocks sbc-main-blocks-sort">
          <div className="sbc-main-blocks-image-container">
            <Image
              src={StrategyBuilderSortIcon}
              className="sbc-main-blocks-image"
            />
          </div>
          <div>Sort</div>
        </div> */}
        </div>
      </OutsideClickHandler>
    );
  }
}

export default BackTestAddingOptions;
