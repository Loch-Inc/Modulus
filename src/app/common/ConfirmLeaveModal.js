import { Button, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import BaseReactComponent from "../../utils/form/BaseReactComponent";
import { mobileCheck } from "../../utils/ReusableFunctions";

class ConfirmLeaveModal extends BaseReactComponent {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: mobileCheck(),
      show: props.show,
    };
  }

  render() {
    return (
      <Modal
        show={this.state.show}
        className={`confirm-leave-modal ${
          this.state.isMobile ? "" : "zoomedElements"
        }`}
        // backdrop="static"
        onHide={this.props.handleClose}
        centered
        backdropClassName="confirmLeaveModal"
      >
        <Modal.Body>
          <div className="leave-modal-body">
            <p className="inter-display-medium f-s-20 lh-24 m-b-30 invertTextColor">
              {this.props.customMessage
                ? this.props.customMessage
                : "Are you sure you want to leave?"}
            </p>
            <div className="leave-modal-btn-section">
              <Button
                className="secondary-btn m-r-24 main-button btn-bg-white-outline-black"
                onClick={this.props.handleAccept}
              >
                {this.props.agreeText ? this.props.agreeText : "Yes"}
              </Button>
              <Button className="primary-btn" onClick={this.props.handleClose}>
                {this.props.disagreeText ? this.props.disagreeText : "No"}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmLeaveModal);
