import Highcharts from "highcharts/highstock";
import { BaseReactComponent } from "../../../../../utils/form";
import { isArrayInArrayOfArrays } from "../../../../../utils/ReusableFunctions";
// import "./_backTestBuilder.scss";
import BackTestBuilderBlock from "../Components/BackTestBuilderBlock/BackTestBuilderBlock";

import { connect } from "react-redux";
import { createBackTestQuery } from "../../../Api/BackTestApi";
import BackTestAssetBuilderBlock from "../Components/BackTestAssetBuilderBlock/BackTestAssetBuilderBlock";
import BackTestConditionBuilderBlock from "../Components/BackTestConditionBuilderBlock/BackTestConditionBuilderBlock";
import "./_backTestBuilderMainBlock.scss";
import BackTestBuildeWeightItem from "./BackTestBuildeWeightItem";
import {
  BuilderToggleCollapseElse,
  BuilderToggleCollapseIf,
} from "src/utils/AnalyticsFunctions";
import { getModulusUser } from "src/utils/ManageToken";

require("highcharts/modules/annotations")(Highcharts);

class BackTestBuilderMainBlock extends BaseReactComponent {
  constructor(props) {
    super(props);

    this.state = {
      isItemCollapsedWeight: false,
      isItemCollapsedIf: false,
      isItemCollapsedElse: false,
    };
  }
  toggleCollapseWeight = (e) => {
    e.stopPropagation();
    this.setState({ isItemCollapsedWeight: !this.state.isItemCollapsedWeight });
  };
  toggleCollapseIf = (e) => {
    const modulusUser = getModulusUser();
    if (modulusUser && modulusUser.email) {
      BuilderToggleCollapseIf({
        email_address: modulusUser.email,
        isCollapsed: !this.state.isItemCollapsedIf,
      });
    }
    e.stopPropagation();
    this.setState({ isItemCollapsedIf: !this.state.isItemCollapsedIf });
  };
  toggleCollapseElse = (e) => {
    const modulusUser = getModulusUser();
    if (modulusUser && modulusUser.email) {
      BuilderToggleCollapseElse({
        email_address: modulusUser.email,
        isCollapsed: !this.state.isItemCollapsedElse,
      });
    }
    e.stopPropagation();
    this.setState({ isItemCollapsedElse: !this.state.isItemCollapsedElse });
  };
  openCollapseWeight = () => {
    this.setState({ isItemCollapsedWeight: false });
  };
  openCollapseIf = () => {
    this.setState({ isItemCollapsedIf: false });
  };
  openCollapseElse = () => {
    this.setState({ isItemCollapsedElse: false });
  };

