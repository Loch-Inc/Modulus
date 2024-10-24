import { Image } from "react-bootstrap";
import OutsideClickHandler from "react-outside-click-handler";
import { connect } from "react-redux";
import {
  StrategyBuilderPencilLightIcon,
  StrategyBuilderTitleDiamondIcon,
  StrategyShareIcon,
} from "src/assets/images/icons";
import { BuilderRenameClicked } from "src/utils/AnalyticsFunctions";
import { getModulusUser } from "src/utils/ManageToken";
import { BaseReactComponent } from "../../../../../../utils/form";
import { mobileCheck } from "../../../../../../utils/ReusableFunctions";
import "./_backTestSaveStrategy.scss";

class BackTestSaveStrategy extends BaseReactComponent {
  constructor(props) {
    super(props);
    this.state = {
      isInputOpen: false,
      isMobile: mobileCheck(),
      disableBtn: true,
    };
  }

  componentDidMount() {}
  componentDidUpdate(prevProps, prevState) {}

  shareStrategyClickedPass = () => {
    if (this.props.shareThisStrategy) {
      this.props.shareThisStrategy();
    }
  };
  saveStrategyClickedPass = () => {
    this.setState({
      isInputOpen: false,
    });
    this.props.saveStrategyClicked(this.props.strategyInputValue);
  };
  onKeyPress = (e) => {
    if (e.key === "Enter") {
      this.saveStrategyClickedPass();
    }
  };
  showInputBox = () => {
    const modulusUser = getModulusUser();
    if (modulusUser && modulusUser.email) {
      BuilderRenameClicked({
        email_address: modulusUser.email,
      });
    }
    this.setState({ isInputOpen: true });
  };
  hideInputBox = () => {
    this.setState({
      isInputOpen: false,
    });
  };

  render() {
    return (
      <OutsideClickHandler onOutsideClick={this.hideInputBox}>
        <div
          className={`strategy-builder-save-strategy ${
            this.state.isInputOpen
              ? "strategy-builder-save-strategy-input-open"
              : ""
          } ${
            this.state.isMobile ? "strategy-builder-save-strategy-mobile" : ""
          }`}
        >
          {this.state.isInputOpen ? (
            <>
              <input
                placeholder="Draft Strategy"
                value={this.props.strategyInputValue}
                onChange={this.props.changeStragegyName}
                onKeyDown={this.onKeyPress}
                className="strategy-builder-save-strategy-title-input"
              />
              <div className="strategy-builder-save-strategy-btns-container">
                <div
                  onClick={this.saveStrategyClickedPass}
                  className={`strategy-builder-save-strategy-btn strategy-builder-save-strategy-btn-highlighted ${
                    this.props.disableSaveBtn
                      ? "strategy-builder-save-strategy-btn-loading"
                      : ""
                  }`}
                >
                  Save
                </div>
              </div>
            </>
          ) : (
            <div className="strategy-builder-save-strategy-title-container-parent">
              <div className="strategy-builder-save-strategy-title-container">
                <Image
                  className="strategy-builder-save-strategy-title-diamond"
                  src={StrategyBuilderTitleDiamondIcon}
                />
                <div className="strategy-builder-save-strategy-title">
                  {this.props.strategyInputValue}
                </div>
                <div
                  onClick={this.showInputBox}
                  className="strategy-builder-save-strategy-title-rename-container"
                >
                  <Image
                    className="strategy-builder-save-strategy-title-rename-icon"
                    src={StrategyBuilderPencilLightIcon}
                  />
                  <div className="strategy-builder-save-strategy-title-rename">
                    Rename
                  </div>
                </div>
              </div>
              <div className="strategy-builder-save-strategy-btns-container">
                <div
                  onClick={this.shareStrategyClickedPass}
                  className={`strategy-builder-save-strategy-btn strategy-builder-save-strategy-btn-white  ${
                    !this.props.isShareStrategyVisible
                      ? "strategy-builder-save-strategy-btn-loading"
                      : ""
                  }`}
                >
                  <StrategyShareIcon className="strategy-builder-save-strategy-btn-white-icon" />
                  <div>Share</div>
                </div>
                <div
                  onClick={this.saveStrategyClickedPass}
                  className={`strategy-builder-save-strategy-btn strategy-builder-save-strategy-btn-highlighted ${
                    this.props.disableSaveBtn
                      ? "strategy-builder-save-strategy-btn-loading"
                      : ""
                  }`}
                >
                  Save
                </div>
              </div>
            </div>
          )}
        </div>
      </OutsideClickHandler>
    );
  }
}
const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BackTestSaveStrategy);
