import { Image } from "react-bootstrap";
import OutsideClickHandler from "react-outside-click-handler";
import { BaseReactComponent } from "../../../../../../utils/form";
import { strategyBuilderAssetDetailFromName } from "../../../../../../utils/ReusableFunctions";
import BackTestAssetPopup from "../../PopUps/BackTestAssetPopup/BackTestAssetPopup";
import "./_backTestAssetBuilderBlock.scss";

class BackTestAssetBuilderBlock extends BaseReactComponent {
  constructor(props) {
    super(props);
    this.state = {
      isPopUpOpen: false,
      curAsset: {
        name: "",
        icon: "",
        color: "",
      },
    };
  }
  setCurAsset = () => {
    let tempHolder = strategyBuilderAssetDetailFromName(
      this.props.selectedAsset
    );

    this.setState({ curAsset: tempHolder });
  };
  componentDidMount() {
    this.setCurAsset();
    this.checkPopUp();
  }
  removePopUpFromString = () => {
    let itemToBeChangedOriginal = structuredClone(
      this.props.strategyBuilderString
    );
    let weightItemToBeChanged = itemToBeChangedOriginal;
    this.props.weightPath.forEach((element) => {
      weightItemToBeChanged = weightItemToBeChanged[element];
    });
    weightItemToBeChanged = weightItemToBeChanged.weight.weight_item;
    weightItemToBeChanged = weightItemToBeChanged[this.props.weightIndex];
    if (weightItemToBeChanged && weightItemToBeChanged.openPopup) {
      delete weightItemToBeChanged.openPopup;
    }
    if (this.props.changeStrategyBuilderString) {
      this.props.changeStrategyBuilderString(itemToBeChangedOriginal);
    }
    return true;
  };
  componentDidUpdate(prevProps) {
    if (prevProps.editBtnClicked !== this.props.editBtnClicked) {
      this.togglePopUp();
    }
    if (prevProps.selectedAsset !== this.props.selectedAsset) {
      this.setCurAsset();
    }
    if (prevProps.strategyBuilderString !== this.props.strategyBuilderString) {
      this.checkPopUp();
    }
  }
  checkPopUp = () => {
    let itemToBeChangedOriginal = structuredClone(
      this.props.strategyBuilderString
    );
    let weightItemToBeChanged = itemToBeChangedOriginal;
    this.props.weightPath.forEach((element) => {
      weightItemToBeChanged = weightItemToBeChanged[element];
    });
    weightItemToBeChanged = weightItemToBeChanged.weight.weight_item;
    weightItemToBeChanged = weightItemToBeChanged[this.props.weightIndex];
    if (weightItemToBeChanged && weightItemToBeChanged.openPopup) {
      this.setState({
        isPopUpOpen: true,
      });
    }
  };
  closePopUp = (e) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    this.setState({ isPopUpOpen: false });
  };
  togglePopUp = (e) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    this.setState({ isPopUpOpen: !this.state.isPopUpOpen });
  };
  changeAsset = (passedItem) => {
    this.removePopUpFromString();
    setTimeout(() => {
      let itemToBeChangedOriginal = structuredClone(
        this.props.strategyBuilderString
      );
      let itemToBeChanged = itemToBeChangedOriginal;
      this.props.path.forEach((element) => {
        itemToBeChanged = itemToBeChanged[element];
      });
      itemToBeChanged.asset = passedItem.name;
      if (this.props.changeStrategyBuilderString) {
        this.props.changeStrategyBuilderString(itemToBeChangedOriginal);
        this.closePopUp();
      }
    }, 100);
  };
  render() {
    return (
      <>
        <div className="sbb-content">
          <div className="back-test-asset-builder">
            <div className="back-test-asset-popup-item-content">
              <div
                style={{
                  backgroundColor: this.state.curAsset.color,
                }}
                className="back-test-asset-popup-item-icon"
              >
                <Image
                  className="back-test-asset-popup-item-icon-image"
                  src={this.state.curAsset.icon}
                />
              </div>
              <div className="back-test-asset-popup-item-name">
                {this.state.curAsset.name}
              </div>
            </div>
            {this.state.isPopUpOpen ? (
              <OutsideClickHandler
                onOutsideClick={() => {
                  this.removePopUpFromString();
                  this.closePopUp();
                }}
              >
                <BackTestAssetPopup
                  selectedOption={this.props.selectedAsset}
                  onOptionSelect={this.changeAsset}
                  closePopUp={this.closePopUp}
                  removePopUpFromString={this.removePopUpFromString}
                />
              </OutsideClickHandler>
            ) : null}
          </div>
        </div>
      </>
    );
  }
}

export default BackTestAssetBuilderBlock;
