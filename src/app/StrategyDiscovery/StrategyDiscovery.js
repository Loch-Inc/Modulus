import { connect } from "react-redux";
import { BaseReactComponent } from "../../utils/form";

import moment from "moment";
import { Image } from "react-bootstrap";
import { API_LIMIT, START_INDEX } from "src/utils/Constant";
import { SortByIcon } from "../../assets/images/icons";
import CustomOverlay from "../../utils/commonComponent/CustomOverlay";
import {
  mobileCheck,
  numToCurrency,
  scrollToBottomAfterPageChange,
  strategyBuilderChartLineColorByIndex,
} from "../../utils/ReusableFunctions";
import TopBar from "../TopBar/TopBar";
import "./_strategyDiscovery.scss";
import { getDiscoverStrategyApi } from "./Api/StrategyDiscoveryApi";
import StrategyDiscoveryContent from "./StrategyDiscoveryContent";

class StrategyDiscovery extends BaseReactComponent {
  constructor(props) {
    super(props);
    const search = props.location.search;
    const params = new URLSearchParams(search);
    const page = params.get("p");
    this.state = {
      toDate: new Date(new Date().setDate(new Date().getDate() - 1)),
      fromDate: new Date(new Date().setMonth(new Date().getMonth() - 1)),
      sortOption: { column: 1, value: false },
      tableSortOption: [
        "strategy_name",
        "cumulative_return",
        "annual_return",
        "max_1d_drawdown",
        "max_1w_drawdown",
        "max_1m_drawdown",
        "sharpe_ratio",
        "created_on",
      ],
      shouldGoToBottom: false,
      currentPage: page ? parseInt(page, 10) : START_INDEX,
      totalPages: 0,
      toDate: new Date(new Date().setDate(new Date().getDate() - 1)),
      fromDate: new Date(new Date().setMonth(new Date().getMonth() - 1)),

      performanceMetricTableData: [],
      performanceMetricTableLoading: false,
    };
  }
  handleTableSort = (column) => {
    if (column === this.state.sortOption.column) {
      this.setState({
        sortOption: { column: column, value: !this.state.sortOption.value },
      });
    } else {
      this.setState({
        sortOption: { column: column, value: false },
      });
    }
  };

  getDiscoverStrategyApiPass = () => {
    let tempSort = this.state.tableSortOption[this.state.sortOption.column];
    if (!this.state.sortOption.value) {
      tempSort = `-${tempSort}`;
    }
    this.setState({
      performanceMetricTableData: [],
      performanceMetricTableLoading: true,
    });
    let tempApiData = new URLSearchParams();
    tempApiData.append("page", this.state.currentPage + 1);
    tempApiData.append("per_page", 10);
    tempApiData.append("sort", tempSort);
    this.props.getDiscoverStrategyApi(tempApiData, this.stopLoading);
  };
  stopLoading = () => {
    this.setState({
      performanceMetricTableLoading: false,
    });
  };

  componentDidMount() {
    this.getDiscoverStrategyApiPass();

    this.props.history.replace({
      search: `?p=${this.state.currentPage}`,
    });
  }
  componentDidUpdate(prevProps, prevState) {
    const prevParams = new URLSearchParams(prevProps.location.search);
    const prevPage = parseInt(prevParams.get("p") || START_INDEX, 10);

    const params = new URLSearchParams(this.props.location.search);
    const page = parseInt(params.get("p") || START_INDEX, 10);
    if (prevPage !== page) {
      this.setState(
        {
          currentPage: page,
        },
        () => {
          this.getDiscoverStrategyApiPass();
        }
      );
    }
    if (
      prevProps.StrategyDiscoveryTableState !==
      this.props.StrategyDiscoveryTableState
    ) {
      let tempBtTableData = this.props.StrategyDiscoveryTableState;
      let totalPages = 0;
      if (tempBtTableData.total_count) {
        totalPages = Math.ceil(tempBtTableData.total_count / API_LIMIT);
      }

      tempBtTableData = tempBtTableData.strategies;

      if (tempBtTableData && tempBtTableData.length > 0) {
        let tempArr = [];

        tempBtTableData.forEach((item) => {
          let curItem = {};
          let name = "";
          let strategy_id = "";
          let user_id = "";
          let created_on = "";
          let user_name = "";

          if (item?.performance) {
            curItem = item;
            name = item.strategy_name;
            strategy_id = item.id;
            user_id = item.created_by;
            created_on = item.created_on;
            user_name = item.username;
          }
          if (curItem?.performance.performance_data) {
            curItem = curItem.performance.performance_data;
          }
          if (curItem) {
            let tempHolder = {
              annual_return: curItem.annual_return,
              calmar_ratio: curItem.calmar_ratio,
              cumulative_return: curItem.cumulative_return,
              max_1d_drawdown: curItem.max_1d_drawdown,
              max_1w_drawdown: curItem.max_1w_drawdown,
              max_1m_drawdown: curItem.max_1m_drawdown,
              sharpe_ratio: curItem.sharpe_ratio,
              strategy_name: name,
              strategy_id: strategy_id,
              user_id: user_id,
              created_on: created_on,
              user_name: user_name,
            };
            tempArr.push(tempHolder);
          }
        });

        this.setState({
          performanceMetricTableData: tempArr,
          performanceMetricTableLoading: false,
          totalPages: totalPages,
        });
      }
    }
    if (prevState.sortOption !== this.state.sortOption) {
      this.setState(
        {
          shouldGoToBottom: false,
        },
        () => {
          this.getDiscoverStrategyApiPass();
        }
      );
    }
    if (
      this.state.performanceMetricTableLoading !==
        prevState.performanceMetricTableLoading &&
      !this.state.performanceMetricTableLoading
    ) {
      if (this.state.firstLoad) {
        this.setState({
          firstLoad: false,
        });
      } else {
        if (this.state.shouldGoToBottom) {
          setTimeout(() => {
            scrollToBottomAfterPageChange();
          }, 50);
        } else {
          this.setState({
            shouldGoToBottom: true,
          });
        }
      }
    }
  }

