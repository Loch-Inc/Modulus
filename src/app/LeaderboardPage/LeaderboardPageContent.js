import { connect } from "react-redux";
import {
  LeaderboardTrophyIcon,
  ModulusLeaderboardName,
  ModulusLeaderboardStrategies,
} from "src/assets/images/icons";
import { BaseReactComponent } from "../../utils/form";
import { mobileCheck, numToCurrency } from "../../utils/ReusableFunctions";
import TransactionTable from "../intelligence/TransactionTable";
import moment from "moment";

class LeaderboardContent extends BaseReactComponent {
  constructor(props) {
    super(props);

    this.state = {
      isMobile: mobileCheck(),
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div className="leaderboard-page-content">
        <div className="leaderboard-page-content-header-parent">
          <div className="leaderboard-page-content-header">
            <div className="leaderboard-page-content-header-block-parent">
              <div className="leaderboard-page-content-header-block-new-parent">
                <div className="leaderboard-page-content-header-block">
                  <div className="leaderboard-page-content-header-block-text">
                    <h1 className="leaderboard-page-content-header-block-text-heading">
                      <h1 className="leaderboard-page-content-header-block-text-heading-thin">
                        Loch
                      </h1>
                      <h1 className="leaderboard-page-content-header-block-text-heading-bold">
                        Leaderboard
                      </h1>
                    </h1>
                    {this.props.totalStrategiesCreated &&
                    this.props.totalUsers ? (
                      <div className="leaderboard-page-content-header-block-total">
                        <div className="leaderboard-page-content-header-block-total-block">
                          <ModulusLeaderboardStrategies className="leaderboard-page-content-header-block-total-block-image" />

                          <div className="leaderboard-page-content-header-block-total-block-text">
                            <h1 className="leaderboard-page-content-header-block-total-block-text-heading">
                              Strategies
                            </h1>
                            <h1 className="leaderboard-page-content-header-block-total-block-text-subheading">
                              {numToCurrency(
                                this.props.totalStrategiesCreated,
                                true
                              ).toLocaleString("en-US")}
                            </h1>
                          </div>
                        </div>
                        <div className="leaderboard-page-content-header-block-total-block">
                          <ModulusLeaderboardName className="leaderboard-page-content-header-block-total-block-image" />

                          <div className="leaderboard-page-content-header-block-total-block-text">
                            <h1 className="leaderboard-page-content-header-block-total-block-text-heading">
                              Users
                            </h1>
                            <h1 className="leaderboard-page-content-header-block-total-block-text-subheading">
                              {numToCurrency(
                                this.props.totalUsers,
                                true
                              ).toLocaleString("en-US")}
                            </h1>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                  <div className="leaderboard-illustration-container">
                    <LeaderboardTrophyIcon className="leaderboard-illustration" />
                  </div>
                  {this.props.lastUpdated ? (
                    <p className="leaderboard-page-content-header-block-text-subheading">
                      <p className="leaderboard-page-content-header-block-text-subheading-thin">
                        Last Updated
                      </p>
                      <p className="leaderboard-page-content-header-block-text-subheading-bold">
                        {moment(this.props.lastUpdated).format("D MMMM")}
                      </p>
                    </p>
                  ) : null}

                  {/* <div className="leaderboard-page-content-header-block-image">
                <Image
                  className="leaderboard-page-content-header-block-image-img"
                  src={ModulustLeaderboard}
                  alt="ModulustLeaderboard"
                />
              </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="leaderboard-page-right-block-content-table-container-parent">
          <div className="leaderboard-page-right-block-content-table-container">
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
                message="No strategies yet"
                tableData={this.props.leaderboardTableData}
                columnList={this.props.leaderboardTableColumnList}
                isLoading={this.props.leaderboardTableDataLoading}
                yAxisScrollable
                addWatermark={!this.state.isMobile}
                fakeWatermark={this.state.isMobile}
                xAxisScrollable={this.state.isMobile}
                xAxisScrollableColumnWidth={3.5}
                isMiniversion={this.state.isMobile}
                tableColHeight={45}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};

LeaderboardContent.propTypes = {};
export default connect(mapStateToProps, mapDispatchToProps)(LeaderboardContent);
