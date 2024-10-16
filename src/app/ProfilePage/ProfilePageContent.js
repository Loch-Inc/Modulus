import { Image } from "react-bootstrap";
import OutsideClickHandler from "react-outside-click-handler";
import { connect } from "react-redux";
import { ProfilePageTempDP } from "src/assets/images";
import {
  ConnectedWalletIcon,
  CopyIcon,
  PasswordIcon,
  SignOutIcon,
  StrategyBuilderPencilIcon,
} from "src/assets/images/icons";
import { BaseReactComponent } from "../../utils/form";
import {
  copyText,
  mobileCheck,
  TruncateText,
} from "../../utils/ReusableFunctions";
import TransactionTable from "../intelligence/TransactionTable";
import { editUserNameProfile } from "./Api/ProfilePageApi";
import { getModulusUser } from "src/utils/ManageToken";
import { ProfileReferralCodeCopied } from "src/utils/AnalyticsFunctions";
import moment from "moment";

class ProfilePageContent extends BaseReactComponent {
  constructor(props) {
    super(props);

    this.state = {
      isMobile: mobileCheck(),
    };
  }

  componentDidMount() {}
  componentDidUpdate(prevProps, prevState) {}

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
              {this.props.userData?.username ? (
                <div className="profile-page-left-block-name">
                  {this.props.isEditName ? (
                    <OutsideClickHandler
                      display="contents"
                      onOutsideClick={this.props.hideEditName}
                    >
                      <div className="profile-page-left-block-name-input-container">
                        <input
                          className="profile-page-left-block-name-input"
                          value={this.props.inputValue}
                          onKeyDown={this.props.onInputKeyDown}
                          onChange={this.props.changeInputValue}
                          placeholder="Username"
                          autoFocus
                        />
                        <div
                          onClick={this.props.editUserName}
                          className={`profile-page-left-block-name-input-save-btn ${
                            this.props.isInputBtnDisabled ||
                            this.props.inputValue === ""
                              ? "profile-page-left-block-name-input-save-btn-disabled"
                              : ""
                          }`}
                        >
                          Save
                        </div>
                      </div>
                    </OutsideClickHandler>
                  ) : (
                    <div className="profile-page-left-block-name-title-container">
                      {this.props.userData.username}
                      <Image
                        onClick={this.props.showEditName}
                        src={StrategyBuilderPencilIcon}
                        className="profile-page-left-block-name-pencil-icon"
                      />
                    </div>
                  )}
                </div>
              ) : null}
              {this.props.userData?.email ? (
                <div className="profile-page-left-block-email">
                  {this.props.userData.email}
                </div>
              ) : null}
              {this.props.isWalletConnected ? (
                <div className="profile-page-left-block-wallet">
                  <ConnectedWalletIcon className="profile-page-left-block-wallet-icon" />
                  <div>{TruncateText(this.props.connectedWalletAddress)}</div>
                </div>
              ) : null}
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
                              const modulusUser = getModulusUser();
                              if (modulusUser) {
                                ProfileReferralCodeCopied({
                                  email_address: modulusUser.email,
                                  referralCode: item.code,
                                });
                              }
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
              onClick={this.props.signOutFun}
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
            <div className="profile-page-right-title-discovery-container">
              <div className="profile-page-right-title">
                <div>Strategies Created</div>
              </div>
              {this.props.toDate && this.props.fromDate ? (
                <div class={`profile-page-right-discover-time-range-table`}>
                  <div className="inter-display-medium f-s-13 lh-16 time-no-cal-badge">
                    From
                  </div>
                  <div
                    id="1"
                    class="inter-display-medium f-s-13 lh-16 time-cal-badge"
                  >
                    <div className="profile-page-right-discover-calendar-Container">
                      <div className="profile-page-right-discover-calendar-Text">
                        {moment(this.props.fromDate).format("D MMM YYYY")}
                      </div>
                    </div>
                  </div>
                  <div
                    id="2"
                    class="inter-display-medium f-s-13 lh-16 time-no-cal-badge"
                  >
                    To
                  </div>

                  <div
                    id="3"
                    class={`inter-display-medium f-s-13 lh-16 time-cal-badge time-cal-badge-right-cal`}
                  >
                    <div className="profile-page-right-discover-calendar-Container">
                      <div className="profile-page-right-discover-calendar-Text">
                        {moment(this.props.toDate).format("D MMM YYYY")}
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

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
const mapDispatchToProps = {
  editUserNameProfile,
};

ProfilePageContent.propTypes = {};
export default connect(mapStateToProps, mapDispatchToProps)(ProfilePageContent);
