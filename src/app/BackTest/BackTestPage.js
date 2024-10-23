import { connect } from "react-redux";
import { BaseReactComponent } from "../../utils/form";

import moment from "moment";
import { Image } from "react-bootstrap";
import { toast } from "react-toastify";
import { SortByIcon } from "src/assets/images/icons";
import {
  BuilderChartAddAssets,
  BuilderChartInfoHover,
  BuilderPageView,
  BuilderPerformanceMetricsTableSorted,
  BuilderShareStrategyClicked,
  BuilderTableChangeDate,
  PerformanceMetricsApiCallFailed,
  PerformanceVisualizationApiCallFailed,
} from "src/utils/AnalyticsFunctions";
import {
  BASE_URL_S3,
  CURRENT_PORTFOLIO_BALANCE,
  DEFAULT_STRATEGY_NAME,
} from "src/utils/Constant";
import { getModulusUser } from "src/utils/ManageToken";
import CustomOverlay from "../../utils/commonComponent/CustomOverlay";
import {
  mobileCheck,
  numToCurrency,
  strategyBuilderAssetList,
  strategyBuilderChartLineColorByIndex,
  strategyBuilderChartLineColorByIndexLowOpacity,
} from "../../utils/ReusableFunctions";
import TopBar from "../TopBar/TopBar";
import "./_backTest.scss";
import { getBackTestChart, getBackTestTable } from "./Api/BackTestApi";
import BackTestPageContent from "./BackTestPageContent";
import { getUserReferralCodes } from "../ProfilePage/Api/ProfilePageApi";

