import { Image } from "react-bootstrap";
import OutsideClickHandler from "react-outside-click-handler";
import { connect } from "react-redux";
import {
  StrategyBuilderPencilLightIcon,
  StrategyBuilderTitleDiamondIcon,
} from "src/assets/images/icons";
import { DEFAULT_STRATEGY_NAME } from "src/utils/Constant";
import { BaseReactComponent } from "../../../../../../utils/form";
import { mobileCheck } from "../../../../../../utils/ReusableFunctions";
import "./_backTestSaveStrategy.scss";
import { BuilderRenameClicked } from "src/utils/AnalyticsFunctions";
import { getModulusUser } from "src/utils/ManageToken";

class BackTestSaveStrategy extends BaseReactComponent {
  constructor(props) {
    super(props);
    this.state = {
      isInputOpen: false,
      strategyName: this.props.saveStrategyName
        ? this.props.saveStrategyName
        : "",
      isMobile: mobileCheck(),
      disableBtn: true,
    };
  }

  componentDidMount() {
    if (this.props.saveStrategyName === DEFAULT_STRATEGY_NAME) {
      this.setState({
        disableBtn: true,
      });
    } else {
      this.setState({
        disableBtn: false,
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.strategyName !== this.state.strategyName &&
      !this.props.isStrategyEmpty
    ) {
      this.setState({
        disableBtn: false,
      });
    }
    if (this.props.isSaveInvestStrategy !== prevProps.isSaveInvestStrategy) {
      // if (this.props.isSaveInvestStrategy) {
      this.setState({
        disableBtn: !this.props.isSaveInvestStrategy,
      });
      // }
    }

    if (prevProps.saveStrategyName !== this.props.saveStrategyName) {
      this.setState({ strategyName: this.props.saveStrategyName });
    }
  }
  changeStragegyName = (e) => {
    this.setState({ strategyName: e.target.value });
  };
  shareStrategyClickedPass = () => {
    if (this.props.shareThisStrategy) {
      this.props.shareThisStrategy();
    }
  };
  saveStrategyClickedPass = () => {
    this.setState({
      isInputOpen: false,
    });
    this.props.saveStrategyClicked(this.state.strategyName);
  };
  onKeyPress = (e) => {
    if (e.key === "Enter") {
      this.saveStrategyClickedPass();
    }
  };
  showInputBox = () => {
    const modulusUser = getModulusUser();
    if (modulusUser) {
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
                value={this.state.strategyName}
                onChange={this.changeStragegyName}
                onKeyDown={this.onKeyPress}
                className="strategy-builder-save-strategy-title-input"
              />
              <div className="strategy-builder-save-strategy-btns-container">
                <div
                  onClick={this.saveStrategyClickedPass}
                  className={`strategy-builder-save-strategy-btn strategy-builder-save-strategy-btn-highlighted ${
                    this.props.loadingSaveInvestStrategyBtn ||
                    this.state.strategyName === "" ||
                    this.state.disableBtn
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
                  {this.state.strategyName}
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
                  className={`strategy-builder-save-strategy-btn  ${
                    !this.props.isShareStrategyVisible
                      ? "strategy-builder-save-strategy-btn-loading"
                      : ""
                  }`}
                >
                  Share
                </div>
                <div
                  onClick={this.saveStrategyClickedPass}
                  className={`strategy-builder-save-strategy-btn strategy-builder-save-strategy-btn-highlighted ${
                    this.props.loadingSaveInvestStrategyBtn ||
                    this.state.strategyName === "" ||
                    this.state.disableBtn
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