  render() {
    return Object.entries(this.props.blocks).map(([key, block]) => {
      let tempWeightPath = [];
      if (key === "weight") {
        tempWeightPath = [...this.props.path];

        return (
          <>
            {/* <BackTestBuilderBlock
            innerWidth={this.props.innerWidth}
              openCollapse={this.openCollapseWeight}
              //WEIGHT
              weightPath={tempWeightPath}
              weightIndex={this.props.weightIndex}
              //WEIGHT

              passedClass="strategy-builder-block-container-weight"
              blockLevel={this.props.blockLevel}
              blockType="weight"
              showDropDown
              path={[...this.props.path]}
              strategyBuilderStringOpenPopUp={this.props.strategyBuilderStringOpenPopUp}
              strategyBuilderString={this.props.strategyBuilderString}
              changeStrategyBuilderPopUpString={this.props.changeStrategyBuilderPopUpString}
              changeStrategyBuilderString={
                this.props.changeStrategyBuilderString
              }
              isError={isArrayInArrayOfArrays(
                [...this.props.path, key],
                this.props.emptyItems
              )}
              isItemCollapsed={this.state.isItemCollapsedWeight}
              toggleCollapse={this.toggleCollapseWeight}
            ></BackTestBuilderBlock> */}

            {this.props.blocks?.weight?.weight_item?.map(
              (curItem, curItemIndex) => (
                <BackTestBuildeWeightItem
                  copiedItem={this.props.copiedItem}
                  setCopiedItem={this.props.setCopiedItem}
                  shouldOpenPopUpBlocks={this.props.shouldOpenPopUpBlocks}
                  curItem={curItem}
                  key={key + curItemIndex}
                  passedKey={key}
                  path={this.props.path}
                  strategyBuilderStringOpenPopUp={
                    this.props.strategyBuilderStringOpenPopUp
                  }
                  strategyBuilderString={this.props.strategyBuilderString}
                  changeStrategyBuilderPopUpString={
                    this.props.changeStrategyBuilderPopUpString
                  }
                  changeStrategyBuilderString={
                    this.props.changeStrategyBuilderString
                  }
                  tempWeightPath={tempWeightPath}
                  curItemIndex={curItemIndex}
                  blockLevel={this.props.blockLevel}
                  innerWidth={this.props.innerWidth}
                  saveStrategyName={this.props.saveStrategyName}
                  emptyItems={this.props.emptyItems}
                  isError={isArrayInArrayOfArrays(
                    [...this.props.path, key],
                    this.props.emptyItems
                  )}
                />
                // <div
                //   className={`strategy-builder-block-container-parent ${
                //     this.state.isItemCollapsedWeight
                //       ? "strategy-builder-block-container-parent-collapsed"
                //       : ""
                //   }`}
                // >
                //   {/* {block.weight_type === "SPECIFIED" ? ( */}
                //   <BackTestBuilderBlock
                //     innerWidth={this.props.innerWidth}
                //     //WEIGHT
                //     weightPath={tempWeightPath}
                //     weightIndex={curItemIndex}
                //     //WEIGHT
                //     passedClass="strategy-builder-block-container-weight"
                //     blockLevel={this.props.blockLevel}
                //     blockType="weight percentage"
                //     showDropDown
                //     path={[
                //       ...this.props.path,
                //       key,
                //       "weight_item",
                //       curItemIndex,
                //     ]}
                // strategyBuilderStringOpenPopUp={this.props.strategyBuilderStringOpenPopUp}
                //     strategyBuilderString={this.props.strategyBuilderString}
                // changeStrategyBuilderPopUpString={this.props.changeStrategyBuilderPopUpString}
                //     changeStrategyBuilderString={
                //       this.props.changeStrategyBuilderString
                //     }
                //   >
                //     <BackTestWeightPercentageBlock
                //       path={[
                //         ...this.props.path,
                //         key,
                //         "weight_item",
                //         curItemIndex,
                //       ]}
                // strategyBuilderStringOpenPopUp={this.props.strategyBuilderStringOpenPopUp}
                //       strategyBuilderString={this.props.strategyBuilderString}
                // changeStrategyBuilderPopUpString={this.props.changeStrategyBuilderPopUpString}
                //       changeStrategyBuilderString={
                //         this.props.changeStrategyBuilderString
                //       }
                //       weightPercentage={curItem.percentage}
                //     />
                //   </BackTestBuilderBlock>
                //   {/* ) : null} */}
                //   <BackTestBuilderMainBlock
                //     innerWidth={this.props.innerWidth}
                //     saveStrategyName={this.props.saveStrategyName}
                //     // FIXED
                //     emptyItems={this.props.emptyItems}
                // strategyBuilderStringOpenPopUp={this.props.strategyBuilderStringOpenPopUp}
                //     strategyBuilderString={this.props.strategyBuilderString}
                // changeStrategyBuilderPopUpString={this.props.changeStrategyBuilderPopUpString}
                //     changeStrategyBuilderString={
                //       this.props.changeStrategyBuilderString
                //     }
                //     // FIXED

                //     blocks={curItem.item}
                //     path={[
                //       ...this.props.path,
                //       key,
                //       "weight_item",
                //       curItemIndex,
                //       "item",
                //     ]}
                //     blockLevel={this.props.blockLevel + 1}
                //     weightPath={tempWeightPath}
                //     weightIndex={curItemIndex}
                //   />
                // </div>
              )
            )}
            {/* <BackTestBuilderBlock
            innerWidth={this.props.innerWidth}
              //WEIGHT
              weightPath={tempWeightPath}
              weightIndex={weightIndex}
              //WEIGHT

              passedClass="strategy-builder-block-container-add-item"
              blockLevel={blockLevel}
              blockType="add item"
              path={[...path]}
              strategyBuilderStringOpenPopUp={this.props.strategyBuilderStringOpenPopUp}
              strategyBuilderString={this.props.strategyBuilderString}
              changeStrategyBuilderPopUpString={this.props.changeStrategyBuilderPopUpString}
              changeStrategyBuilderString={this.props.changeStrategyBuilderString}
            /> */}
          </>
        );
      } else if (key === "asset") {
        return (
          <BackTestBuilderBlock
            copiedItem={this.props.copiedItem}
            setCopiedItem={this.props.setCopiedItem}
            innerWidth={this.props.innerWidth}
            //WEIGHT
            weightPath={this.props.weightPath}
            weightIndex={this.props.weightIndex}
            //WEIGHT

            passedClass="strategy-builder-block-container-asset"
            blockLevel={this.props.blockLevel}
            blockType="asset"
            parentPath={this.props.path}
            path={[...this.props.path, key]}
            strategyBuilderStringOpenPopUp={
              this.props.strategyBuilderStringOpenPopUp
            }
            strategyBuilderString={this.props.strategyBuilderString}
            changeStrategyBuilderPopUpString={
              this.props.changeStrategyBuilderPopUpString
            }
            changeStrategyBuilderString={this.props.changeStrategyBuilderString}
            tokenList={block.tokenList}
          >
            <BackTestAssetBuilderBlock
              shouldOpenPopUpBlocks={this.props.shouldOpenPopUpBlocks}
              saveStrategyName={this.props.saveStrategyName}
              tokenList={block.tokenList}
              strategyBuilderStringOpenPopUp={
                this.props.strategyBuilderStringOpenPopUp
              }
              strategyBuilderString={this.props.strategyBuilderString}
              changeStrategyBuilderPopUpString={
                this.props.changeStrategyBuilderPopUpString
              }
              changeStrategyBuilderString={
                this.props.changeStrategyBuilderString
              }
              path={[...this.props.path]}
              selectedAsset={this.props.blocks.asset}
              //WEIGHT
              weightPath={this.props.weightPath}
              weightIndex={this.props.weightIndex}
              //WEIGHT
            />
          </BackTestBuilderBlock>
        );
      } else if (key === "condition") {
        return (
          <>
            <>
              <BackTestBuilderBlock
                copiedItem={this.props.copiedItem}
                setCopiedItem={this.props.setCopiedItem}
                innerWidth={this.props.innerWidth}
                openCollapse={this.openCollapseIf}
                //WEIGHT
                weightPath={this.props.weightPath}
                weightIndex={this.props.weightIndex}
                //WEIGHT
                passedClass="strategy-builder-block-container-condition-if"
                blockLevel={this.props.blockLevel}
                blockType="condition if"
                showDropDown
                strategyBuilderStringOpenPopUp={
                  this.props.strategyBuilderStringOpenPopUp
                }
                strategyBuilderString={this.props.strategyBuilderString}
                path={[...this.props.path]}
                changeStrategyBuilderPopUpString={
                  this.props.changeStrategyBuilderPopUpString
                }
                changeStrategyBuilderString={
                  this.props.changeStrategyBuilderString
                }
                isError={isArrayInArrayOfArrays(
                  [...this.props.path, key, "success"],
                  this.props.emptyItems
                )}
                isItemCollapsed={this.state.isItemCollapsedIf}
                toggleCollapse={this.toggleCollapseIf}
              >
                <BackTestConditionBuilderBlock
                  shouldOpenPopUpBlocks={this.props.shouldOpenPopUpBlocks}
                  saveStrategyName={this.props.saveStrategyName}
                  compare_type={block.compare_type}
                  amount={block.amount}
                  operator={block.operator}
                  time_period={block.time_period}
                  token={block.token}
                  type={block.type}
                  function_type={
                    block.compare_function?.type
                      ? block.compare_function?.type
                      : ""
                  }
                  function_time_period={
                    block.compare_function?.time_period
                      ? block.compare_function?.time_period
                      : ""
                  }
                  function_token={
                    block.compare_function?.token
                      ? block.compare_function?.token
                      : ""
                  }
                  path={[...this.props.path, key]}
                  strategyBuilderStringOpenPopUp={
                    this.props.strategyBuilderStringOpenPopUp
                  }
                  strategyBuilderString={this.props.strategyBuilderString}
                  changeStrategyBuilderPopUpString={
                    this.props.changeStrategyBuilderPopUpString
                  }
                  changeStrategyBuilderString={
                    this.props.changeStrategyBuilderString
                  }
                  //WEIGHT
                  weightPath={this.props.weightPath}
                  weightIndex={this.props.weightIndex}
                  //WEIGHT
                />
              </BackTestBuilderBlock>
              {block.success &&
              Object.keys(block.success) &&
              Object.keys(block.success).length > 0 ? (
                <div
                  className={`strategy-builder-block-container-parent ${
                    this.state.isItemCollapsedIf
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
                    strategyBuilderStringOpenPopUp={
                      this.props.strategyBuilderStringOpenPopUp
                    }
                    strategyBuilderString={this.props.strategyBuilderString}
                    changeStrategyBuilderPopUpString={
                      this.props.changeStrategyBuilderPopUpString
                    }
                    changeStrategyBuilderString={
                      this.props.changeStrategyBuilderString
                    }
                    // FIXED

                    blocks={block.success}
                    path={[...this.props.path, key, "success"]}
                    blockLevel={this.props.blockLevel + 1}
                    weightPath={tempWeightPath}
                    weightIndex={this.props.weightIndex}
                  />
                </div>
              ) : null}
            </>

            <>
              <BackTestBuilderBlock
                copiedItem={this.props.copiedItem}
                setCopiedItem={this.props.setCopiedItem}
                innerWidth={this.props.innerWidth}
                openCollapse={this.openCollapseElse}
                //WEIGHT
                weightPath={tempWeightPath}
                weightIndex={this.props.weightIndex}
                //WEIGHT
                passedClass="strategy-builder-block-container-condition-else"
                blockLevel={this.props.blockLevel}
                blockType="condition else"
                path={[...this.props.path, key]}
                strategyBuilderStringOpenPopUp={
                  this.props.strategyBuilderStringOpenPopUp
                }
                strategyBuilderString={this.props.strategyBuilderString}
                changeStrategyBuilderPopUpString={
                  this.props.changeStrategyBuilderPopUpString
                }
                changeStrategyBuilderString={
                  this.props.changeStrategyBuilderString
                }
                isError={isArrayInArrayOfArrays(
                  [...this.props.path, key, "failed"],
                  this.props.emptyItems
                )}
                showDropDown
                isItemCollapsed={this.state.isItemCollapsedElse}
                toggleCollapse={this.toggleCollapseElse}
              />
              {block.failed &&
              Object.keys(block.failed) &&
              Object.keys(block.failed).length > 0 ? (
                <div
                  className={`strategy-builder-block-container-parent ${
                    this.state.isItemCollapsedElse
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
                    strategyBuilderStringOpenPopUp={
                      this.props.strategyBuilderStringOpenPopUp
                    }
                    strategyBuilderString={this.props.strategyBuilderString}
                    changeStrategyBuilderPopUpString={
                      this.props.changeStrategyBuilderPopUpString
                    }
                    changeStrategyBuilderString={
                      this.props.changeStrategyBuilderString
                    }
                    // FIXED

                    blocks={block.failed}
                    path={[...this.props.path, key, "failed"]}
                    blockLevel={this.props.blockLevel + 1}
                    weightPath={tempWeightPath}
                    weightIndex={this.props.weightIndex}
                  />
                </div>
              ) : null}
            </>
          </>
        );
      } else {
        return null;
      }
    });
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = { createBackTestQuery };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BackTestBuilderMainBlock);
