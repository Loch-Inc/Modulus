import Highcharts from "highcharts/highstock";
import { BaseReactComponent } from "../../../../../utils/form";

import { connect } from "react-redux";
import BackTestBuilderBlock from "../Components/BackTestBuilderBlock/BackTestBuilderBlock";
import BackTestWeightPercentageBlock from "../Components/BackTestWeightPercentageBlock/BackTestWeightPercentageBlock";
import BackTestBuilderMainBlock from "./BackTestBuilderMainBlock";
import { getModulusUser } from "src/utils/ManageToken";
import { BuilderToggleCollapseWeightPercentage } from "src/utils/AnalyticsFunctions";

require("highcharts/modules/annotations")(Highcharts);

class BackTestBuildeWeightItem extends BaseReactComponent {
  constructor(props) {
    super(props);

    this.state = { isItemCollapsedWeight: false };
  }
  toggleCollapseWeight = (e) => {
    const modulusUser = getModulusUser();
    if (modulusUser && modulusUser.email) {
      BuilderToggleCollapseWeightPercentage({
        email_address: modulusUser.email,
        isCollapsed: !this.state.isItemCollapsedWeight,
      });
    }
    e.stopPropagation();
    this.setState({ isItemCollapsedWeight: !this.state.isItemCollapsedWeight });
  };
  render() {
    return (
      <div
        key={this.props.key}
        className={`strategy-builder-block-container-parent`}
      >
        {/* {block.weight_type === "SPECIFIED" ? ( */}
        <BackTestBuilderBlock
          isError={this.props.isError}
          copiedItem={this.props.copiedItem}
          setCopiedItem={this.props.setCopiedItem}
          innerWidth={this.props.innerWidth}
          //WEIGHT
          weightPath={this.props.tempWeightPath}
          weightIndex={this.props.curItemIndex}
          //WEIGHT
          passedClass="strategy-builder-block-container-weight"
          blockLevel={this.props.blockLevel}
          blockType="weight percentage"
          showDropDown
          path={[
            ...this.props.path,
            this.props.passedKey,
            "weight_item",
            this.props.curItemIndex,
          ]}
          strategyBuilderString={this.props.strategyBuilderString}
          strategyBuilderStringOpenPopUp={
            this.props.strategyBuilderStringOpenPopUp
          }
          changeStrategyBuilderString={this.props.changeStrategyBuilderString}
          changeStrategyBuilderPopUpString={
            this.props.changeStrategyBuilderPopUpString
          }
          isItemCollapsed={this.state.isItemCollapsedWeight}
          toggleCollapse={this.toggleCollapseWeight}
        >
          <BackTestWeightPercentageBlock
            path={[
              ...this.props.path,
              this.props.passedKey,
              "weight_item",
              this.props.curItemIndex,
            ]}
            strategyBuilderString={this.props.strategyBuilderString}
            changeStrategyBuilderString={this.props.changeStrategyBuilderString}
            weightPercentage={this.props.curItem.percentage}
          />
        </BackTestBuilderBlock>
        {/* ) : null} */}
        <div
          className={`strategy-builder-block-container-parent ${
            this.state.isItemCollapsedWeight
              ? "strategy-builder-block-container-parent-collapsed"
              : ""
          }`}
        >
          <BackTestBuilderMainBlock
            copiedItem={this.props.copiedItem}
            setCopiedItem={this.props.setCopiedItem}
            shouldOpenPopUpBlocks={this.props.shouldOpenPopUpBlocks}
            innerWidth={this.props.innerWidth}
            saveStrategyName={this.props.saveStrategyName}
            // FIXED
            emptyItems={this.props.emptyItems}
            strategyBuilderString={this.props.strategyBuilderString}
            changeStrategyBuilderPopUpString={
              this.props.changeStrategyBuilderPopUpString
            }
            changeStrategyBuilderString={this.props.changeStrategyBuilderString}
            strategyBuilderStringOpenPopUp={
              this.props.strategyBuilderStringOpenPopUp
            }
            // FIXED

            blocks={this.props.curItem.item}
            path={[
              ...this.props.path,
              this.props.passedKey,
              "weight_item",
              this.props.curItemIndex,
              "item",
            ]}
            blockLevel={this.props.blockLevel + 1}
            weightPath={this.props.tempWeightPath}
            weightIndex={this.props.curItemIndex}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BackTestBuildeWeightItem);
