import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import moment from "moment";
import {
  BackTestGraphHandleIcon,
  GraphLogoDark,
  InfoIcon,
} from "../../../../assets/images/icons";
import { BaseReactComponent } from "../../../../utils/form";
import {
  amountFormat,
  CurrencyType,
  mobileCheck,
  strategyBuilderAssetList,
  strategyBuilderChartLineColorByIndex,
  strategyBuilderChartLineColorByIndexLowOpacity,
} from "../../../../utils/ReusableFunctions";
import Loading from "../../../common/Loading";
import "./_backTestChart.scss";
import BackTestStrategyDropdown from "./BackTestStrategyDropdown/BackTestStrategyDropdown";
import CustomOverlay from "src/utils/commonComponent/CustomOverlay";

require("highcharts/modules/annotations")(Highcharts);

class BackTestChart extends BaseReactComponent {
  constructor(props) {
    super(props);

    this.state = {
      isMobile: mobileCheck(),
      todayDate: new Date(),
      prevMinRange: -1,
      prevMaxRange: -1,
    };
  }
  graphContainerSetting = {
    style: { height: "35rem" },
  };

  render() {
    let parent = this;
    return (
      <>
        <div className="btpcb-title btpcb-chart-header">
          <div className="btpcb-chart-header-title">
            <div>Performance Visualization</div>
            <CustomOverlay
              position="top"
              isIcon={false}
              isInfo={true}
              isText={true}
              className={"fix-width"}
              text="We assume an initial investment of $100,000"
            >
              <InfoIcon
                onMouseEnter={this.props.hoverInfo}
                className="header-info-icon"
              />
            </CustomOverlay>
          </div>

          <div
            className={`btpcb-chart-dropdown ${
              this.props.performanceVisualizationGraphLoading
                ? "btpcb-chart-dropdown-hidden"
                : ""
            }`}
          >
            <BackTestStrategyDropdown
              allOptions={this.props.strategiesOptions}
              selectedOption={this.props.selectedStrategiesOptions}
              onOptionSelect={this.props.selectStrategies}
            />
            {/* <CustomDropdown
              // Limit Select
              filtername="Strategies selected"
              options={this.props.strategiesOptions}
              action={null}
              // selectedTokens={[]}
              selectedTokens={this.props.selectedStrategiesOptions}
              handleClick={this.props.selectStrategies}
              isLineChart
              getObject={true}
              // Limit Select
              // placeholderName="Strategy"
              // singleSelectedItemName="Strategy"
              // multipleSelectedItemName="Strategies"
            /> */}
          </div>
        </div>
        {this.props.performanceVisualizationGraphLoading ? (
          <div className="btpcb-right-chart-container">
            <div className="btpcb-right-chart-container-loader">
              <Loading />
            </div>
          </div>
        ) : (
          <div
            className={`btpcb-right-chart-container ${
              this.state.isMobile ? "btpcb-right-chart-container-mobile" : ""
            }`}
          >
            {/* <div className="btpcb-chart-dropdown-container">
            <div />
            <div class="btpcb-chart-time-range ">
            <div
              id="0"
              class="inter-display-medium f-s-13 lh-16 time-no-cal-badge time-no-cal-badge-no-left"
            >
              From
            </div>
            <div
              id="1"
              class="inter-display-medium f-s-13 lh-16 time-cal-badge"
            >
              <OutsideClickHandler onOutsideClick={this.props.hideFromCalendar}>
                <div className="btpcb-chart-calendar-Container">
                  <div
                    className="btpcb-chart-calendar-Text"
                    onClick={this.props.showFromCalendar}
                  >
                    {this.props.fromDate
                      ? moment(this.props.fromDate).format("D MMM YYYY")
                      : ""}
                  </div>
                  {this.props.isFromCalendar ? (
                    <div className="intelligenceCalendar">
                      <Calendar
                        date={this.props.fromDate}
                        className={
                          "calendar-select inter-display-medium f-s-13 lh-16"
                        }
                        onChange={this.props.changeFromDate}
                        maxDate={this.props.toDate}
                        defaultValue={this.props.fromDate}
                      />
                    </div>
                  ) : null}
                </div>
              </OutsideClickHandler>
            </div>
            <div
              id="2"
              class="inter-display-medium f-s-13 lh-16 time-no-cal-badge"
            >
              To
            </div>
            <div
              id="3"
              class="inter-display-medium f-s-13 lh-16 time-cal-badge"
            >
              <OutsideClickHandler onOutsideClick={this.props.hideToCalendar}>
                <div className="btpcb-chart-calendar-Container">
                  <div
                    className="btpcb-chart-calendar-Text"
                    onClick={this.props.showToCalendar}
                  >
                    {this.props.toDate
                      ? moment(this.props.toDate).format("D MMM YYYY")
                      : ""}
                  </div>
                  {this.props.isToCalendar ? (
                    <div className="intelligenceCalendar">
                      <Calendar
                        date={this.props.toDate}
                        className={
                          "calendar-select inter-display-medium f-s-13 lh-16"
                        }
                        onChange={this.props.changeToDate}
                        minDate={this.props.fromDate}
                        maxDate={this.state.todayDate}
                        defaultValue={this.props.toDate}
                      />
                    </div>
                  ) : null}
                </div>
              </OutsideClickHandler>
            </div>
            </div>
            <div className="btpcb-chart-dropdown">
              <CustomDropdown
                placeholderName="Strategy"
                filtername="Strategies selected"
                options={this.props.strategiesOptions}
                selectedTokens={this.props.selectedStrategiesOptions}
                handleClick={this.props.selectStrategies}
                singleSelectedItemName="Strategy"
                multipleSelectedItemName="Strategies"
              />
            </div>
          </div> */}

            <div
              style={{
                zoom: this.state.isMobile ? "" : "1.176",
              }}
            >
              <HighchartsReact
                containerProps={this.graphContainerSetting}
                highcharts={Highcharts}
                constructorType={"stockChart"}
                options={{
                  legend: {
                    enabled: true,
                    verticalAlign: "bottom",
                    // align: "left",
                    symbolWidth: 0,
                    symbolHeight: 0,
                    symbolRadius: 0,
                    useHTML: true,
                    padding: 0,

                    labelFormatter: function () {
                      let curName = this.name;
                      let myCurName = curName.toUpperCase();
                      let isStrategy = false;
                      let allAssets = strategyBuilderAssetList().map(
                        (item) => item.name
                      );

                      if (!allAssets.includes(myCurName)) {
                        isStrategy = true;
                      }
                      if (curName.length > 4) {
                        curName = curName.substring(0, 3) + "...";
                      }
                      return `<div
                      style="backgroundColor:${
                        isStrategy
                          ? "var(--strategyBuilderGraphStrategyLowOpacity)"
                          : strategyBuilderChartLineColorByIndexLowOpacity(
                              this.symbolIndex
                            )
                      };borderColor:${
                        isStrategy
                          ? "var(--strategyBuilderGraphStrategyLowOpacity)"
                          : strategyBuilderChartLineColorByIndexLowOpacity(
                              this.symbolIndex
                            )
                      }"
                      class="strategy-builder-chart-legend dotDotText inter-display-medium text-uppercase f-s-13"
                    >
                      <svg
                        width="5"
                        height="6"
                        viewBox="0 0 5 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        class="strategy-builder-chart-legend-circle"
                      >
                        <circle
                          cx="2.5"
                          cy="3"
                          r="2.5"
                          fill=${
                            isStrategy
                              ? "var(--strategyBuilderGraphStrategy)"
                              : strategyBuilderChartLineColorByIndex(
                                  this.symbolIndex
                                )
                          }
                        />
                      </svg>

                      <div className="strategy-builder-chart-legend-text dotDotText">
                        ${curName}
                      </div>
                    </div>`;
                    },
                  },
                  title: {
                    text: null,
                  },
                  tooltip: {
                    // shared: true,
                    split: true,
                    useHTML: true,
                    // distance: 20,
                    borderRadius: 9,
                    // borderColor: "",
                    backgroundColor: "var(--cardBackgroud)",
                    // outside: true,
                    // borderShadow: 0,
                    borderWidth: 1.5,
                    shadow: {
                      opacity: 0.05,
                    },
                    // hideDelay: 0,

                    formatter: function () {
                      const tempHolder = this.points.map(
                        (point, pointIndex) => {
                          let itemTitle = "";
                          let itemColor = "";
                          let itemAmount = "";
                          let itemPercentage = amountFormat(
                            point.y,
                            "en-US",
                            "USD"
                          );
                          if (
                            parent.props
                              .performanceVisualizationGraphDataOriginal &&
                            parent.props
                              .performanceVisualizationGraphDataOriginal[
                              pointIndex
                            ] &&
                            parent.props
                              .performanceVisualizationGraphDataOriginal[
                              pointIndex
                            ]
                          ) {
                            itemAmount =
                              parent.props
                                .performanceVisualizationGraphDataOriginal[
                                pointIndex
                              ][point.x];
                          }
                          if (point.series && point.series.userOptions) {
                            itemTitle = point.series.userOptions.name;
                            itemColor = point.series.userOptions.color;

                            itemTitle = itemTitle.toUpperCase();
                          }
                          if (itemAmount === undefined || itemAmount === null) {
                            itemAmount = 0;
                            itemPercentage = 0;
                            if (point?.series?.userOptions?.data[0][2]) {
                              itemAmount = point.series.userOptions.data[0][2];
                            }
                          }

                          return `<div class="back-test-chart-tool-tip">
                              <div style="color:${itemColor}" >${itemTitle}</div>
                              <div>${itemPercentage}%</div>
                              <div class="back-test-chart-tool-tip-amount">${
                                CurrencyType(false) +
                                amountFormat(itemAmount, "en-US", "USD")
                              }</div>
                            </div>`;
                        }
                      );

                      if (tempHolder) {
                        return [
                          `<div class="back-test-chart-tool-tip">
                              <div>${moment(this.x).format("DD MMM YYYY")}</div>
                            </div>`,
                          ...tempHolder,
                        ];
                      }
                      return "";
                    },
                    style: {
                      zIndex: 100,
                    },
                  },
                  chart: {
                    marginTop: -10,
                    // marginBottom: 0,
                    marginLeft: 5,
                    marginRight: 5,
                    spacingTop: -30,
                    events: {
                      load: function () {
                        // Get the renderer
                        const renderer = this.renderer;
                        const chartWidth = this.chartWidth;
                        const chartHeight = this.chartHeight;
                        const imageWidth = 104; // Set the width of the image
                        const imageHeight = 39; // Set the height of the image
                        const x = (chartWidth - imageWidth) / 2;
                        const y = (chartHeight - imageHeight) / 2.5;

                        renderer
                          .image(GraphLogoDark, x, y, imageWidth, imageHeight)
                          .attr({
                            zIndex: 2,
                            class: "half-opacity",
                          })
                          .add();
                        const chart = this;
                        let startIndex = 0;
                        let endIndex = 0;
                        let selectedItem = 0;
                        let selectedItemIndex = 0;
                        if (
                          parent &&
                          parent.props &&
                          parent.props.performanceVisualizationGraphData &&
                          parent.props.performanceVisualizationGraphData
                            .length > 0
                        ) {
                          parent.props.performanceVisualizationGraphData.forEach(
                            (curItem, curItemIndex) => {
                              if (
                                curItem.data &&
                                curItem.data[0] &&
                                curItem.data[0][0] &&
                                curItem.data[0][0] > selectedItem
                              ) {
                                selectedItem = curItem.data[0][0];
                                selectedItemIndex = curItemIndex;
                              }
                            }
                          );
                        }

                        if (
                          parent &&
                          parent.props &&
                          parent.props.performanceVisualizationGraphData &&
                          parent.props.performanceVisualizationGraphData[
                            selectedItemIndex
                          ] &&
                          parent.props.performanceVisualizationGraphData[
                            selectedItemIndex
                          ].data &&
                          parent.props.performanceVisualizationGraphData[
                            selectedItemIndex
                          ].data.length > 0
                        ) {
                          if (
                            parent.props.performanceVisualizationGraphData[
                              selectedItemIndex
                            ].data[0]
                          ) {
                            startIndex =
                              parent.props.performanceVisualizationGraphData[
                                selectedItemIndex
                              ].data[0][0];
                          }

                          let fullLength =
                            parent.props.performanceVisualizationGraphData[
                              selectedItemIndex
                            ].data.length - 1;

                          if (
                            parent.props.performanceVisualizationGraphData[
                              selectedItemIndex
                            ].data[fullLength]
                          ) {
                            endIndex =
                              parent.props.performanceVisualizationGraphData[
                                selectedItemIndex
                              ].data[fullLength][0];
                          }
                        }
                        chart.xAxis[0].setExtremes(startIndex, endIndex);
                      },
                    },
                    zoomType: "x",
                    style: {
                      fontFamily: "Inter, Arial, Helvetica, sans-serif",
                      fontSize: "12px",
                    },
                  },
                  credits: {
                    enabled: false,
                  },

                  scrollbar: {
                    enabled: true,
                    liveRedraw: false,
                    height: 0,
                    barBackgroundColor: "transparent",
                    barBorderRadius: 4,
                    barBorderWidth: 0,
                    trackBackgroundColor: "transparent",
                    trackBorderWidth: 0,
                    trackBorderRadius: 10,
                    trackBorderColor: "transparent",
                    rifleColor: "transparent",
                    margin: 150,
                  },
                  series: this.props.performanceVisualizationGraphData
                    ? this.props.performanceVisualizationGraphData
                    : [],
                  yAxis: {
                    opposite: false,
                    gridLineColor: "var(--strategyBuilderGraphGrid)",
                    gridLineWidth: 1,
                    tickAmount: 8,
                    labels: {
                      enabled: false,
                    },
                  },

                  xAxis: {
                    tickAmount: 8,
                    lineWidth: 0,
                    gridLineColor: "var(--strategyBuilderGraphGrid)",
                    gridLineWidth: 1,
                    events: {
                      afterSetExtremes: function (e) {
                        let minEle = moment(e.min).format("DD MM YYYY");
                        // let maxEle = moment(e.max).format("DD MM YYYY");
                        if (this.reDraw) {
                          clearTimeout(this.reDraw);
                        }
                        this.reDraw = setTimeout(() => {
                          parent.props.calcChartData(minEle, e.min);
                        }, 1000);
                      },
                    },
                    labels: {
                      formatter: function () {
                        return `<div class="back-test-chart-xaxis-lable">${moment(
                          this.value
                        ).format("MMM YY")}</div>`;
                      },
                    },
                  },
                  navigator: {
                    margin: 10,
                    height: 25,
                    outlineColor: "var(--strategyBuilderGraphNavigatorOuline)",
                    outlineWidth: 1,
                    maskFill: "var(--strategyBuilderGraphNavigatorMaskFill)",
                    stickToMax: false,
                    handles: {
                      lineWidth: 0,
                      width: 7,
                      height: 16,
                      symbols: [
                        `url(${BackTestGraphHandleIcon})`,
                        `url(${BackTestGraphHandleIcon})`,
                      ],
                    },
                    xAxis: {
                      visible: true,
                      labels: {
                        enabled: false,
                      },
                      gridLineWidth: 0,
                      plotBands: [
                        {
                          from: -100000000000,
                          to: 10000000000000000,
                          color:
                            "var(--strategyBuilderGraphNavigatorMaskBackground)",
                        },
                      ],
                    },
                    series: {
                      color: "transparent",
                      lineWidth: 2,
                      type: "areaspline",
                      fillOpacity: 0,
                      lineColor: "#96979A",
                      fillColor: "transparent",
                      dataGrouping: {
                        groupPixelWidth: 0,
                      },
                      marker: {
                        enabled: false,
                      },
                      dataLabels: {
                        enabled: false,
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        )}
      </>
    );
  }
}

export default BackTestChart;
