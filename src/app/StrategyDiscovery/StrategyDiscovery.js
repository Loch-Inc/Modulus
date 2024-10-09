import { connect } from "react-redux";
import { BaseReactComponent } from "../../utils/form";

import moment from "moment";
import { Image } from "react-bootstrap";
import { API_LIMIT, START_INDEX } from "src/utils/Constant";
import {
  StrategyDiscoveryDownGreenArrowIcon,
  StrategyDiscoveryDownRedArrowIcon,
} from "../../assets/images/icons";
import CustomOverlay from "../../utils/commonComponent/CustomOverlay";
import {
  mobileCheck,
  numToCurrency,
  scrollToBottomAfterPageChange,
  strategyBuilderChartLineColorByIndex,
} from "../../utils/ReusableFunctions";
import MobileLayout from "../layout/MobileLayout";
import TopBar from "../TopBar/TopBar";
import "./_strategyDiscovery.scss";
import {
  getDiscoverStrategyApi,
  getDiscoverStrategyCountApi,
} from "./Api/StrategyDiscoveryApi";
import StrategyDiscoveryContent from "./StrategyDiscoveryContent";

class StrategyDiscovery extends BaseReactComponent {
  constructor(props) {
    super(props);
    const search = props.location.search;
    const params = new URLSearchParams(search);
    const page = params.get("p");
    this.state = {
      firstLoad: true,
      currentPage: page ? parseInt(page, 10) : START_INDEX,
      totalPages: 0,
      toDate: new Date(new Date().setDate(new Date().getDate() - 1)),
      fromDate: new Date(new Date().setMonth(new Date().getMonth() - 1)),

      performanceMetricTableData: [],
      performanceMetricTableLoading: false,
      performanceMetricColumnList: [
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
                  <div className="discover-strategy-table-name-container">
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
                              fill={strategyBuilderChartLineColorByIndex(0)}
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
                    </CustomOverlay>
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
                Cumulative
                <br />
                Return
              </span>
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
                        {numToCurrency(
                          rowData.cumulative_return
                        ).toLocaleString("en-US")}
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
                  {rowData.max_1d_drawdown < 0 ? (
                    <Image
                      className="full-table-row-col-width-arrow"
                      src={StrategyDiscoveryDownRedArrowIcon}
                    />
                  ) : (
                    <Image
                      className="full-table-row-col-width-arrow full-table-row-col-width-arrow-reverse"
                      src={StrategyDiscoveryDownGreenArrowIcon}
                    />
                  )}
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
                  {rowData.max_1d_drawdown < 0 ? (
                    <Image
                      className="full-table-row-col-width-arrow"
                      src={StrategyDiscoveryDownRedArrowIcon}
                    />
                  ) : (
                    <Image
                      className="full-table-row-col-width-arrow full-table-row-col-width-arrow-reverse"
                      src={StrategyDiscoveryDownGreenArrowIcon}
                    />
                  )}
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
                  {rowData.max_1d_drawdown < 0 ? (
                    <Image
                      className="full-table-row-col-width-arrow"
                      src={StrategyDiscoveryDownRedArrowIcon}
                    />
                  ) : (
                    <Image
                      className="full-table-row-col-width-arrow full-table-row-col-width-arrow-reverse"
                      src={StrategyDiscoveryDownGreenArrowIcon}
                    />
                  )}
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
              console.log("rowData? ", rowData);

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
      ],
    };
  }

  getDiscoverStrategyCountApiPass = () => {
    this.props.getDiscoverStrategyCountApi(this);
  };
  getDiscoverStrategyApiPass = () => {
    this.setState({
      performanceMetricTableData: [],
      performanceMetricTableLoading: true,
    });
    let tempApiData = new URLSearchParams();
    tempApiData.append("page", this.state.currentPage + 1);
    tempApiData.append("per_page", 10);

    this.props.getDiscoverStrategyApi(tempApiData, this.stopLoading);
  };
  stopLoading = () => {
    this.setState({
      performanceMetricTableLoading: false,
    });
  };

  componentDidMount() {
    this.getDiscoverStrategyApiPass();
    this.getDiscoverStrategyCountApiPass();
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

      if (tempBtTableData) {
        let tempArr = [];

        tempBtTableData.forEach((item) => {
          let curItem = {};
          let name = "";
          let strategy_id = "";
          let user_id = "";
          let created_on = "";
          let user_name = "";
          if (item?.performance?.performance_data) {
            curItem = item;
            name = item.strategy_name;
            strategy_id = item.id;
            user_id = item.created_by;
            created_on = item.created_on;
            user_name = item.username;
          }
          if (curItem?.performance?.performance_data) {
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
        });
      }
    }
    if (
      prevProps.StrategyDiscoveryTableCountState !==
      this.props.StrategyDiscoveryTableCountState
    ) {
      let totalPages = 0;
      if (this.props.StrategyDiscoveryTableCountState.total_count) {
        totalPages = Math.ceil(
          this.props.StrategyDiscoveryTableCountState.total_count / API_LIMIT
        );
      }
      this.setState({
        totalPages: totalPages,
      });
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
        setTimeout(() => {
          scrollToBottomAfterPageChange();
        }, 50);
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
    if (mobileCheck()) {
      return (
        <MobileLayout
          handleShare={this.handleShare}
          isSidebarClosed={this.props.isSidebarClosed}
          history={this.props.history}
          hideFooter
          hideAddresses
          hideShare
        ></MobileLayout>
      );
    }
    return (
      <div className="strategy-discovery-page">
        <TopBar history={this.props.history} />

        <div className="page">
          <div
            style={{
              paddingBottom: this.state.totalPages > 1 ? "6rem" : "",
            }}
            className=" page-scroll"
          >
            <div className="page-scroll-child">
              <StrategyDiscoveryContent
                totalPage={this.state.totalPages}
                page={this.state.currentPage}
                history={this.props.history}
                location={this.props.location}
                performanceMetricTableLoading={
                  this.state.performanceMetricTableLoading
                }
                performanceMetricColumnList={
                  this.state.performanceMetricColumnList
                }
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
  getDiscoverStrategyCountApi,
};

StrategyDiscovery.propTypes = {};
export default connect(mapStateToProps, mapDispatchToProps)(StrategyDiscovery);
