import { connect } from "react-redux";
import { BaseReactComponent } from "../../utils/form";

import moment from "moment";
import { toast } from "react-toastify";
import {
  ProfileAllReferralCodesCopied,
  ProfileEditUsernameClicked,
  ProfileInviteAFriendClicked,
  ProfilePageView,
  ProfileSignedOut,
  ProfileSignOutClicked,
  ProfileTablePageChanged,
  ProfileUsernameEdited,
} from "src/utils/AnalyticsFunctions";
import { API_LIMIT, BASE_URL_S3, START_INDEX } from "src/utils/Constant";
import { deleteToken, getModulusUser } from "src/utils/ManageToken";
import CustomOverlay from "../../utils/commonComponent/CustomOverlay";
import {
  copyText,
  mobileCheck,
  numToCurrency,
  scrollToBottomAfterPageChange,
  strategyBuilderChartLineColorByIndex,
} from "../../utils/ReusableFunctions";
import ConfirmLeaveModal from "../common/ConfirmLeaveModal";
import TopBar from "../TopBar/TopBar";
import "./_profilePage.scss";
import {
  editUserNameProfile,
  getUserCreatedStrategies,
  getUserProfileData,
  getUserReferralCodes,
} from "./Api/ProfilePageApi";
import ProfilePageContent from "./ProfilePageContent";

