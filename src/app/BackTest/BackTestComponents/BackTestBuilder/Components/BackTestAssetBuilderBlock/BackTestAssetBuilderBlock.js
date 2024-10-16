import { Image } from "react-bootstrap";
import OutsideClickHandler from "react-outside-click-handler";
import { BaseReactComponent } from "../../../../../../utils/form";
import { strategyBuilderAssetDetailFromName } from "../../../../../../utils/ReusableFunctions";
import BackTestAssetPopup from "../../PopUps/BackTestAssetPopup/BackTestAssetPopup";
import "./_backTestAssetBuilderBlock.scss";
import { BuilderPopUpAssetAssetSelected } from "src/utils/AnalyticsFunctions";
import { getModulusUser } from "src/utils/ManageToken";

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
    if (
      this.props.strategyBuilderStringOpenPopUp &&
      Object.keys(this.props.strategyBuilderStringOpenPopUp).length > 0
    ) {
      let itemToBeChangedOriginal = structuredClone(
        this.props.strategyBuilderStringOpenPopUp
      );
      let weightItemToBeChanged = itemToBeChangedOriginal;
      this.props.weightPath.forEach((element) => {
        weightItemToBeChanged = weightItemToBeChanged[element];
      });
      if (
        weightItemToBeChanged &&
        weightItemToBeChanged.weight &&
        weightItemToBeChanged.weight.weight_item
      ) {
        weightItemToBeChanged = weightItemToBeChanged.weight.weight_item;
        weightItemToBeChanged = weightItemToBeChanged[this.props.weightIndex];
        if (weightItemToBeChanged && weightItemToBeChanged.openPopup) {
          this.setState({
            isPopUpOpen: true,
          });
        }
      }
    }
  };
  closePopUp = (e) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    if (this.state.isPopUpOpen) {
      this.props.changeStrategyBuilderPopUpString({});
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
    const modulusUser = getModulusUser();
    if (modulusUser) {
      BuilderPopUpAssetAssetSelected({
        email_address: modulusUser.email,
        assetName: passedItem.name,
      });
    }
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
                  this.closePopUp();
                }}
              >
                <BackTestAssetPopup
                  selectedOption={this.props.selectedAsset}
                  onOptionSelect={this.changeAsset}
                  closePopUp={this.closePopUp}
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