  goToStrategyBuilderPage = (passedItem) => {
    if (passedItem.strategy_id) {
      this.props.history.push({
        pathname: "/builder",
        state: {
          passedStrategyId: passedItem.strategy_id,
          passedStrategyName: passedItem.strategy_name,
          passedUserId: passedItem.user_id,
        },
      });
    } else {
      this.props.history.push("/builder");
    }
  };
  render() {
    const performanceMetricColumnList = [
      {
        labelName: (
          <div
            className="history-table-header-col no-hover history-table-header-col-curve-left"
            id="time"
            style={{
              justifyContent: "flex-start",
            }}
          >
            <span className="inter-display-medium f-s-10 ">Title</span>
          </div>
        ),
        dataKey: "strategy",

        coumnWidth: 0.14285714,
        isCell: true,
        cell: (rowData, dataKey, rowIndex) => {
          if (dataKey === "strategy") {
            return (
              <div
                onClick={() => {
                  this.goToStrategyBuilderPage(rowData);
                }}
                className="full-table-row-col-width"
              >
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
                  <div className="discover-strategy-table-name-container">
                    <>
                      <div className="discover-strategy-table-name discover-strategy-table-name-title dotDotText inter-display-medium text-uppercase">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="discover-strategy-table-name-circle"
                        >
                          <rect
                            x="5.65686"
                            y="0.343262"
                            width="8"
                            height="8"
                            transform="rotate(45 5.65686 0.343262)"
                            fill={strategyBuilderChartLineColorByIndex(
                              rowIndex
                            )}
                          />
                          <rect
                            x="5.65686"
                            y="1.05037"
                            width="7"
                            height="7"
                            transform="rotate(45 5.65686 1.05037)"
                            stroke="black"
                            stroke-opacity="0.1"
                          />
                        </svg>

                        <div className="dotDotText">
                          {rowData.strategy_name}
                        </div>
                      </div>
                      {rowData.created_on ? (
                        <div className="discover-strategy-table-date">
                          {moment(rowData.created_on).format("DD/MM/YYYY")}
                        </div>
                      ) : null}
                    </>
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
            <span className="inter-display-medium f-s-10 ">
              Cumulative
              <br />
              Return
            </span>
            <div
              onClick={() => this.handleTableSort(1)}
              className="table-sort-icon-container"
            >
              <Image
                src={SortByIcon}
                className={`table-sort-icon ${
                  this.state.sortOption.column === 1 &&
                  !this.state.sortOption.value
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
        cell: (rowData, dataKey, rowIndex) => {
          if (dataKey === "cumret") {
            return (
              <div
                onClick={() => {
                  this.goToStrategyBuilderPage(rowData);
                }}
                className="full-table-row-col-width"
              >
                <div className="inter-display-medium f-s-13">
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
              </div>
            );
          }
        },
      },
      {
        labelName: (
          <div className="history-table-header-col no-hover" id="time">
            <span className="inter-display-medium f-s-10 ">
              Annual
              <br />
              Return
            </span>
            <div
              onClick={() => this.handleTableSort(2)}
              className="table-sort-icon-container"
            >
              <Image
                src={SortByIcon}
                className={`table-sort-icon ${
                  this.state.sortOption.column === 2 &&
                  !this.state.sortOption.value
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
        cell: (rowData, dataKey, rowIndex) => {
          if (dataKey === "anuret") {
            return (
              <div
                onClick={() => {
                  this.goToStrategyBuilderPage(rowData);
                }}
                className="full-table-row-col-width"
              >
                <div className="inter-display-medium f-s-13">
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
              </div>
            );
          }
        },
      },
      {
        labelName: (
          <div className="history-table-header-col no-hover" id="time">
            <span className="inter-display-medium f-s-10 ">
              Max 1d
              <br />
              Drawdown
            </span>
            <div
              onClick={() => this.handleTableSort(3)}
              className="table-sort-icon-container"
            >
              <Image
                src={SortByIcon}
                className={`table-sort-icon ${
                  this.state.sortOption.column === 3 &&
                  !this.state.sortOption.value
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
        cell: (rowData, dataKey, rowIndex) => {
          if (dataKey === "max1ddd") {
            return (
              <div
                onClick={() => {
                  this.goToStrategyBuilderPage(rowData);
                }}
                className="full-table-row-col-width"
              >
                <div className="inter-display-medium f-s-13">
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
              </div>
            );
          }
        },
      },
      {
        labelName: (
          <div className="history-table-header-col no-hover" id="time">
            <span className="inter-display-medium f-s-10 ">
              Max 1w
              <br />
              Drawdown
            </span>
            <div
              onClick={() => this.handleTableSort(4)}
              className="table-sort-icon-container"
            >
              <Image
                src={SortByIcon}
                className={`table-sort-icon ${
                  this.state.sortOption.column === 4 &&
                  !this.state.sortOption.value
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
        cell: (rowData, dataKey, rowIndex) => {
          if (dataKey === "max1wdd") {
            return (
              <div
                onClick={() => {
                  this.goToStrategyBuilderPage(rowData);
                }}
                className="full-table-row-col-width"
              >
                <div className="inter-display-medium f-s-13">
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
              </div>
            );
          }
        },
      },
      {
        labelName: (
          <div className="history-table-header-col no-hover" id="time">
            <span className="inter-display-medium f-s-10 ">
              Max 1m
              <br />
              Drawdown
            </span>
            <div
              onClick={() => this.handleTableSort(5)}
              className="table-sort-icon-container"
            >
              <Image
                src={SortByIcon}
                className={`table-sort-icon ${
                  this.state.sortOption.column === 5 &&
                  !this.state.sortOption.value
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
        cell: (rowData, dataKey, rowIndex) => {
          if (dataKey === "max1mdd") {
            return (
              <div
                onClick={() => {
                  this.goToStrategyBuilderPage(rowData);
                }}
                className="full-table-row-col-width"
              >
                <div className="inter-display-medium f-s-13">
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
              </div>
            );
          }
        },
      },
      {
        labelName: (
          <div className="history-table-header-col no-hover" id="time">
            <span className="inter-display-medium f-s-10 ">
              Sharpe
              <br />
              Ratio
            </span>
            <div
              onClick={() => this.handleTableSort(6)}
              className="table-sort-icon-container"
            >
              <Image
                src={SortByIcon}
                className={`table-sort-icon ${
                  this.state.sortOption.column === 6 &&
                  !this.state.sortOption.value
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
        cell: (rowData, dataKey, rowIndex) => {
          if (dataKey === "sharpeRatio") {
            return (
              <div
                onClick={() => {
                  this.goToStrategyBuilderPage(rowData);
                }}
                className="full-table-row-col-width"
              >
                <div className="inter-display-medium f-s-13">
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
              </div>
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
            <span className="inter-display-medium f-s-10 ">Created By</span>
          </div>
        ),
        dataKey: "visualization",

        coumnWidth: 0.14285714,
        isCell: true,
        cell: (rowData, dataKey, rowIndex) => {
          if (dataKey === "visualization") {
            return (
              <div
                onClick={() => {
                  this.goToStrategyBuilderPage(rowData);
                }}
                className="full-table-row-col-width "
              >
                <div className="inter-display-medium dotDotText f-s-13">
                  {rowData.user_name ? rowData.user_name : "-"}
                </div>
              </div>
            );
          }
        },
      },
    ];
    if (mobileCheck()) {
      return null;
    }
    return (
      <div className="strategy-discovery-page">
        <TopBar
          isWalletConnected={this.props.isWalletConnected}
          connectedWalletAddress={this.props.connectedWalletAddress}
          connectedWalletevents={this.props.connectedWalletevents}
          openConnectWallet={this.props.openConnectWallet}
          disconnectWallet={this.props.disconnectWallet}
          history={this.props.history}
        />

        <div className="page">
          <div
            style={{
              paddingBottom: this.state.totalPages > 1 ? "6rem" : "",
            }}
            className=" page-scroll"
          >
            <div className="page-scroll-child">
              <StrategyDiscoveryContent
                toDate={this.state.toDate}
                fromDate={this.state.fromDate}
                totalPage={this.state.totalPages}
                page={this.state.currentPage}
                history={this.props.history}
                location={this.props.location}
                performanceMetricTableLoading={
                  this.state.performanceMetricTableLoading
                }
                performanceMetricColumnList={performanceMetricColumnList}
                performanceMetricTableData={
                  this.state.performanceMetricTableData
                }
                goToStrategyBuilderPage={this.goToStrategyBuilderPage}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  StrategyDiscoveryTableState: state.StrategyDiscoveryTableState,
  StrategyDiscoveryTableCountState: state.StrategyDiscoveryTableCountState,
});
const mapDispatchToProps = {
  getDiscoverStrategyApi,
};

StrategyDiscovery.propTypes = {};
export default connect(mapStateToProps, mapDispatchToProps)(StrategyDiscovery);
