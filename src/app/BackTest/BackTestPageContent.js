// Performance Visualization -> Backtest Performance
// Strategy Performance -> Performance Visualization
// Performance Preview -> Performance Metrics

import React from "react";

import moment from "moment";
import Calendar from "react-calendar";
import OutsideClickHandler from "react-outside-click-handler";
import { connect } from "react-redux";
import { BaseReactComponent } from "../../utils/form";
import { mobileCheck } from "../../utils/ReusableFunctions";
import TransactionTable from "../intelligence/TransactionTable";
import BackTestBuilder from "./BackTestComponents/BackTestBuilder/BackTestBuilder";
import BackTestChart from "./BackTestComponents/BackTestChart/BackTestChart";
import BackTestSaveStrategy from "./BackTestComponents/BackTestBuilder/Components/BackTestSaveStrategy/BackTestSaveStrategy";
import { StrategyBuilderPencilLightIcon } from "src/assets/images/icons";
import { Image } from "react-bootstrap";
import BackTestTable from "./BackTestComponents/BackTestChart/BackTestTable";

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

  render() {
    return (
      <div className="back-test-page-content">
        <BackTestSaveStrategy
          disableSaveBtn={this.props.disableSaveBtn}
          strategyInputValue={this.props.strategyInputValue}
          changeStragegyName={this.props.changeStragegyName}
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
                <OutsideClickHandler
                  onOutsideClick={this.props.hideFromCalendar}
                >
                  <div
                    id="1"
                    class="inter-display-medium f-s-13 lh-16 time-cal-badge"
                    onClick={this.props.showFromCalendar}
                  >
                    <div className="inter-display-medium f-s-13 lh-16 time-no-cal-badge">
                      From
                    </div>
                    <div className="btpcb-chart-calendar-Container">
                      <div className="btpcb-chart-calendar-Text">
                        {this.props.fromDate
                          ? moment(this.props.fromDate).format("D MMM YYYY")
                          : ""}
                      </div>
                      {this.props.isFromCalendar ? (
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          className="intelligenceCalendar"
                        >
                          <Calendar
                            selectRange
                            className={
                              "calendar-select inter-display-medium f-s-13 lh-16"
                            }
                            onChange={this.props.changeFromDate}
                            maxDate={this.state.todayDate}
                            defaultActiveStartDate={this.props.fromDate}
                          />
                        </div>
                      ) : null}
                    </div>

                    <div
                      id="2"
                      class="inter-display-medium f-s-13 lh-16 time-no-cal-badge"
                    >
                      To
                    </div>
                    <div className="btpcb-chart-calendar-Container">
                      <div className="btpcb-chart-calendar-Text">
                        {this.props.toDate
                          ? moment(this.props.toDate).format("D MMM YYYY")
                          : ""}
                      </div>
                      {this.props.isToCalendar ? (
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          className="intelligenceCalendar"
                        >
                          <Calendar
                            selectRange
                            className={
                              "calendar-select inter-display-medium f-s-13 lh-16"
                            }
                            onChange={this.props.changeFromDate}
                            maxDate={this.state.todayDate}
                            defaultActiveStartDate={this.props.toDate}
                          />
                        </div>
                      ) : null}
                    </div>
                    <Image
                      className="btpcb-chart-calendar-icon"
                      src={StrategyBuilderPencilLightIcon}
                    />
                  </div>
                  {/* </OutsideClickHandler> */}
                  {/* <OutsideClickHandler onOutsideClick={this.props.hideToCalendar}> */}
                  {/* <div
                    id="3"
                    class={`inter-display-medium f-s-13 lh-16 time-cal-badge time-cal-badge-right-cal`}
                    onClick={this.props.showToCalendar}
                  >
                    <div className="btpcb-chart-calendar-Container">
                      <div className="btpcb-chart-calendar-Text">
                        {this.props.toDate
                          ? moment(this.props.toDate).format("D MMM YYYY")
                          : ""}
                      </div>
                      {this.props.isToCalendar ? (
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          className="intelligenceCalendar"
                        >
                          <Calendar
                            selectRange
                            className={
                              "calendar-select inter-display-medium f-s-13 lh-16"
                            }
                            onChange={this.props.changeFromDate}
                            maxDate={this.state.todayDate}
                            defaultActiveStartDate={this.props.toDate}
                          />
                        </div>
                      ) : null}
                    </div>
                    <Image
                      className="btpcb-chart-calendar-icon"
                      src={StrategyBuilderPencilLightIcon}
                    />
                  </div> */}
                </OutsideClickHandler>
              </div>
            </div>

            <BackTestTable
              currentAssetsColors={this.props.currentAssetsColors}
              performanceMetricTableData={this.props.performanceMetricTableData}
              // performanceMetricColumnList={
              //   this.props.performanceMetricColumnList
              // }
              sortOption={this.props.sortOption}
              handleTableSort={this.props.handleTableSort}
              performanceMetricTableLoading={
                this.props.performanceMetricTableLoading
              }
            />
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
