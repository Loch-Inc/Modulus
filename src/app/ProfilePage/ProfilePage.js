import { connect } from "react-redux";
import { BaseReactComponent } from "../../utils/form";

import {
  copyText,
  mobileCheck,
  numToCurrency,
  scrollToBottomAfterPageChange,
  strategyBuilderChartLineColorByIndex,
} from "../../utils/ReusableFunctions";
import MobileLayout from "../layout/MobileLayout";
import "./_profilePage.scss";
import {
  getTotalUserCreatedStrategyCount,
  getUserCreatedStrategies,
  getUserProfileData,
  getUserReferralCodes,
} from "./Api/ProfilePageApi";
import moment from "moment";
import { Image } from "react-bootstrap";
import { resetUser } from "src/utils/AnalyticsFunctions";
import { API_LIMIT, START_INDEX } from "src/utils/Constant";
import {
  StrategyDiscoveryDownGreenArrowIcon,
  StrategyDiscoveryDownRedArrowIcon,
} from "../../assets/images/icons";
import CustomOverlay from "../../utils/commonComponent/CustomOverlay";
import TopBar from "../TopBar/TopBar";
import ProfilePageContent from "./ProfilePageContent";
import ConfirmLeaveModal from "../common/ConfirmLeaveModal";

class ProfilePage extends BaseReactComponent {
  constructor(props) {
    super(props);
    const search = props.location.search;
    const params = new URLSearchParams(search);
    const page = params.get("p");
    this.state = {
      firstLoad: true,
      userData: {
        created_on: "",
        email: "",
        modified_on: "",
        source: "",
        _id: "",
      },
      showConfirmLeaveModal: false,
      currentPage: page ? parseInt(page, 10) : START_INDEX,
      totalPages: 0,
      isReferralCodeBlockOpen: false,
      referralCodes: [],
      toDate: new Date(),
      fromDate: new Date(new Date().setMonth(new Date().getMonth() - 1)),
      strategiesOptions: [
        {
          label: "BTC",
          value: "btc",
          color: "gold",
        },
        { label: "ETH", value: "eth", color: "blue" },
      ],
      strategiesCreatedTableData: [],
      strategiesCreatedTableLoading: false,
      strategiesCreatedColumnList: [
        {
          labelName: (
            <div
              style={{
                justifyContent: "flex-start",
              }}
              className="history-table-header-col no-hover history-table-header-col-curve-left"
              id="time"
            >
              <span className="inter-display-medium f-s-10 ">Title</span>
            </div>
          ),
          dataKey: "strategy",
          coumnWidth: 0.22222222, // Double the percentage of other items
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
                  <div className="profile-page-table-strategy-name-container">
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
                        <div className="profile-page-table-strategy-name profile-page-table-strategy-name-title dotDotText inter-display-medium text-uppercase">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="profile-page-table-strategy-name-circle"
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
                          <div className="profile-page-table-strategy-date">
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

          coumnWidth: 0.11111111,
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

          coumnWidth: 0.11111111,
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

          coumnWidth: 0.11111111,
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
                  {rowData.max_1d_drawdown ===
                  0 ? null : rowData.max_1d_drawdown < 0 ? (
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

          coumnWidth: 0.11111111,
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
                  {rowData.max_1w_drawdown ===
                  0 ? null : rowData.max_1w_drawdown < 0 ? (
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

          coumnWidth: 0.11111111,
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
                  {rowData.max_1m_drawdown ===
                  0 ? null : rowData.max_1m_drawdown < 0 ? (
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

          coumnWidth: 0.11111111,
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
              <span className="inter-display-medium f-s-10 ">
                Visualization
              </span>
            </div>
          ),
          dataKey: "visualization",

          coumnWidth: 0.11111111,
          isCell: true,
          cell: (rowData, dataKey, rowIndex) => {
            if (dataKey === "visualization") {
              const curColor = strategyBuilderChartLineColorByIndex(0);

              return (
                <div className="full-table-row-col-width">
                  <svg
                    width="108"
                    height="29"
                    viewBox="0 0 108 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.3"
                      d="M104.914 3.40986C106.457 3.40986 106.457 1.1665 108 1.1665V28.9998H0V15.5079C1.67142 15.5079 1.54285 16.3332 3.08572 16.3332C4.62857 16.3332 4.62857 13.9897 6.17142 13.9897C7.71429 13.9897 7.45714 14.7107 9.25714 14.7107C11.0571 14.7107 10.5429 16.0608 12.3429 16.0608C14.1429 16.0608 13.7571 15.548 15.4286 15.548C17.1 15.548 16.7786 13.1043 18.5143 13.1043C20.25 13.1043 19.8 13.9015 21.6 13.9015C23.4 13.9015 23.0786 14.9992 24.6857 14.9992C26.2929 14.9992 26.0357 11.3537 27.7714 11.3537C29.5071 11.3537 29.3143 12.6156 30.8571 12.6156C32.4 12.6156 32.1429 10.849 33.9429 10.849C35.7429 10.849 35.3571 11.9787 37.0286 11.9787C38.7 11.9787 38.4429 7.35976 40.1143 7.35976C41.7857 7.35976 41.4643 8.64568 43.2 8.64568C44.9357 8.64568 44.4857 9.49495 46.2857 9.49495C48.0857 9.49495 47.6357 7.29166 49.3714 7.29166C51.1071 7.29166 50.6571 8.37327 52.4571 8.37327C54.2571 8.37327 53.9357 6.59061 55.5429 6.59061C57.15 6.59061 56.9571 3.61016 58.6286 3.61016C60.3 3.61016 60.0429 8.59761 61.7143 8.59761C63.3857 8.59761 63.1929 5.10439 64.8 5.10439C66.4071 5.10439 66.0857 6.63468 67.8857 6.63468C69.6857 6.63468 69.3 8.00873 70.9714 8.00873C72.6429 8.00873 72.45 5.73333 74.0571 5.73333C75.6643 5.73333 75.5357 7.89656 77.1429 7.89656C78.75 7.89656 78.5571 6.93513 80.2286 6.93513C81.9 6.93513 81.6429 4.95216 83.3143 4.95216C84.9857 4.95216 84.7286 5.74535 86.4 5.74535C88.0714 5.74535 87.9429 2.84902 89.4857 2.84902C91.0286 2.84902 90.7714 6.81895 92.5714 6.81895C94.3714 6.81895 93.9214 4.12292 95.6571 4.12292C97.3929 4.12292 97.1357 5.23258 98.7429 5.23258C100.35 5.23258 100.221 2.46845 101.829 2.46845C103.436 2.46845 103.371 3.40986 104.914 3.40986Z"
                      fill={`url(#paint0_linear_12493_5029${rowIndex})`}
                    />
                    <path
                      d="M108 1.1665C106.457 1.1665 106.457 3.40986 104.914 3.40986C103.371 3.40986 103.436 2.46845 101.829 2.46845C100.221 2.46845 100.35 5.23258 98.7429 5.23258C97.1357 5.23258 97.3929 4.12292 95.6571 4.12292C93.9214 4.12292 94.3714 6.81895 92.5714 6.81895C90.7714 6.81895 91.0286 2.84902 89.4857 2.84902C87.9429 2.84902 88.0714 5.74535 86.4 5.74535C84.7286 5.74535 84.9857 4.95216 83.3143 4.95216C81.6429 4.95216 81.9 6.93513 80.2286 6.93513C78.5571 6.93513 78.75 7.89656 77.1429 7.89656C75.5357 7.89656 75.6643 5.73333 74.0571 5.73333C72.45 5.73333 72.6429 8.00873 70.9714 8.00873C69.3 8.00873 69.6857 6.63468 67.8857 6.63468C66.0857 6.63468 66.4071 5.10439 64.8 5.10439C63.1929 5.10439 63.3857 8.59761 61.7143 8.59761C60.0429 8.59761 60.3 3.61016 58.6286 3.61016C56.9571 3.61016 57.15 6.59061 55.5429 6.59061C53.9357 6.59061 54.2571 8.37327 52.4571 8.37327C50.6571 8.37327 51.1071 7.29166 49.3714 7.29166C47.6357 7.29166 48.0857 9.49495 46.2857 9.49495C44.4857 9.49495 44.9357 8.64568 43.2 8.64568C41.4643 8.64568 41.7857 7.35976 40.1143 7.35976C38.4429 7.35976 38.7 11.9787 37.0286 11.9787C35.3571 11.9787 35.7429 10.849 33.9429 10.849C32.1429 10.849 32.4 12.6156 30.8571 12.6156C29.3143 12.6156 29.5071 11.3537 27.7714 11.3537C26.0357 11.3537 26.2929 14.9992 24.6857 14.9992C23.0786 14.9992 23.4 13.9015 21.6 13.9015C19.8 13.9015 20.25 13.1043 18.5143 13.1043C16.7786 13.1043 17.1 15.548 15.4286 15.548C13.7571 15.548 14.1429 16.0608 12.3429 16.0608C10.5429 16.0608 11.0571 14.7107 9.25714 14.7107C7.45714 14.7107 7.71429 13.9897 6.17143 13.9897C4.62857 13.9897 4.62857 16.3332 3.08571 16.3332C1.54286 16.3332 1.67143 15.5079 -3.54648e-06 15.5079"
                      stroke={curColor}
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <defs>
                      <linearGradient
                        id={`paint0_linear_12493_5029${rowIndex}`}
                        x1="54"
                        y1="1.1665"
                        x2="54"
                        y2="27.7607"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0.32" stop-color={curColor} />
                        <stop
                          offset="0.82"
                          stop-color={curColor}
                          stop-opacity="0"
                        />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              );
            }
          },
        },
      ],
    };
  }
  openLeaveModal = () => {
    this.setState({
      showConfirmLeaveModal: true,
    });
  };
  closeLeaveModal = () => {
    this.setState({
      showConfirmLeaveModal: false,
    });
  };
  getUserReferralCodesPass = () => {
    this.props.getUserReferralCodes(this);
  };
  getTotalUserCreatedStrategyCountPass = () => {
    this.props.getTotalUserCreatedStrategyCount(this);
  };
  getUserCreatedStrategiesPass = () => {
    this.setState({
      strategiesCreatedTableData: [],
      strategiesCreatedTableLoading: true,
    });
    // let tempData = new URLSearchParams();
    // tempData.append("page", this.state.currentPage + 1);
    this.props.getUserCreatedStrategies(
      this.state.currentPage + 1,
      this.stopLoading
    );
  };
  stopLoading = (emptyTable) => {
    this.setState({
      strategiesCreatedTableLoading: false,
      strategiesCreatedTableData: [],
      totalPages: 0,
    });
  };
  getUserProfileDataPass = () => {
    this.props.getUserProfileData();
  };
  componentDidMount() {
    this.getUserCreatedStrategiesPass();
    this.getTotalUserCreatedStrategyCountPass();
    this.getUserReferralCodesPass();
    this.getUserProfileDataPass();

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
          this.getUserCreatedStrategiesPass();
        }
      );
    }
    if (
      prevProps.TotalUserCreatedStrategyCountState !==
      this.props.TotalUserCreatedStrategyCountState
    ) {
      let totalPages = 0;
      if (this.props.TotalUserCreatedStrategyCountState.total_count) {
        totalPages = Math.ceil(
          this.props.TotalUserCreatedStrategyCountState.total_count / API_LIMIT
        );
      }
      this.setState({
        totalPages: totalPages,
      });
    }
    if (
      prevProps.StrategiesCreatedTableState !==
      this.props.StrategiesCreatedTableState
    ) {
      let tempBtTableData = this.props.StrategiesCreatedTableState;
      if (tempBtTableData) {
        let tempArr = [];

        tempBtTableData.forEach((item) => {
          let curItem = {};
          let name = "";
          let strategy_id = "";
          let user_id = "";
          let created_on = "";
          if (item?.performance?.performance_data) {
            curItem = item;
            name = item.strategy_name;
            strategy_id = item.id;
            user_id = item.created_by;
            created_on = item.created_on;
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
            };
            tempArr.push(tempHolder);
          }
        });

        this.setState({
          strategiesCreatedTableData: tempArr,
          strategiesCreatedTableLoading: false,
        });
      }
    }
    if (
      prevProps.ReferralCodesModulusState !==
      this.props.ReferralCodesModulusState
    ) {
      let tempCodes = [];
      if (this.props.ReferralCodesModulusState.referralCodes) {
        tempCodes = this.props.ReferralCodesModulusState.referralCodes;
      }
      this.setState({
        referralCodes: tempCodes,
      });
    }
    if (
      prevProps.GetUserProfileDataState !== this.props.GetUserProfileDataState
    ) {
      const tempHolder = this.props.GetUserProfileDataState;
      if (tempHolder) {
        this.setState({
          userData: tempHolder,
        });
      }
    }
    if (
      this.state.strategiesCreatedTableLoading !==
        prevState.strategiesCreatedTableLoading &&
      !this.state.strategiesCreatedTableLoading
    ) {
      if (this.state.firstLoad) {
        this.setState({
          firstLoad: false,
        });
      } else {
        setTimeout(() => {
          scrollToBottomAfterPageChange();
        }, 100);
      }
    }
  }
  openReferralCodeBlock = () => {
    this.setState({ isReferralCodeBlockOpen: true });
  };
  closeReferralCodeBlock = () => {
    this.setState({ isReferralCodeBlockOpen: false });
  };
  copyAllReferralCodes = () => {
    let tempCodes = this.state.referralCodes;
    let tempString = "";
    tempCodes.forEach((code) => {
      if (!code.used) {
        tempString += code.code + "\n";
      }
    });
    copyText(tempString);
  };
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
  signOutFun = () => {
    resetUser();
    setTimeout(() => {
      window.location.href = "/sign-in";
    }, 500);
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
        >
          {/* <BackTestPageMobile
            saveStrategyName={this.state.saveStrategyName}
            saveStrategyCheck={this.state.saveStrategyCheck}
            showSaveStrategy={this.showSaveStrategy}
            hideSaveStrategy={this.hideSaveStrategy}
            fromAndToDate={this.state.fromAndToDate}
            performanceVisualizationGraphLoading={
              this.state.performanceVisualizationGraphLoading
            }
            strategiesCreatedTableLoading={
              this.state.strategiesCreatedTableLoading
            }
            selectStrategies={this.selectStrategies}
            strategiesOptions={this.state.strategiesOptions}
            selectedStrategiesOptions={this.state.selectedStrategiesOptions}
            strategiesCreatedColumnList={this.state.strategiesCreatedColumnList}
            strategiesCreatedTableData={this.state.strategiesCreatedTableData}
            performanceVisualizationGraphData={
              this.state.performanceVisualizationGraphData
            }
            performanceVisualizationGraphDataOriginal={
              this.state.performanceVisualizationGraphDataOriginal
            }
            hideToCalendar={this.hideToCalendar}
            hideFromCalendar={this.hideFromCalendar}
            showFromCalendar={this.showFromCalendar}
            showToCalendar={this.showToCalendar}
            isFromCalendar={this.state.isFromCalendar}
            isToCalendar={this.state.isToCalendar}
            changeFromDate={this.changeFromDate}
            changeToDate={this.changeToDate}
            fromDate={this.state.fromDate}
            toDate={this.state.toDate}
          /> */}
        </MobileLayout>
      );
    }
    return (
      <div className="profile-page">
        {this.state.showConfirmLeaveModal ? (
          <ConfirmLeaveModal
            show
            history={this.props.history}
            handleClose={this.closeLeaveModal}
            handleAccept={this.signOutFun}
          />
        ) : null}
        <TopBar history={this.props.history} />
        <div className="page">
          <div
            style={{
              paddingBottom: this.state.totalPages > 1 ? "6rem" : "",
            }}
            className=" page-scroll"
          >
            <div className="page-scroll-child">
              <ProfilePageContent
                userData={this.state.userData}
                totalPage={this.state.totalPages}
                page={this.state.currentPage}
                history={this.props.history}
                location={this.props.location}
                signOutFun={this.openLeaveModal}
                copyAllReferralCodes={this.copyAllReferralCodes}
                openReferralCodeBlock={this.openReferralCodeBlock}
                closeReferralCodeBlock={this.closeReferralCodeBlock}
                referralCodes={this.state.referralCodes}
                isReferralCodeBlockOpen={this.state.isReferralCodeBlockOpen}
                strategiesCreatedTableData={
                  this.state.strategiesCreatedTableData
                }
                strategiesCreatedTableLoading={
                  this.state.strategiesCreatedTableLoading
                }
                strategiesCreatedColumnList={
                  this.state.strategiesCreatedColumnList
                }
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  StrategiesCreatedTableState: state.StrategiesCreatedTableState,
  ReferralCodesModulusState: state.ReferralCodesModulusState,
  TotalUserCreatedStrategyCountState: state.TotalUserCreatedStrategyCountState,
  GetUserProfileDataState: state.GetUserProfileDataState,
});
const mapDispatchToProps = {
  getUserCreatedStrategies,
  getUserReferralCodes,
  getTotalUserCreatedStrategyCount,
  getUserProfileData,
};

ProfilePage.propTypes = {};
export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
