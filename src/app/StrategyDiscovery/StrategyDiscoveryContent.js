import React from "react";

import { connect } from "react-redux";
import { BaseReactComponent } from "../../utils/form";
import { mobileCheck } from "../../utils/ReusableFunctions";
import TransactionTable from "../intelligence/TransactionTable";
import { Image } from "react-bootstrap";

import {
  InfoIcon,
  StrategyDiscoveryHeadingArrowIcon,
  StrategyDiscoveryHeadingFloatingBlocks,
} from "../../assets/images/icons";
import moment from "moment";
import CustomOverlay from "src/utils/commonComponent/CustomOverlay";

class StrategyDiscoveryContent extends BaseReactComponent {
  constructor(props) {
    super(props);

    this.state = {
      isMobile: mobileCheck(),
      prevHeight: 0,
    };
  }

  componentDidMount() {}
  render() {
    return (
      <div className="strategy-discovery-page-content">
        <div
          onClick={() => {
            this.props.goToStrategyBuilderPage();
          }}
          className="strategy-discovery-page-heading"
        >
          <div className="strategy-discovery-page-heading-text">
            <div className="strategy-discovery-page-heading-text-subheading">
              Create your own
            </div>
            <div className="strategy-discovery-page-heading-text-heading">
              <div>Algorithmic Strategy</div>
              <Image
                src={StrategyDiscoveryHeadingArrowIcon}
                className="strategy-discovery-page-heading-text-heading-icon"
              />
            </div>
          </div>
          <Image
            className="strategy-discovery-page-heading-images"
            src={StrategyDiscoveryHeadingFloatingBlocks}
          />
        </div>
        <div className="strategy-discovery-page-content-block">
          <div className="btpcb-title-discovery-container">
            <div className="btpcb-title">
              <div>Discover</div>
              {this.props.toDate && this.props.fromDate ? (
                <CustomOverlay
                  position="top"
                  isIcon={false}
                  isInfo={true}
                  isText={true}
                  className={"fix-widt"}
                  text={`Performance is measured from ${moment(
                    this.props.fromDate
                  ).format("D MMM YYYY")} to ${moment(this.props.toDate).format(
                    "D MMM YYYY"
                  )}`}
                >
                  <InfoIcon
                    onMouseEnter={this.props.hoverInfo}
                    className="header-info-icon"
                    style={{
                      transform: "translateY(0.5px)",
                    }}
                  />
                </CustomOverlay>
              ) : null}
            </div>
            {/* {this.props.toDate && this.props.fromDate ? (
              <div class={`btpcb-discover-time-range-table`}>
                <div className="inter-display-medium f-s-13 lh-16 time-no-cal-badge">
                  From
                </div>
                <div
                  id="1"
                  class="inter-display-medium f-s-13 lh-16 time-cal-badge"
                >
                  <div className="btpcb-discover-calendar-Container">
                    <div className="btpcb-discover-calendar-Text">
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
                  <div className="btpcb-discover-calendar-Container">
                    <div className="btpcb-discover-calendar-Text">
                      {moment(this.props.toDate).format("D MMM YYYY")}
                    </div>
                  </div>
                </div>
              </div>
            ) : null} */}
          </div>

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
                totalPage={this.props.totalPage}
                history={this.props.history}
                location={this.props.location}
                page={this.props.page}
                paginationNew
                hidePaginationRecords
                // Old
                message="No strategies found"
                tableData={this.props.performanceMetricTableData}
                columnList={this.props.performanceMetricColumnList}
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};

StrategyDiscoveryContent.propTypes = {};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StrategyDiscoveryContent);
