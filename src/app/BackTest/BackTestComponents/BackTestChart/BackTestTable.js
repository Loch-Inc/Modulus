import Highcharts from "highcharts/highstock";
import { Image } from "react-bootstrap";
import TransactionTable from "src/app/intelligence/TransactionTable";
import { SortByIcon } from "src/assets/images/icons";
import CustomOverlay from "src/utils/commonComponent/CustomOverlay";
import {
  mobileCheck,
  numToCurrency,
  strategyBuilderAssetList,
  strategyBuilderChartLineColorByIndex,
  strategyBuilderChartLineColorByIndexLowOpacity,
} from "src/utils/ReusableFunctions";
import { BaseReactComponent } from "../../../../utils/form";
import "./_backTestChart.scss";

require("highcharts/modules/annotations")(Highcharts);

class BackTestTable extends BaseReactComponent {
  constructor(props) {
    super(props);

    this.state = {
      isMobile: mobileCheck(),
    };
  }

  render() {
    const performanceMetricColumnList = [
      {
        labelName: (
          <div
            className="history-table-header-col no-hover history-table-header-col-curve-left"
            id="time"
          >
            <span className="inter-display-medium f-s-11">
              Asset
              <br />
            </span>
          </div>
        ),
        dataKey: "strategy",

        coumnWidth: 0.14285714,
        isCell: true,
        cell: (rowData, dataKey, dataIndex) => {
          if (dataKey === "strategy") {
            let isStrategy = false;
            let allAssets = strategyBuilderAssetList().map((item) => item.name);
            let myKey = rowData.strategy_name.toUpperCase();
            if (!allAssets.includes(myKey)) {
              isStrategy = true;
            }
            return (
              <div className="strategy-builder-table-strategy-name-container">
                <CustomOverlay
                  position="top"
                  isIcon={false}
                  isInfo={true}
                  isText={true}
                  text={
                    rowData.strategy_name
                      ? rowData.strategy_name.toUpperCase()
                      : ""
                  }
                >
                  <div
                    style={{
                      backgroundColor: isStrategy
                        ? "var(--strategyBuilderGraphStrategyLowOpacity)"
                        : this.props.currentAssetsColors &&
                          this.props.currentAssetsColors[rowData.strategy_name]
                        ? strategyBuilderChartLineColorByIndexLowOpacity(
                            this.props.currentAssetsColors[
                              rowData.strategy_name
                            ]
                          )
                        : strategyBuilderChartLineColorByIndexLowOpacity(
                            dataIndex
                          ),
                    }}
                    className="strategy-builder-table-strategy-name dotDotText inter-display-medium text-uppercase f-s-14"
                  >
                    <svg
                      width="5"
                      height="6"
                      viewBox="0 0 5 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="strategy-builder-table-strategy-name-circle"
                    >
                      <circle
                        cx="2.5"
                        cy="3"
                        r="2.5"
                        fill={
                          isStrategy
                            ? "var(--strategyBuilderGraphStrategy)"
                            : this.props.currentAssetsColors &&
                              this.props.currentAssetsColors[
                                rowData.strategy_name
                              ]
                            ? strategyBuilderChartLineColorByIndex(
                                this.props.currentAssetsColors[
                                  rowData.strategy_name
                                ]
                              )
                            : strategyBuilderChartLineColorByIndex(dataIndex)
                        }
                      />
                    </svg>

                    <div className="strategy-builder-table-strategy-name-text dotDotText">
                      {rowData.strategy_name}
                    </div>
                  </div>
                </CustomOverlay>
              </div>
            );
          }
        },
      },
      {
        labelName: (
          <div className="history-table-header-col no-hover" id="time">
            <span className="inter-display-medium f-s-11 ">
              Cumulative
              <br />
              Return
            </span>
            <div
              onClick={() => this.props.handleTableSort(1)}
              className="table-sort-icon-container"
            >
              <Image
                src={SortByIcon}
                className={`table-sort-icon ${
                  this.props.sortOption.column === 1 &&
                  !this.props.sortOption.value
                    ? "table-sort-icon-rotateDown"
                    : "table-sort-icon-rotateUp"
                }`}
              />
            </div>
          </div>
        ),
        dataKey: "cumret",

        coumnWidth: 0.14285714,
        isCell: true,
        cell: (rowData, dataKey) => {
          if (dataKey === "cumret") {
            return (
              <div className="inter-display-medium f-s-14">
                {rowData.cumulative_return ? (
                  <span>
                    {rowData.cumulative_return < 0 ? "-" : ""}
                    {numToCurrency(rowData.cumulative_return).toLocaleString(
                      "en-US"
                    )}
                    %
                  </span>
                ) : (
                  "0.00%"
                )}
              </div>
            );
          }
        },
      },
      {
        labelName: (
          <div className="history-table-header-col no-hover" id="time">
            <span className="inter-display-medium f-s-11 ">
              Annual
              <br />
              Return
            </span>
            <div
              onClick={() => this.props.handleTableSort(2)}
              className="table-sort-icon-container"
            >
              <Image
                src={SortByIcon}
                className={`table-sort-icon ${
                  this.props.sortOption.column === 2 &&
                  !this.props.sortOption.value
                    ? "table-sort-icon-rotateDown"
                    : "table-sort-icon-rotateUp"
                }`}
              />
            </div>
          </div>
        ),
        dataKey: "anuret",

        coumnWidth: 0.14285714,
        isCell: true,
        cell: (rowData, dataKey) => {
          if (dataKey === "anuret") {
            return (
              // <CustomOverlay
              //   position="top"
              //   isIcon={false}
              //   isInfo={true}
              //   isText={true}
              //   text={
              //     rowData.annual_return
              //       ? rowData.annual_return + "%"
              //       : "0.00%"
              //   }
              // >
              <div className="inter-display-medium f-s-14">
                {rowData.annual_return ? (
                  <span>
                    {rowData.annual_return < 0 ? "-" : ""}
                    {numToCurrency(rowData.annual_return).toLocaleString(
                      "en-US"
                    )}
                    %
                  </span>
                ) : (
                  "0.00%"
                )}
              </div>
              //  </CustomOverlay>
            );
          }
        },
      },
      {
        labelName: (
          <div
            className="history-table-header-col no-hover history-table-header-col-curve-right"
            id="time"
          >
            <span className="inter-display-medium f-s-11 ">
              Sharpe
              <br />
              Ratio
            </span>
            <div
              onClick={() => this.props.handleTableSort(3)}
              className="table-sort-icon-container"
            >
              <Image
                src={SortByIcon}
                className={`table-sort-icon ${
                  this.props.sortOption.column === 3 &&
                  !this.props.sortOption.value
                    ? "table-sort-icon-rotateDown"
                    : "table-sort-icon-rotateUp"
                }`}
              />
            </div>
          </div>
        ),
        dataKey: "sharpeRatio",

        coumnWidth: 0.14285714,
        isCell: true,
        cell: (rowData, dataKey) => {
          if (dataKey === "sharpeRatio") {
            return (
              // <CustomOverlay
              //   position="top"
              //   isIcon={false}
              //   isInfo={true}
              //   isText={true}
              //   text={
              //     rowData.sharpe_ratio ? rowData.sharpe_ratio + "%" : "0.00%"
              //   }
              // >
              <div className="inter-display-medium f-s-14">
                {rowData.sharpe_ratio ? (
                  <span>
                    {rowData.sharpe_ratio < 0 ? "-" : ""}
                    {numToCurrency(rowData.sharpe_ratio).toLocaleString(
                      "en-US"
                    )}
                  </span>
                ) : (
                  "0.00%"
                )}
              </div>
              //  </CustomOverlay>
            );
          }
        },
      },
      {
        labelName: (
          <div className="history-table-header-col no-hover" id="time">
            <span className="inter-display-medium f-s-11 ">
              Max 1d
              <br />
              Drawdown
            </span>
            <div
              onClick={() => this.props.handleTableSort(4)}
              className="table-sort-icon-container"
            >
              <Image
                src={SortByIcon}
                className={`table-sort-icon ${
                  this.props.sortOption.column === 4 &&
                  !this.props.sortOption.value
                    ? "table-sort-icon-rotateDown"
                    : "table-sort-icon-rotateUp"
                }`}
              />
            </div>
          </div>
        ),
        dataKey: "max1ddd",

        coumnWidth: 0.14285714,
        isCell: true,
        cell: (rowData, dataKey) => {
          if (dataKey === "max1ddd") {
            return (
              // <CustomOverlay
              //   position="top"
              //   isIcon={false}
              //   isInfo={true}
              //   isText={true}
              //   text={
              //     rowData.max_1d_drawdown
              //       ? rowData.max_1d_drawdown + "%"
              //       : "0.00%"
              //   }
              // >
              <div className="inter-display-medium f-s-14">
                {rowData.max_1d_drawdown ? (
                  <span>
                    {rowData.max_1d_drawdown < 0 ? "-" : ""}
                    {numToCurrency(rowData.max_1d_drawdown).toLocaleString(
                      "en-US"
                    )}
                    %
                  </span>
                ) : (
                  "0.00%"
                )}
              </div>
              //  </CustomOverlay>
            );
          }
        },
      },
      {
        labelName: (
          <div className="history-table-header-col no-hover" id="time">
            <span className="inter-display-medium f-s-11 ">
              Max 1w
              <br />
              Drawdown
            </span>
            <div
              onClick={() => this.props.handleTableSort(5)}
              className="table-sort-icon-container"
            >
              <Image
                src={SortByIcon}
                className={`table-sort-icon ${
                  this.props.sortOption.column === 5 &&
                  !this.props.sortOption.value
                    ? "table-sort-icon-rotateDown"
                    : "table-sort-icon-rotateUp"
                }`}
              />
            </div>
          </div>
        ),
        dataKey: "max1wdd",

        coumnWidth: 0.14285714,
        isCell: true,
        cell: (rowData, dataKey) => {
          if (dataKey === "max1wdd") {
            return (
              // <CustomOverlay
              //   position="top"
              //   isIcon={false}
              //   isInfo={true}
              //   isText={true}
              //   text={
              //     rowData.max_1w_drawdown
              //       ? rowData.max_1w_drawdown + "%"
              //       : "0.00%"
              //   }
              // >
              <div className="inter-display-medium f-s-14">
                {rowData.max_1w_drawdown ? (
                  <span>
                    {rowData.max_1w_drawdown < 0 ? "-" : ""}
                    {numToCurrency(rowData.max_1w_drawdown).toLocaleString(
                      "en-US"
                    )}
                    %
                  </span>
                ) : (
                  "0.00%"
                )}
              </div>
              //  </CustomOverlay>
            );
          }
        },
      },
      {
        labelName: (
          <div className="history-table-header-col no-hover" id="time">
            <span className="inter-display-medium f-s-11 ">
              Max 1m
              <br />
              Drawdown
            </span>
            <div
              onClick={() => this.props.handleTableSort(6)}
              className="table-sort-icon-container"
            >
              <Image
                src={SortByIcon}
                className={`table-sort-icon ${
                  this.props.sortOption.column === 6 &&
                  !this.props.sortOption.value
                    ? "table-sort-icon-rotateDown"
                    : "table-sort-icon-rotateUp"
                }`}
              />
            </div>
          </div>
        ),
        dataKey: "max1mdd",

        coumnWidth: 0.14285714,
        isCell: true,
        cell: (rowData, dataKey) => {
          if (dataKey === "max1mdd") {
            return (
              // <CustomOverlay
              //   position="top"
              //   isIcon={false}
              //   isInfo={true}
              //   isText={true}
              //   text={
              //     rowData.max_1m_drawdown
              //       ? rowData.max_1m_drawdown + "%"
              //       : "0.00%"
              //   }
              // >
              <div className="inter-display-medium f-s-14">
                {rowData.max_1m_drawdown ? (
                  <span>
                    {rowData.max_1m_drawdown < 0 ? "-" : ""}
                    {numToCurrency(rowData.max_1m_drawdown).toLocaleString(
                      "en-US"
                    )}
                    %
                  </span>
                ) : (
                  "0.00%"
                )}
              </div>
              //  </CustomOverlay>
            );
          }
        },
      },
    ];
    return (
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
            columnList={performanceMetricColumnList}
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
    );
  }
}

export default BackTestTable;
