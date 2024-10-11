import { Image } from "react-bootstrap";
import {
  CheckBoldIcon,
  StrategyBuilderAssetIcon,
  StrategyBuilderPopUpCloseIcon,
} from "../../../../../../assets/images/icons";
import { BaseReactComponent } from "../../../../../../utils/form";
import {
  mobileCheck,
  strategyBuilderAssetList,
} from "../../../../../../utils/ReusableFunctions";
import "./_backTestAssetPopup.scss";

class BackTestAssetPopup extends BaseReactComponent {
  constructor(props) {
    super(props);

    this.state = {
      assetList: strategyBuilderAssetList(),
      searchOptions: [],
      searchAssetList: [],
      searchVal: "",
      isMobile: mobileCheck(),
    };
  }
  onAssetSelect = (selectedAsset) => {
    this.props.onOptionSelect(selectedAsset);
  };
  setSearchValue = (e) => {
    this.setState({ searchVal: e.target.value });
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchVal !== this.state.searchVal) {
      const searchAssetList = this.state.assetList.filter((asset) => {
        let isVal =
          asset.name
            .toLowerCase()
            .includes(this.state.searchVal.toLowerCase()) ||
          asset.fullName
            .toLowerCase()
            .includes(this.state.searchVal.toLowerCase());
        return isVal;
      });

      this.setState({ searchAssetList });
    }
  }
  closePopUpPass = (e) => {
    e.stopPropagation();
    this.props.removePopUpFromString();
    this.props.closePopUp();
  };
  render() {
    return (
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`back-test-asset-popup-container ${
          this.state.isMobile ? "back-test-asset-popup-container-mobile" : ""
        }`}
      >
        <div className="back-test-asset-popup">
          <div className="back-test-asset-popup-header-container">
            <div className="back-test-asset-popup-header-text">
              <Image
                className="back-test-asset-popup-header-text-icon"
                src={StrategyBuilderAssetIcon}
              />
              <div>Add asset</div>
            </div>
            <div
              onClick={this.closePopUpPass}
              className="back-test-asset-popup-header-close"
            >
              <Image
                src={StrategyBuilderPopUpCloseIcon}
                className="back-test-asset-popup-header-close-icon "
              />
            </div>
          </div>
          <div className="back-test-asset-popup-search-close-container">
            <div className="back-test-asset-popup-search">
              <input
                placeholder="Search for asset to add"
                className="back-test-asset-popup-search-input"
                value={this.state.searchVal}
                onChange={this.setSearchValue}
                autoFocus
              />
            </div>
          </div>
          <div className="back-test-asset-popup-item-container">
            {this.state.searchVal.length > 0
              ? this.state.searchAssetList.map((asset, index) => {
                  return (
                    <div
                      onClick={() => {
                        this.onAssetSelect(asset);
                      }}
                      className={`back-test-asset-popup-item ${
                        asset.name === this.props.selectedOption
                          ? "back-test-asset-popup-item-selected"
                          : ""
                      }`}
                    >
                      <div className="back-test-asset-popup-item-content">
                        <div
                          style={{
                            backgroundColor: asset.color,
                          }}
                          className="back-test-asset-popup-item-icon"
                        >
                          <Image
                            className="back-test-asset-popup-item-icon-image"
                            src={asset.icon}
                          />
                        </div>
                        <div className="back-test-asset-popup-item-name">
                          {asset.name}
                        </div>
                      </div>
                      {asset.name === this.props.selectedOption ? (
                        <CheckBoldIcon className="back-test-asset-popup-item-check-icon" />
                      ) : null}
                    </div>
                  );
                })
              : this.state.assetList.map((asset, index) => {
                  return (
                    <div
                      onClick={() => {
                        this.onAssetSelect(asset);
                      }}
                      className={`back-test-asset-popup-item ${
                        asset.name === this.props.selectedOption
                          ? "back-test-asset-popup-item-selected"
                          : ""
                      }`}
                    >
                      <div className="back-test-asset-popup-item-content">
                        <div
                          style={{
                            backgroundColor: asset.color,
                          }}
                          className="back-test-asset-popup-item-icon"
                        >
                          <Image
                            className="back-test-asset-popup-item-icon-image"
                            src={asset.icon}
                          />
                        </div>
                        <div className="back-test-asset-popup-item-name">
                          {asset.name}
                        </div>
                      </div>
                      {asset.name === this.props.selectedOption ? (
                        <CheckBoldIcon className="back-test-asset-popup-item-check-icon" />
                      ) : null}
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    );
  }
}

export default BackTestAssetPopup;
