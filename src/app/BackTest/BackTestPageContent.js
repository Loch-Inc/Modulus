// Performance Visualization -> Backtest Performance
// Strategy Performance -> Performance Visualization
// Performance Preview -> Performance Metrics

import { connect } from "react-redux";
import { BaseReactComponent } from "../../utils/form";
import { mobileCheck } from "../../utils/ReusableFunctions";
import TransactionTable from "../intelligence/TransactionTable";
import BackTestBuilder from "./BackTestComponents/BackTestBuilder/BackTestBuilder";
import BackTestSaveStrategy from "./BackTestComponents/BackTestBuilder/Components/BackTestSaveStrategy/BackTestSaveStrategy";
import BackTestChart from "./BackTestComponents/BackTestChart/BackTestChart";
import moment from "moment";

class BackTestPageContent extends BaseReactComponent {
  constructor(props) {
    super(props);

    this.state = {
      isMobile: mobileCheck(),
      prevHeight: 0,
      todayDate: new Date(new Date().setDate(new Date().getDate() - 1)),
    };
  }
  handleHeightChange = (entries) => {
    for (let entry of entries) {
      let curHeight = entry.contentRect.height;

      if (curHeight !== entry.target.offsetHeight) {
        if (curHeight !== this.state.prevHeight) {
          const left = document.getElementById(
            "back-test-page-content-block-left"
          );

          left.style.maxHeight = `${curHeight}px`;
          this.setState({
            prevHeight: curHeight,
          });
        }
      }
    }
  };
  componentDidMount() {
    const element = document.querySelector(
      "#back-test-page-content-block-right"
    );
    const resizeObserver = new ResizeObserver(this.handleHeightChange);
    resizeObserver.observe(element);
  }
  select1W = () => {
    let fromDate = new Date(new Date().setDate(new Date().getDate() - 7));
    let toDate = new Date(new Date().setDate(new Date().getDate() - 1));
    this.props.changeFromDate([fromDate, toDate]);
    this.props.changeSelectedDateRange("1W");
  };
  select1M = () => {
    let fromDate = new Date(
      new Date().setMonth(new Date().getMonth() - 1, new Date().getDate() - 1)
    );
    let toDate = new Date(new Date().setDate(new Date().getDate() - 1));
    this.props.changeFromDate([fromDate, toDate]);
    this.props.changeSelectedDateRange("1M");
  };
  select3M = () => {
    let fromDate = new Date(
      new Date().setMonth(new Date().getMonth() - 3, new Date().getDate() - 1)
    );
    let toDate = new Date(new Date().setDate(new Date().getDate() - 1));
    this.props.changeFromDate([fromDate, toDate]);
    this.props.changeSelectedDateRange("3M");
  };
  select6M = () => {
    let fromDate = new Date(
      new Date().setMonth(new Date().getMonth() - 6, new Date().getDate() - 1)
    );
    let toDate = new Date(new Date().setDate(new Date().getDate() - 1));
    this.props.changeFromDate([fromDate, toDate]);
    this.props.changeSelectedDateRange("6M");
  };
  select1Y = () => {
    let fromDate = new Date(
      new Date(
        new Date().setFullYear(
          new Date().getFullYear() - 1,
          new Date().getMonth(),
          new Date().getDate() - 1
        )
      )
    );
    let toDate = new Date(new Date().setDate(new Date().getDate() - 1));
    this.props.changeFromDate([fromDate, toDate]);
    this.props.changeSelectedDateRange("1Y");
  };
  selectMAX = () => {
    let fromDate = new Date(
      new Date().setFullYear(new Date().getFullYear() - 10)
    );
    let toDate = new Date(new Date().setDate(new Date().getDate() - 1));
    this.props.changeFromDate([fromDate, toDate]);
    this.props.changeSelectedDateRange("MAX");
  };
  render() {
    return (
      <div className="back-test-page-content">
        <BackTestSaveStrategy
          saveStrategyName={this.props.saveStrategyName}
          changeStrategyName={this.props.changeStrategyNames}
          isSaveInvestStrategy={this.props.isSaveInvestStrategy}
          isExistingStrategy={this.props.isExistingStrategy}
          saveStrategyClicked={this.props.saveStrategyClicked}
          isStrategyEmpty={this.props.isStrategyEmpty}
          isShareStrategyVisible={this.props.isShareStrategyVisible}
          shareThisStrategy={this.props.shareThisStrategy}
        />
        <div className="back-test-page-content-blocks-container">
          <div
            id="back-test-page-content-block-left"
            className="back-test-page-content-block back-test-page-content-block-left"
          >
            <BackTestBuilder
              getAssetDataAfterStrategyUpdate={
                this.props.getAssetDataAfterStrategyUpdate
              }
              changeUserAndStrategy={this.props.changeUserAndStrategy}
              copiedItem={this.props.copiedItem}
              setCopiedItem={this.props.setCopiedItem}
              changeIsStrategyEmpty={this.props.changeIsStrategyEmpty}
              passedUserList={this.props.passedUserList}
              passedStrategyList={this.props.passedStrategyList}
              saveStrategyName={this.props.saveStrategyName}
              saveStrategyCheck={this.props.saveStrategyCheck}
              showSaveStrategy={this.props.showSaveStrategy}
              hideSaveStrategy={this.props.hideSaveStrategy}
            />
            {/* <Image
              className="btpcb-left-block-items"
              src={FakeStrategy6Image}
            />
            <Image
              className="btpcb-left-block-background"
              src={FakeStrategyBackground2Image}
            /> */}
          </div>
          <div
            id="back-test-page-content-block-right"
            className="back-test-page-content-block"
          >
            <BackTestChart
              calcChartData={this.props.calcChartData}
              performanceVisualizationGraphLoading={
                this.props.performanceVisualizationGraphLoading
              }
              strategiesOptions={this.props.strategiesOptions}
              selectedStrategiesOptions={this.props.selectedStrategiesOptions}
              selectStrategies={this.props.selectStrategies}
              performanceVisualizationGraphData={
                this.props.performanceVisualizationGraphData
              }
              performanceVisualizationGraphDataOriginal={
                this.props.performanceVisualizationGraphDataOriginal
              }
              hideToCalendar={this.props.hideToCalendar}
              hideFromCalendar={this.props.hideFromCalendar}
              showToCalendar={this.props.showToCalendar}
              isFromCalendar={this.props.isFromCalendar}
              isToCalendar={this.props.isToCalendar}
              changeFromDate={this.props.changeFromDate}
              changeToDate={this.props.changeToDate}
              fromDate={this.props.fromDate}
              hoverInfo={this.props.hoverInfo}
              toDate={this.props.toDate}
            />
            <div className="btpcb-title btpcb-title-per-met">
              <div>Performance Metrics</div>

              <div
                class={`btpcb-chart-time-range-table ${
                  this.props.performanceMetricTableLoading
                    ? "btpcb-chart-time-range-table-hidden"
                    : ""
                }`}
              >
                <div
                  id="1"
                  class="inter-display-medium f-s-13 lh-16 date-selection-container"
                  onClick={this.props.showFromCalendar}
                >
                  <div
                    className={`date-selection-item ${
                      this.props.selectedDateRange === "1W"
                        ? "date-selection-item-selected"
                        : ""
                    }`}
                    onClick={this.select1W}
                  >
                    1W
                  </div>
                  <div
                    className={`date-selection-item ${
                      this.props.selectedDateRange === "1M"
                        ? "date-selection-item-selected"
                        : ""
                    }`}
                    onClick={this.select1M}
                  >
                    1M
                  </div>
                  <div
                    className={`date-selection-item ${
                      this.props.selectedDateRange === "3M"
                        ? "date-selection-item-selected"
                        : ""
                    }`}
                    onClick={this.select3M}
                  >
                    3M
                  </div>
                  <div
                    className={`date-selection-item ${
                      this.props.selectedDateRange === "6M"
                        ? "date-selection-item-selected"
                        : ""
                    }`}
                    onClick={this.select6M}
                  >
                    6M
                  </div>
                  <div
                    className={`date-selection-item ${
                      this.props.selectedDateRange === "1Y"
                        ? "date-selection-item-selected"
                        : ""
                    }`}
                    onClick={this.select1Y}
                  >
                    1Y
                  </div>
                  {/* <div
                    className={`date-selection-item ${
                      this.props.selectedDateRange === "MAX"
                        ? "date-selection-item-selected"
                        : ""
                    }`}
                    onClick={this.selectMAX}
                  >
                    MAX
                  </div> */}
                </div>
              </div>
            </div>

            <div className="btpcb-right-table-container">
              <div
                style={{
                  overflowX: this.state.isMobile ? "scroll" : "",
                }}
                className={`${
                  this.state.isMobile
                    ? "freezeTheFirstColumn newHomeTableContainer hide-scrollbar"
                    : "cost-table-section"
                }`}
              >
                <TransactionTable
                  message="No performance metric found"
                  tableData={this.props.performanceMetricTableData}
                  columnList={this.props.performanceMetricColumnList}
                  isLoading={this.props.performanceMetricTableLoading}
                  yAxisScrollable
                  addWatermark={!this.state.isMobile}
                  fakeWatermark={this.state.isMobile}
                  xAxisScrollable={this.state.isMobile}
                  xAxisScrollableColumnWidth={3.5}
                  isMiniversion={this.state.isMobile}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};

BackTestPageContent.propTypes = {};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BackTestPageContent);
