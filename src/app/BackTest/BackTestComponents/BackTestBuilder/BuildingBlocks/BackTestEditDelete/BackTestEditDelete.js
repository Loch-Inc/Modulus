import { Image } from "react-bootstrap";
import {
  CopyClipboardIcon,
  StrategyBuilderAddCircleIcon,
  StrategyBuilderDeleteIcon,
  StrategyBuilderPencilIcon,
} from "../../../../../../assets/images/icons";
import { BaseReactComponent } from "../../../../../../utils/form";
import { mobileCheck } from "../../../../../../utils/ReusableFunctions";
import "./_backTestEditDelete.scss";

class BackTestEditDelete extends BaseReactComponent {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: mobileCheck(),
    };
  }

  render() {
    return (
      <div
        className={`sbb-edit-delete-options ${
          this.state.isMobile ? "sbb-edit-delete-options-mobile" : ""
        }`}
      >
        {this.props.hideAddBtn ? null : (
          <div
            onClick={this.props.onAddClick}
            className="sbb-edit-delete-options-block sbb-edit-delete-options-add"
          >
            <Image
              className="sbb-edit-delete-options-block-image sbb-edit-delete-options-edit-image"
              src={StrategyBuilderAddCircleIcon}
            />
          </div>
        )}
        {this.props.hideEditBtn ? null : (
          <div
            onClick={this.props.onEditClick}
            className="sbb-edit-delete-options-block sbb-edit-delete-options-edit"
          >
            <Image
              className="sbb-edit-delete-options-block-image sbb-edit-delete-options-edit-image"
              src={StrategyBuilderPencilIcon}
            />
          </div>
        )}
        {this.props.hideCopyBtn ? null : (
          <div
            onClick={this.props.onCopyClick}
            className="sbb-edit-delete-options-block sbb-edit-delete-options-copy"
          >
            <Image
              className="sbb-edit-delete-options-block-image sbb-edit-delete-options-copy-image"
              src={CopyClipboardIcon}
            />
          </div>
        )}
        {this.props.hideDeleteBtn ? null : (
          <div
            onClick={this.props.onDeleteClick}
            className="sbb-edit-delete-options-block sbb-edit-delete-options-delete"
          >
            <Image
              className="sbb-edit-delete-options-block-image sbb-edit-delete-options-delete-image"
              src={StrategyBuilderDeleteIcon}
            />
          </div>
        )}
      </div>
    );
  }
}

export default BackTestEditDelete;
