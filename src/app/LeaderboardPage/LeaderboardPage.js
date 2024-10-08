import { connect } from "react-redux";
import { BaseReactComponent } from "../../utils/form";

import CustomOverlay from "src/utils/commonComponent/CustomOverlay";
import {
  ModulusLeaderboardAnualReturn,
  ModulusLeaderboardName,
  ModulusLeaderboardRank,
  ModulusLeaderboardStrategies,
} from "../../assets/images/icons";
import { mobileCheck } from "../../utils/ReusableFunctions";
import MobileLayout from "../layout/MobileLayout";
import TopBar from "../TopBar/TopBar";
import "./_leaderboard.scss";
import { getLeaderboardData } from "./Api/LeaderboardApi";
import LeaderboardPageContent from "./LeaderboardPageContent";

class LeaderboardPage extends BaseReactComponent {
  constructor(props) {
    super(props);

    this.state = {
      lastUpdated: "",
      totalStrategiesCreated: 0,
      totalUsers: 0,
      leaderboardTableData: [],
      leaderboardTableDataLoading: false,
      leaderboardTableColumnList: [
        {
          labelName: (
            <div
              className="history-table-header-col no-hover history-table-header-col-curve-left"
              id="time"
            >
              <ModulusLeaderboardRank className="leaderboard-page-content-header-block-icon" />
              <span className="inter-display-medium ">Rank</span>
            </div>
          ),
          dataKey: "rank",
          coumnWidth: 0.25, // Double the percentage of other items
          isCell: true,
          cell: (rowData, dataKey, rowIndex) => {
            if (dataKey === "rank") {
              return (
                <div className="full-table-row-col-width">
                  <div
                    className={`inter-display-medium leaderboard-rank leaderboard-rank-${rowData.rank}`}
                  >
                    {rowData.rank}
                  </div>
                </div>
              );
            }
          },
        },

        {
          labelName: (
            <div className="history-table-header-col no-hover" id="time">
              <ModulusLeaderboardName className="leaderboard-page-content-header-block-icon" />
              <span className="inter-display-medium  ">Name</span>
            </div>
          ),
          dataKey: "name",

          coumnWidth: 0.25,
          isCell: true,
          cell: (rowData, dataKey, rowIndex) => {
            if (dataKey === "name") {
              return (
                <div className="full-table-row-col-width">
                  <div className="inter-display-medium ">{rowData.name}</div>
                </div>
              );
            }
          },
        },
        // {
        //   labelName: (
        //     <div className="history-table-header-col no-hover" id="time">
        //       <ModulusLeaderboardInvitedBy className="leaderboard-page-content-header-block-icon" />
        //       <span className="inter-display-medium  ">Invited By</span>
        //     </div>
        //   ),
        //   dataKey: "invited_by",

        //   coumnWidth: 0.25,
        //   isCell: true,
        //   cell: (rowData, dataKey, rowIndex) => {
        //     if (dataKey === "invited_by") {
        //       return (
        //         <div className="full-table-row-col-width">
        //           <div className="inter-display-medium ">
        //             @{rowData.strategy_name}
        //           </div>
        //         </div>
        //       );
        //     }
        //   },
        // },
        {
          labelName: (
            <div className="history-table-header-col no-hover" id="time">
              <ModulusLeaderboardStrategies className="leaderboard-page-content-header-block-icon" />
              <span className="inter-display-medium  ">Strategies Created</span>
            </div>
          ),
          dataKey: "strategies_created",

          coumnWidth: 0.25,
          isCell: true,
          cell: (rowData, dataKey, rowIndex) => {
            if (dataKey === "strategies_created") {
              return (
                <div className="full-table-row-col-width">
                  <div className="inter-display-medium ">
                    {rowData.strategies_created}
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
              <ModulusLeaderboardAnualReturn className="leaderboard-page-content-header-block-icon" />
              <span className="inter-display-medium  ">Best Annual Return</span>
            </div>
          ),
          dataKey: "best_anual_return",

          coumnWidth: 0.25,
          isCell: true,
          cell: (rowData, dataKey, rowIndex) => {
            if (dataKey === "best_anual_return") {
              return (
                <div className="full-table-row-col-width">
                  <CustomOverlay
                    position="top"
                    isIcon={false}
                    isInfo={true}
                    isText={true}
                    text={
                      rowData.best_anual_return
                        ? Math.abs(rowData.best_anual_return).toLocaleString(
                            "en-US"
                          ) + "%"
                        : "0.00%"
                    }
                    colorCode="#000"
                  >
                    <div className="inter-display-medium leaderboard-annual-return ">
                      {rowData.best_anual_return
                        ? Math.abs(
                            rowData.best_anual_return.toFixed(2)
                          ).toLocaleString("en-US") + "%"
                        : "0.00%"}
                      {/* {rowData.best_anual_return}% */}
                    </div>
                  </CustomOverlay>
                </div>
              );
            }
          },
        },
      ],
    };
  }

  getLeaderboardDataPass = () => {
    this.setState({
      leaderboardTableDataLoading: true,
    });
    this.props.getLeaderboardData(this, this.stopLoading);
  };
  componentDidMount() {
    this.getLeaderboardDataPass();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.LeaderboardDataState !== this.props.LeaderboardDataState) {
      let curItem = this.props.LeaderboardDataState;
      let tempLastUpdated = "";
      let tempTotalStrategiesCreated = 0;
      let tempTotalUsers = 0;
      if (curItem?.last_updated_at) {
        tempLastUpdated = curItem.last_updated_at;
      }
      if (curItem?.total_strategies) {
        tempTotalStrategiesCreated = curItem.total_strategies;
      }
      if (curItem?.total_users) {
        tempTotalUsers = curItem.total_users;
      }
      let tempHolder = [];
      if (curItem?.leaderboard) {
        tempHolder = curItem.leaderboard;
      }

      let tempTableData = [];

      tempHolder.forEach((item) => {
        tempTableData.push({
          rank: item.rank ? item.rank : "",
          name: item.username ? item.username : "-",
          strategies_created: item.strategies_count
            ? item.strategies_count
            : "",
          best_anual_return: item.best_annual_return
            ? item.best_annual_return
            : "",
        });
      });
      this.setState({
        leaderboardTableData: tempTableData,
        lastUpdated: tempLastUpdated,
        totalStrategiesCreated: tempTotalStrategiesCreated,
        totalUsers: tempTotalUsers,
        leaderboardTableDataLoading: false,
      });
    }
  }
  stopLoading = () => {
    this.setState({
      leaderboardTableDataLoading: false,
      leaderboardTableData: [],
    });
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
      <div className="leaderboard-page">
        <TopBar history={this.props.history} />
        <LeaderboardPageContent
          leaderboardTableData={this.state.leaderboardTableData}
          leaderboardTableDataLoading={this.state.leaderboardTableDataLoading}
          leaderboardTableColumnList={this.state.leaderboardTableColumnList}
          lastUpdated={this.state.lastUpdated}
          totalStrategiesCreated={this.state.totalStrategiesCreated}
          totalUsers={this.state.totalUsers}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  LeaderboardDataState: state.LeaderboardDataState,
});
const mapDispatchToProps = {
  getLeaderboardData,
};

LeaderboardPage.propTypes = {};
export default connect(mapStateToProps, mapDispatchToProps)(LeaderboardPage);