class BackTestPage extends BaseReactComponent {
  constructor(props) {
    super(props);

    this.state = {
      sortOption: { column: 1, value: false },
      tableSortOption: [
        "strategy_name",
        "cumulative_return",
        "annual_return",
        "sharpe_ratio",
        "max_1d_drawdown",
        "max_1w_drawdown",
        "max_1m_drawdown",
      ],
      copiedItem: {
        item: {},
        itemType: "",
      },
      isStrategyEmpty: true,
      isExistingStrategy: false,
      saveStrategyName: DEFAULT_STRATEGY_NAME,
      passedStrategyList: [],
      passedUserList: [],
      strategyPercentageReturn: null,
      isShareStrategyVisible: false,
      isFromCalendar: false,
      isToCalendar: false,
      toDate: new Date(new Date().setDate(new Date().getDate() - 1)),
      fromDate: new Date(
        new Date().setMonth(new Date().getMonth() - 3, new Date().getDate() - 1)
      ),
      fromAndToDate: "",
      isSaveInvestStrategy: false,
      saveStrategyCheck: false,
      loadingSaveInvestStrategyBtn: false,
      strategiesOptions: [
        {
          name: "BTC",
          alt: "Bitcoin",
        },

        {
          name: "ETH",
          alt: "Ethereum",
        },
      ],
      selectedStrategiesOptions: ["BTC", "ETH"],

      performanceVisualizationGraphData: [],
      performanceVisualizationGraphDataOriginal: {},

      performanceMetricTableData: [],
      performanceVisualizationGraphLoading: false,
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
  sortPerformanceMetricTableData = () => {
    const sortedData = this.state.performanceMetricTableData.sort((a, b) => {
      if (this.state.sortOption.column === 0) {
        return a.strategy_name.localeCompare(b.strategy_name);
      } else if (this.state.sortOption.column === 1) {
        if (this.state.sortOption.value) {
          return a.cumulative_return - b.cumulative_return;
        } else {
          return b.cumulative_return - a.cumulative_return;
        }
      } else if (this.state.sortOption.column === 2) {
        if (this.state.sortOption.value) {
          return a.annual_return - b.annual_return;
        } else {
          return b.annual_return - a.annual_return;
        }
      } else if (this.state.sortOption.column === 3) {
        if (this.state.sortOption.value) {
          return a.sharpe_ratio - b.sharpe_ratio;
        } else {
          return b.sharpe_ratio - a.sharpe_ratio;
        }
      } else if (this.state.sortOption.column === 4) {
        if (this.state.sortOption.value) {
          return a.max_1d_drawdown - b.max_1d_drawdown;
        } else {
          return b.max_1d_drawdown - a.max_1d_drawdown;
        }
      } else if (this.state.sortOption.column === 5) {
        if (this.state.sortOption.value) {
          return a.max_1w_drawdown - b.max_1w_drawdown;
        } else {
          return b.max_1w_drawdown - a.max_1w_drawdown;
        }
      } else if (this.state.sortOption.column === 6) {
        if (this.state.sortOption.value) {
          return a.max_1m_drawdown - b.max_1m_drawdown;
        } else {
          return b.max_1m_drawdown - a.max_1m_drawdown;
        }
      }
      return 0;
    });

    this.setState({
      performanceMetricTableData: sortedData,
    });
  };
  setCopiedItem = (itemBlock, itemType) => {
    console.log("Coming here?");

    let tempHolder = {
      item: itemBlock,
      itemType: itemType,
    };
    sessionStorage.setItem("copiedStrategyItem", JSON.stringify(tempHolder));
    this.setState({
      copiedItem: tempHolder,
    });
    toast.success("Copied");
  };
  changeIsStrategyEmpty = (passedValue) => {
    this.setState({
      isStrategyEmpty: passedValue,
    });
  };
  saveStrategyClicked = (passedName) => {
    this.setState(
      {
        saveStrategyName: passedName,
      },
      this.setState({
        saveStrategyCheck: !this.state.saveStrategyCheck,

        loadingSaveInvestStrategyBtn: true,
      })
    );
  };

  showSaveStrategy = () => {
    this.setState({
      isSaveInvestStrategy: true,
      loadingSaveInvestStrategyBtn: false,
    });
  };
  hideSaveStrategy = () => {
    this.setState({
      isSaveInvestStrategy: false,
    });
  };
  addCurrentQuery = (passedQueryId) => {};
  hideToCalendar = () => {
    this.setState({
      isToCalendar: false,
    });
  };
  hideFromCalendar = () => {
    this.setState({
      isFromCalendar: false,
    });
  };
  showFromCalendar = () => {
    this.setState({
      isFromCalendar: true,
    });
  };
  showToCalendar = () => {
    this.setState({
      isToCalendar: true,
    });
  };
  getDataForTable = async (passedAssets) => {
    let tempApiData = new URLSearchParams();
    let tempTokenList = [];
    passedAssets.forEach((curAsset) => {
      let isAnAsset = false;
      this.state.strategiesOptions.forEach((item) => {
        if (item.name.toLowerCase() === curAsset.toLowerCase()) {
          isAnAsset = true;
        }
      });
      if (isAnAsset) {
        tempTokenList.push(curAsset.toLowerCase());
      } else {
        tempApiData.append(
          "strategy_list",
          JSON.stringify([curAsset.toLowerCase()])
        );
        tempApiData.append(
          "current_portfolio_balance",
          CURRENT_PORTFOLIO_BALANCE
        );
      }
    });
    // if (this.state.passedStrategyList.length > 0) {
    //   tempApiData.append(
    //     "strategy_list",
    //     JSON.stringify(this.state.passedStrategyList)
    //   );
    // }
    tempApiData.append("token_list", JSON.stringify(tempTokenList));
    tempApiData.append(
      "start_datetime",
      moment(this.state.fromDate).format("X")
    );
    tempApiData.append("end_datetime", moment(this.state.toDate).format("X"));
    this.props.getBackTestTable(tempApiData, this.afterTableApi);
  };
  getDataForGraph = async (passedAssets, passedColor) => {
    let tempToDate = new Date(new Date().setDate(new Date().getDate() - 1));
    let tempFromDate = new Date(
      new Date().setFullYear(new Date().getFullYear() - 1)
    );
    let tempApiData = new URLSearchParams();
    let tempTokenList = [];
    passedAssets.forEach((curAsset) => {
      let isAnAsset = false;
      this.state.strategiesOptions.forEach((item) => {
        if (item.name.toLowerCase() === curAsset.toLowerCase()) {
          isAnAsset = true;
        }
      });
      if (isAnAsset) {
        tempTokenList.push(curAsset.toLowerCase());
      } else {
        tempApiData.append("strategy_id", curAsset);
        tempApiData.append(
          "current_portfolio_balance",
          CURRENT_PORTFOLIO_BALANCE
        );
      }
    });
    tempApiData.append("token_list", JSON.stringify(tempTokenList));
    tempApiData.append("start_datetime", moment(tempFromDate).format("X"));
    tempApiData.append("end_datetime", moment(tempToDate).format("X"));
    this.props.getBackTestChart(tempApiData, this.afterChartApi);
  };
  afterChartApi = (isSuccess) => {
    this.setState({
      performanceVisualizationGraphLoading: false,
    });
    if (isSuccess) {
    } else {
      const modulusUser = getModulusUser();
      if (modulusUser && modulusUser.email) {
        PerformanceVisualizationApiCallFailed({
          email_address: modulusUser.email,
          assets: this.state.selectedStrategiesOptions,
          strategy_id:
            this.state.passedStrategyList.length > 0
              ? this.state.passedStrategyList[0]
              : "",
        });
      }
    }
  };
  afterTableApi = (isSuccess) => {
    this.setState({
      performanceMetricTableLoading: false,
    });

    if (isSuccess) {
    } else {
      const modulusUser = getModulusUser();
      if (modulusUser && modulusUser.email) {
        PerformanceMetricsApiCallFailed({
          email_address: modulusUser.email,
          assets: this.state.selectedStrategiesOptions,
          strategy_id:
            this.state.passedStrategyList.length > 0
              ? this.state.passedStrategyList[0]
              : "",
        });
      }
    }
  };
  selectStrategies = (passedData) => {
    if (passedData.length === 0) {
      this.setState(
        {
          selectedStrategiesOptions: ["BTC", "ETH"],
        },
        () => {
          if (
            this.state.passedStrategyList &&
            this.state.passedStrategyList.length > 0
          ) {
            this.getAssetData([
              ...this.state.selectedStrategiesOptions,
              ...this.state.passedStrategyList,
            ]);
          } else {
            this.getAssetData(this.state.selectedStrategiesOptions);
          }
        }
      );
    } else {
      this.setState(
        {
          selectedStrategiesOptions: [...passedData],
        },
        () => {
          if (
            this.state.passedStrategyList &&
            this.state.passedStrategyList.length > 0
          ) {
            this.getAssetData([
              ...this.state.selectedStrategiesOptions,
              ...this.state.passedStrategyList,
            ]);
          } else {
            this.getAssetData(this.state.selectedStrategiesOptions);
          }
        }
      );
    }
  };

  getAssetDataAfterStrategyUpdate = (strategyId) => {
    this.getAssetData([...this.state.selectedStrategiesOptions, strategyId]);
  };
  getAssetData = (passedSelectedAssets, notForChart = false) => {
    if (notForChart) {
      this.setState({
        performanceMetricTableData: [],
        performanceMetricTableLoading: true,
      });
      this.getDataForTable(passedSelectedAssets);
    } else {
      this.setState({
        performanceVisualizationGraphData: [],
        performanceVisualizationGraphDataOriginal: {},
        performanceMetricTableData: [],
        performanceVisualizationGraphLoading: true,
        performanceMetricTableLoading: true,
      });
      this.getDataForGraph(passedSelectedAssets);
      this.getDataForTable(passedSelectedAssets);
    }
  };
  setSessionPassedStrategyId = (passedId) => {
    let tempHolderObj = {
      id: passedId,
      name: this.state.saveStrategyName,
    };
    sessionStorage.setItem(
      "savedStrategyIdName",
      JSON.stringify(tempHolderObj)
    );
  };
  getUserReferralCodesPass = () => {
    this.props.getUserReferralCodes();
  };

  componentDidMount() {
    const modulusUser = getModulusUser();
    if (modulusUser && modulusUser.email) {
      BuilderPageView({
        email_address: modulusUser.email,
      });
    }
    let builderList = strategyBuilderAssetList();
    this.getUserReferralCodesPass();
    let tempArrHolder = [];
    for (let i = 0; i < builderList.length; i++) {
      let tempObj = {
        name: builderList[i].name,
        alt: builderList[i].fullName,
      };
      tempArrHolder.push(tempObj);
    }
    this.setState({
      strategiesOptions: tempArrHolder,
    });
    const { state } = this.props.location;

    let tempIdNameHolder = sessionStorage.getItem("savedStrategyIdName");
    tempIdNameHolder = tempIdNameHolder ? JSON.parse(tempIdNameHolder) : "";
    if (tempIdNameHolder) {
      this.setState(
        {
          isExistingStrategy: true,
          passedStrategyList: [tempIdNameHolder.id],
          saveStrategyName: tempIdNameHolder.name,
        },
        () => {
          const tempItem = [
            ...this.state.selectedStrategiesOptions,
            tempIdNameHolder.id,
          ];
          this.getAssetData(tempItem);
        }
      );
    } else if (state && state.passedStrategyId) {
      this.setState(
        {
          isExistingStrategy: true,
          passedStrategyList: [state.passedStrategyId],
          saveStrategyName: [state.passedStrategyName],
          passedUserList: [state.passedUserId],
        },
        () => {
          const tempItem = [
            ...this.state.selectedStrategiesOptions,
            state.passedStrategyId,
          ];
          this.getAssetData(tempItem);
        }
      );
    } else {
      this.getAssetData(this.state.selectedStrategiesOptions);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.passedStrategyList !== this.state.passedStrategyList ||
      prevState.strategyPercentageReturn !== this.state.strategyPercentageReturn
    ) {
      if (
        this.state.passedStrategyList.length > 0 &&
        this.state.strategyPercentageReturn !== null
      ) {
        this.setState({
          isShareStrategyVisible: true,
        });
      }
    }
    if (prevState.sortOption !== this.state.sortOption) {
      const modulusUser = getModulusUser();
      if (modulusUser && modulusUser.email) {
        BuilderPerformanceMetricsTableSorted({
          email_address: modulusUser.email,
          sortType: this.state.tableSortOption[this.state.sortOption.column],
          sortBy: this.state.sortOption.value ? "asc" : "desc",
        });
      }
      this.sortPerformanceMetricTableData();
    }
    if (prevProps.BackTestQueryState !== this.props.BackTestQueryState) {
      const passedQueryData = this.props.BackTestQueryState;

      if (passedQueryData.length > 0 && passedQueryData[0].strategy_name) {
        this.setState({
          saveStrategyName: passedQueryData[0].strategy_name,
        });
      }
    }
    if (
      prevState.selectedStrategiesOptions !==
      this.state.selectedStrategiesOptions
    ) {
      const modulusUser = getModulusUser();
      if (modulusUser && modulusUser.email) {
        BuilderChartAddAssets({
          email_address: modulusUser.email,
          assets: this.state.selectedStrategiesOptions,
        });
      }
    }
    if (
      prevProps.BackTestLatestStrategyState !==
      this.props.BackTestLatestStrategyState
    ) {
      this.setSessionPassedStrategyId(this.props.BackTestLatestStrategyState);
      this.setState(
        {
          passedStrategyList: [this.props.BackTestLatestStrategyState],
        },
        () => {
          this.getAssetData([
            ...this.state.selectedStrategiesOptions,
            this.props.BackTestLatestStrategyState,
          ]);
        }
      );
    }

    if (prevProps.BackTestTableState !== this.props.BackTestTableState) {
      let tempBtTableData = this.props.BackTestTableState;

      if (tempBtTableData) {
        this.setState({
          performanceMetricTableLoading: false,
        });
        let tempArr = [];
        tempBtTableData.forEach((curItem) => {
          for (var key in curItem) {
            if (curItem.hasOwnProperty(key)) {
              let itemFound = curItem[key];

              if (itemFound && itemFound.data) {
                if (itemFound.strategy_id) {
                  let tempStrategyPercentageReturn =
                    itemFound.data.annual_return;
                  this.setState({
                    strategyPercentageReturn: tempStrategyPercentageReturn,
                  });
                }
                let tempHolder = {
                  annual_return: itemFound.data.annual_return,
                  calmar_ratio: itemFound.data.calmar_ratio,
                  cumulative_return: itemFound.data.cumulative_return,
                  max_1d_drawdown: itemFound.data.max_1d_drawdown,
                  max_1w_drawdown: itemFound.data.max_1w_drawdown,
                  max_1m_drawdown: itemFound.data.max_1m_drawdown,
                  sharpe_ratio: itemFound.data.sharpe_ratio,
                  strategy_name: key,
                };
                tempArr.push(tempHolder);
              }
            }
          }
        });

        this.setState(
          {
            performanceMetricTableData: tempArr,
          },
          () => {
            this.sortPerformanceMetricTableData();
          }
        );
      }
    }
    if (prevProps.BackTestChartState !== this.props.BackTestChartState) {
      this.calcChartData();
    }
    // if (
    //   prevState.selectedStrategiesOptions !==
    //   this.state.selectedStrategiesOptions
    // ) {
    //   if (this.state.selectedStrategiesOptions.length === 0) {
    //     this.getAssetData(this.state.strategiesOptions);
    //   } else {
    //     let filteredAssets = [];
    //     this.state.strategiesOptions.forEach((item) => {
    //       if (
    //         this.state.selectedStrategiesOptions.includes(item.label) ||
    //         this.state.selectedStrategiesOptions.includes(item.value)
    //       ) {
    //         filteredAssets.push(item);
    //       }
    //     });
    //     this.getAssetData(filteredAssets);
    //   }
    // }
  }
  calcChartData = (minRange = 0, minTimeFormat = 0) => {
    let tempBtChartData = this.props.BackTestChartState.chartData;
    let tempBtChartDataOriginal = this.props.BackTestChartState
      .chartDataOriginal
      ? this.props.BackTestChartState.chartDataOriginal
      : [];
    if (tempBtChartData && tempBtChartData.length > 0) {
      let tempRangeDateHolder = "";
      this.setState({
        performanceVisualizationGraphLoading: false,
      });

      let allGraphListItems = [];
      tempBtChartData.forEach((curItem, curIndex) => {
        for (var key in curItem) {
          let tempRangeDate = "";
          if (curItem.hasOwnProperty(key)) {
            let itemFound = curItem[key];
            if (itemFound && itemFound.constructor === Array) {
              let tempInitialValueHolder = 0;

              let chartDataPointHolder = [];
              itemFound.forEach((item, mapIndex) => {
                const dateObj = new Date(item[0]);
                const timestamp = dateObj.getTime();
                const tempDateHolder = moment(dateObj);
                if (tempDateHolder.isSame(moment(), "day")) {
                  return;
                }
                if (mapIndex === 0 && curIndex === 0) {
                  tempRangeDate =
                    tempRangeDate +
                    moment(item[0]).format("MMM DD YYYY") +
                    " to ";
                }
                if (mapIndex === tempBtChartData.length - 1 && curIndex === 0) {
                  tempRangeDate =
                    tempRangeDate + moment(item[0]).format("MMM DD YYYY");
                }
                const convertedDate = moment(dateObj).format("DD MM YYYY");
                if (convertedDate === minRange) {
                  tempInitialValueHolder = itemFound[mapIndex][1];
                }
                if (mapIndex === 0 && moment(minTimeFormat).isBefore(item[0])) {
                  tempInitialValueHolder = itemFound[mapIndex][1];
                }

                let tempValueHolder = 0;
                if (mapIndex > 0 && item[1] && tempInitialValueHolder) {
                  tempValueHolder = parseFloat(
                    (
                      ((item[1] - tempInitialValueHolder) /
                        tempInitialValueHolder) *
                      100
                    ).toFixed(2)
                  );
                }
                let tempHolder = [
                  timestamp,
                  tempValueHolder,
                  parseFloat(item[1]).toFixed(2),
                ];
                chartDataPointHolder.push(tempHolder);
                // return tempHolder;
              });

              const tempGraphOptions = {
                name: key,
                data: chartDataPointHolder,
                type: "line",
                fillOpacity: 0,
                // fillColor:
                //   curIndex === 0
                //     ? {
                //         linearGradient: [0, 0, 0, 200],

                //         stops: [
                //           [0, "rgba(128, 67, 243,0.5)"],
                //           [1, "transparent"],
                //         ],
                //       }
                //     : curIndex === 1
                //     ? {
                //         linearGradient: [0, 0, 0, 200],
                //         stops: [
                //           [0, "rgba(86, 185, 182,0.5)"],
                //           [1, "transparent"],
                //         ],
                //       }
                //     : {
                //         linearGradient: [0, 0, 0, 200],
                //         stops: [
                //           [0, "rgba(43, 127, 255,0.5)"],
                //           [1, "transparent"],
                //         ],
                //       },
                color: strategyBuilderChartLineColorByIndex(curIndex),
              };
              allGraphListItems.push(tempGraphOptions);
              tempRangeDateHolder = tempRangeDate;
            }
          }
        }
      });

      this.setState({
        performanceVisualizationGraphData: allGraphListItems,
        performanceVisualizationGraphDataOriginal: tempBtChartDataOriginal,
        fromAndToDate: tempRangeDateHolder,
      });
    }
  };
  afterChangeDate = () => {
    const modulusUser = getModulusUser();
    if (modulusUser && modulusUser.email) {
      BuilderTableChangeDate({
        email_address: modulusUser.email,
        fromDate: this.state.fromDate,
        toDate: this.state.toDate,
      });
    }
    if (
      this.state.passedStrategyList &&
      this.state.passedStrategyList.length > 0
    ) {
      this.getAssetData(
        [
          ...this.state.selectedStrategiesOptions,
          ...this.state.passedStrategyList,
        ],
        true
      );
    } else {
      this.getAssetData(this.state.selectedStrategiesOptions, true);
    }
  };

  changeFromToDate = (date) => {
    let fromDate = date[0];
    let toDate = date[1];
    this.hideFromCalendar();
    this.hideToCalendar();
    this.setState(
      {
        fromDate: fromDate,
        toDate: toDate,
      },
      () => {
        this.afterChangeDate();
      }
    );
  };
  changeUserAndStrategy = (userList, strategyList) => {
    console.log("userList? ", userList);
    console.log("strategyList? ", strategyList);

    this.setState({
      passedUserList: [userList],
      passedStrategyList: [strategyList],
    });
  };
  hoverInfo = () => {
    const modulusUser = getModulusUser();
    if (modulusUser && modulusUser.email) {
      BuilderChartInfoHover({ email_address: modulusUser.email });
    }
  };
  shareThisStrategy = () => {
    let strategyId = "";
    let userReferralCode = "";
    let strategyPercentageReturn = this.state.strategyPercentageReturn;
    if (
      this.state.passedStrategyList &&
      this.state.passedStrategyList.length > 0
    ) {
      strategyId = this.state.passedStrategyList[0];
    }
    if (sessionStorage.getItem("userReferralCode")) {
      userReferralCode = sessionStorage.getItem("userReferralCode");
    }

    const shareMessage = `Check out this algorithmic strategy that’s generating ${strategyPercentageReturn}% annual return:\n \n \n${BASE_URL_S3}share/${strategyId}/${userReferralCode}`;
    const modulusUser = getModulusUser();
    if (modulusUser && modulusUser.email) {
      BuilderShareStrategyClicked({
        email_address: modulusUser.email,
        strategyName: this.state.saveStrategyName,
        strategyId: strategyId,
      });
    }
    navigator.clipboard
      .writeText(shareMessage)
      .then(() => {
        toast.success("Copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy share message: ", err);
      });
  };
  createNewStrategy = () => {
    this.props.history.push("/builder-reroute");
  };
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
                      backgroundColor:
                        strategyBuilderChartLineColorByIndexLowOpacity(
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
                        fill={strategyBuilderChartLineColorByIndex(dataIndex)}
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
    if (mobileCheck()) {
      return null;
    }

    return (
      <div className="back-test-page">
        {/* topbar */}
        <TopBar
          showCreateNew
          createNewStrategy={this.createNewStrategy}
          connectedWalletBalance={this.props.connectedWalletBalance}
          isWalletConnected={this.props.isWalletConnected}
          connectedWalletAddress={this.props.connectedWalletAddress}
          connectedWalletevents={this.props.connectedWalletevents}
          openConnectWallet={this.props.openConnectWallet}
          disconnectWallet={this.props.disconnectWallet}
          history={this.props.history}
        />
        <div className="page">
          <div className=" page-scroll">
            <div className="page-scroll-child ">
              <BackTestPageContent
                isSaveInvestStrategy={this.state.isSaveInvestStrategy}
                isExistingStrategy={this.state.isExistingStrategy}
                saveStrategyClicked={this.saveStrategyClicked}
                passedStrategyList={this.state.passedStrategyList}
                passedUserList={this.state.passedUserList}
                saveStrategyName={this.state.saveStrategyName}
                saveStrategyCheck={this.state.saveStrategyCheck}
                hoverInfo={this.hoverInfo}
                showSaveStrategy={this.showSaveStrategy}
                hideSaveStrategy={this.hideSaveStrategy}
                changeUserAndStrategy={this.changeUserAndStrategy}
                fromAndToDate={this.state.fromAndToDate}
                performanceVisualizationGraphLoading={
                  this.state.performanceVisualizationGraphLoading
                }
                performanceMetricTableLoading={
                  this.state.performanceMetricTableLoading
                }
                selectStrategies={this.selectStrategies}
                strategiesOptions={this.state.strategiesOptions}
                selectedStrategiesOptions={this.state.selectedStrategiesOptions}
                performanceMetricColumnList={performanceMetricColumnList}
                performanceMetricTableData={
                  this.state.performanceMetricTableData
                }
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
                changeFromDate={this.changeFromToDate}
                changeToDate={this.changeFromToDate}
                calcChartData={this.calcChartData}
                changeIsStrategyEmpty={this.changeIsStrategyEmpty}
                getAssetDataAfterStrategyUpdate={
                  this.getAssetDataAfterStrategyUpdate
                }
                isStrategyEmpty={this.state.isStrategyEmpty}
                fromDate={this.state.fromDate}
                toDate={this.state.toDate}
                isShareStrategyVisible={this.state.isShareStrategyVisible}
                shareThisStrategy={this.shareThisStrategy}
                // Copy Paste
                copiedItem={this.state.copiedItem}
                setCopiedItem={this.setCopiedItem}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  BackTestChartState: state.BackTestChartState,
  BackTestTableState: state.BackTestTableState,
  BackTestQueryState: state.BackTestQueryState,
  BackTestLatestStrategyState: state.BackTestLatestStrategyState,
});
const mapDispatchToProps = {
  getBackTestChart,
  getBackTestTable,
  getUserReferralCodes,
};

BackTestPage.propTypes = {};
export default connect(mapStateToProps, mapDispatchToProps)(BackTestPage);