class ProfilePage extends BaseReactComponent {
  constructor(props) {
    super(props);
    const search = props.location.search;
    const params = new URLSearchParams(search);
    const page = params.get("p");
    this.state = {
      isEditName: false,
      inputValue: "",
      isInputBtnDisabled: false,
      firstLoad: true,
      userData: {
        created_on: "",
        email: "",
        modified_on: "",
        source: "",
        _id: "",
      },
      shouldGoToBottom: false,
      showConfirmLeaveModal: false,
      currentPage: page ? parseInt(page, 10) : START_INDEX,
      totalPages: 0,
      isReferralCodeBlockOpen: false,
      referralCodes: [],
      toDate: new Date(new Date().setDate(new Date().getDate() - 1)),
      fromDate: new Date(
        new Date().setMonth(new Date().getMonth() - 1, new Date().getDate() - 1)
      ),
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
          coumnWidth: 0.28571429, // Double the percentage of other items
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
                    <div className="profile-page-table-strategy-name-container">
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
                          <div className="profile-page-table-strategy-date">
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
        // {
        //   labelName: (
        //     <div className="history-table-header-col no-hover" id="time">
        //       <span className="inter-display-medium f-s-10 ">
        //         Annual
        //         <br />
        //         Return
        //       </span>
        //     </div>
        //   ),
        //   dataKey: "anuret",

        //   coumnWidth: 0.14285714,
        //   isCell: true,
        //   cell: (rowData, dataKey, rowIndex) => {
        //     if (dataKey === "anuret") {
        //       return (
        //         <div
        //           onClick={() => {
        //             this.goToStrategyBuilderPage(rowData);
        //           }}
        //           className="full-table-row-col-width"
        //         >
        //           <div className="inter-display-medium f-s-13">
        //             {rowData.annual_return ? (
        //               <span>
        //                 {rowData.annual_return < 0 ? "-" : ""}
        //                 {numToCurrency(rowData.annual_return).toLocaleString(
        //                   "en-US"
        //                 )}
        //                 %
        //               </span>
        //             ) : (
        //               "0.00%"
        //             )}
        //           </div>
        //         </div>
        //       );
        //     }
        //   },
        // },
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
            <div
              className="history-table-header-col no-hover history-table-header-col-curve-right"
              id="time"
            >
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
      ],
    };
  }
  openLeaveModal = () => {
    const modulusUser = getModulusUser();
    if (modulusUser && modulusUser.email) {
      ProfileSignOutClicked({
        email_address: modulusUser.email,
      });
    }
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
    this.props.getUserReferralCodes();
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
    const modulusUser = getModulusUser();
    if (modulusUser && modulusUser.email) {
      ProfilePageView({
        email_address: modulusUser.email,
      });
    }
    this.getUserCreatedStrategiesPass();
    this.getUserReferralCodesPass();
    this.getUserProfileDataPass();
    this.setState({ inputValue: this.state.userData.username });
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
      const modulusUser = getModulusUser();
      if (modulusUser && modulusUser.email) {
        ProfileTablePageChanged({
          email_address: modulusUser.email,
          page: page,
        });
      }
      this.setState(
        {
          currentPage: page,
        },
        () => {
          this.getUserCreatedStrategiesPass();
        }
      );
    }
    if (prevState.userData?.username !== this.state?.userData.username) {
      this.setState({ inputValue: this.state.userData.username });
    }
    if (
      prevProps.StrategiesCreatedTableState !==
      this.props.StrategiesCreatedTableState
    ) {
      let tempBtTableData = this.props.StrategiesCreatedTableState;
      if (tempBtTableData) {
        let totalCount = tempBtTableData.total_count;
        let totalPages = 0;
        if (totalCount) {
          totalPages = Math.ceil(totalCount / API_LIMIT);
        }

        tempBtTableData = tempBtTableData.strategies;
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
          totalPages: totalPages,
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
  inviteAFriend = () => {
    const modulusUser = getModulusUser();
    if (modulusUser && modulusUser.email) {
      ProfileInviteAFriendClicked({
        email_address: modulusUser.email,
      });
    }
    let userReferralCode = "";

    if (sessionStorage.getItem("userReferralCode")) {
      userReferralCode = sessionStorage.getItem("userReferralCode");
    }

    const shareMessage = `${BASE_URL_S3}refcode/${userReferralCode}`;
    navigator.clipboard
      .writeText(shareMessage)
      .then(() => {
        toast.success("Invitation link copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy share message: ", err);
      });
  };
  closeReferralCodeBlock = () => {
    this.setState({ isReferralCodeBlockOpen: false });
  };
  copyAllReferralCodes = () => {
    const modulusUser = getModulusUser();
    if (modulusUser && modulusUser.email) {
      ProfileAllReferralCodesCopied({
        email_address: modulusUser.email,
      });
    }
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
    const modulusUser = getModulusUser();
    if (modulusUser && modulusUser.email) {
      ProfileSignedOut({
        email_address: modulusUser.email,
      });
    }
    deleteToken();
    setTimeout(() => {
      window.location.href = "/sign-in";
    }, 500);
  };
  changeInputValue = (e) => {
    this.setState({ inputValue: e.target.value });
  };
  onInputKeyDown = (e) => {
    if (e.key === "Enter") {
      this.editUserName();
    }
  };
  editUserName = () => {
    this.setState({ isInputBtnDisabled: true });
    const tempApiData = {
      username: this.state.inputValue,
    };

    this.props.editUserNameProfile(
      tempApiData,
      this.editNameSuccess,
      this.editNameError
    );
  };
  editNameSuccess = () => {
    const modulusUser = getModulusUser();
    if (modulusUser && modulusUser.email) {
      ProfileUsernameEdited({
        email_address: modulusUser.email,
        username: this.state.inputValue,
      });
    }
    toast.success("Username updated successfully");
    this.setState({
      isEditName: false,
      isInputBtnDisabled: false,
      userData: {
        ...this.state.userData,
        username: this.state.inputValue,
      },
    });
  };
  editNameError = () => {
    this.setState({ isInputBtnDisabled: false });
    toast.error("An error occurred");
  };
  showEditName = () => {
    this.setState({ isEditName: true });
    const modulusUser = getModulusUser();
    if (modulusUser && modulusUser.email) {
      ProfileEditUsernameClicked({
        email_address: modulusUser.email,
      });
    }
  };
  hideEditName = () => {
    this.setState({
      isEditName: false,
      inputValue: this.state.userData?.username,
    });
  };
  goToBuilderPage = () => {
    this.props.history.push("/builder");
  };
  render() {
    if (mobileCheck()) {
      return null;
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
        <TopBar
          showCreateNew
          connectedWalletBalance={this.props.connectedWalletBalance}
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
              <ProfilePageContent
                toDate={this.state.toDate}
                fromDate={this.state.fromDate}
                isWalletConnected={this.props.isWalletConnected}
                connectedWalletAddress={this.props.connectedWalletAddress}
                userData={this.state.userData}
                totalPage={this.state.totalPages}
                page={this.state.currentPage}
                history={this.props.history}
                location={this.props.location}
                signOutFun={this.openLeaveModal}
                copyAllReferralCodes={this.copyAllReferralCodes}
                inviteAFriend={this.inviteAFriend}
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
                hideEditName={this.hideEditName}
                onInputKeyDown={this.onInputKeyDown}
                changeInputValue={this.changeInputValue}
                editUserName={this.editUserName}
                showEditName={this.showEditName}
                isEditName={this.state.isEditName}
                inputValue={this.state.inputValue}
                isInputBtnDisabled={this.state.isInputBtnDisabled}
                goToBuilderPage={this.goToBuilderPage}
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
  editUserNameProfile,
  getUserProfileData,
};

ProfilePage.propTypes = {};
export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
