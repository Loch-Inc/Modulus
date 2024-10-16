import { connect } from "react-redux";
import { DEFAULT_STRATEGY_NAME } from "src/utils/Constant";
import { BaseReactComponent } from "../../../../../../utils/form";
import { mobileCheck } from "../../../../../../utils/ReusableFunctions";
import "./_backTestNameSave.scss";

class BackTestNameSave extends BaseReactComponent {
  constructor(props) {
    super(props);
    this.state = {
      welcomeAddBtnLoading: false,
      strategyName: DEFAULT_STRATEGY_NAME,
      isMobile: mobileCheck(),
    };
  }
  changeStragegyName = (e) => {
    this.setState({ strategyName: e.target.value });
  };
  saveStrategyClickedPass = () => {
    this.props.saveStrategyClicked(this.state.strategyName);
  };
  onKeyPress = (e) => {
    if (e.key === "Enter") {
      this.props.saveStrategyClicked(this.state.strategyName);
    }
  };

  render() {
    return (
      <div
        className={`strategy-builder-name-save ${
          this.state.isMobile ? "strategy-builder-name-save-mobile" : ""
        }`}
      >
        <input
          placeholder="Draft Strategy"
          value={this.state.strategyName}
          onChange={this.changeStragegyName}
          onKeyDown={this.onKeyPress}
          className="strategy-builder-name-save-title-input"
        />

        <div className="strategy-builder-name-save-btns-container">
          <div
            onClick={this.saveStrategyClickedPass}
            className={`strategy-builder-name-save-btn ${
              this.props.loadingSaveInvestStrategyBtn ||
              this.state.strategyName === ""
                ? "strategy-builder-name-save-btn-loading"
                : ""
            }`}
          >
            Share
          </div>
          <div
            onClick={this.saveStrategyClickedPass}
            className={`strategy-builder-name-save-btn ${
              this.props.loadingSaveInvestStrategyBtn ||
              this.state.strategyName === ""
                ? "strategy-builder-name-save-btn-loading"
                : ""
            }`}
          >
            Save
          </div>
          {/* <div
            className={`strategy-builder-name-save-btn strategy-builder-name-save-btn-highlighted ${
              this.props.loadingSaveInvestStrategyBtn ||
              this.state.strategyName === ""
                ? "strategy-builder-name-save-btn-loading"
                : ""
            }`}
            style={{
              display: this.state.isMobile ? "none" : "flex",
            }}
          >
            Invest
          </div> */}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(BackTestNameSave);
