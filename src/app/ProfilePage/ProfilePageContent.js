import { connect } from "react-redux";
import { BaseReactComponent } from "../../utils/form";
import { copyText, mobileCheck } from "../../utils/ReusableFunctions";
import TransactionTable from "../intelligence/TransactionTable";
import { Image } from "react-bootstrap";
import { ProfilePageTempDP } from "src/assets/images";
import { CopyIcon, PasswordIcon, SignOutIcon } from "src/assets/images/icons";
import OutsideClickHandler from "react-outside-click-handler";

class ProfilePageContent extends BaseReactComponent {
  constructor(props) {
    super(props);

    this.state = {
      isMobile: mobileCheck(),
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div className="profile-page-content">
        <div className="profile-page-left-block">
          <div className="profile-page-left-block-bio">
            <div className="profile-page-left-block-dp">
              <Image
                className="profile-page-left-block-dp-image"
                src={ProfilePageTempDP}
              />
            </div>
            <div className="profile-page-left-block-bio-name-mail">
              <div className="profile-page-left-block-name">@Prithvir12</div>
              <div className="profile-page-left-block-email">
                prithvir12@gmail.com
              </div>
            </div>
          </div>
          <div className="profile-page-left-block-action-btns">
            <OutsideClickHandler
              display="contents"
              onOutsideClick={this.props.closeReferralCodeBlock}
            >
              <button
                className={`profile-page-left-block-action-btn ${
                  this.props.isReferralCodeBlockOpen
                    ? "profile-page-left-block-action-btn-selected"
                    : ""
                }`}
                onClick={this.props.openReferralCodeBlock}
              >
                <Image
                  className="profile-page-left-block-action-btn-icon"
                  src={PasswordIcon}
                />
                <div className="profile-page-left-block-action-btn-text">
                  Share Referral Code
                </div>
                {this.props.isReferralCodeBlockOpen ? (
                  <div className="profile-page-left-block-action-btn-referral-code-block">
                    <div className="profile-page-left-block-action-btn-referral-code-block-title">
                      <div className="profile-page-left-block-action-btn-referral-code-block-title-text">
                        Referral Codes
                      </div>
                      <div
                        onClick={this.props.copyAllReferralCodes}
                        className="profile-page-left-block-action-btn-referral-code-block-title-copy-all-btn"
                      >
                        Copy All
                      </div>
                    </div>
                    <div className="profile-page-left-block-action-btn-referral-code-block-list">
                      {this.props.referralCodes
                        .filter((item) => !item.used)
                        .map((item, index) => (
                          <div
                            onClick={() => {
                              copyText(item.code);
                            }}
                            key={"referral-code-" + index}
                            className="profile-page-left-block-action-btn-referral-code-block-list-item"
                          >
                            <div>{item.code}</div>
                            <CopyIcon className="profile-page-left-block-action-btn-referral-code-block-list-item-copy-icon" />
                          </div>
                        ))}
                      {this.props.referralCodes
                        .filter((item) => item.used)
                        .map((item, index) => (
                          <div
                            onClick={() => {
                              copyText(item.code);
                            }}
                            key={"referral-code-" + index}
                            className="profile-page-left-block-action-btn-referral-code-block-list-item profile-page-left-block-action-btn-referral-code-block-list-item-used"
                          >
                            <div>{item.code}</div>
                            <CopyIcon className="profile-page-left-block-action-btn-referral-code-block-list-item-copy-icon" />
                          </div>
                        ))}
                    </div>
                  </div>
                ) : null}
              </button>
            </OutsideClickHandler>
          </div>
          <div className="profile-page-left-block-action-btns">
            <button
              className={`profile-page-left-block-action-btn profile-page-left-block-action-btn-logh-out ${
                this.props.isReferralCodeBlockOpen
                  ? "profile-page-left-block-action-btn-selected"
                  : ""
              }`}
              onClick={this.props.tempSignOut}
            >
              <SignOutIcon className="profile-page-left-block-action-btn-icon" />
              <div className="profile-page-left-block-action-btn-text">
                Sign out
              </div>
            </button>
          </div>
        </div>
        <div className="profile-page-right-block">
          <div className="profile-page-right-block-content">
            {/* <div className="profile-page-right-block-content-title">
              Strategies Created
            </div> */}

            <div className="profile-page-right-block-content-table-container">
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
                  totalPage={this.props.totalPage}
                  history={this.props.history}
                  location={this.props.location}
                  page={this.props.page}
                  paginationNew
                  hidePaginationRecords
                  // Old
                  message="No strategies created yet"
                  tableData={this.props.strategiesCreatedTableData}
                  columnList={this.props.strategiesCreatedColumnList}
                  isLoading={this.props.strategiesCreatedTableLoading}
                  yAxisScrollable
                  addWatermark={!this.state.isMobile}
                  fakeWatermark={this.state.isMobile}
                  xAxisScrollable={this.state.isMobile}
                  xAxisScrollableColumnWidth={3.5}
                  isMiniversion={this.state.isMobile}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};

ProfilePageContent.propTypes = {};
export default connect(mapStateToProps, mapDispatchToProps)(ProfilePageContent);
