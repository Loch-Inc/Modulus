import { Image } from "react-bootstrap";
import OutsideClickHandler from "react-outside-click-handler";
import { compareTwoArrayOfStrings } from "src/utils/ReusableFunctions";
import {
  CheckBoldIcon,
  CheckIcon,
  StrategyChartDropdownArrowIcon,
} from "../../../../../assets/images/icons";
import { BaseReactComponent } from "../../../../../utils/form";
import "./_backTestStrategyDropdown.scss";

class BackTestStrategyDropdown extends BaseReactComponent {
  constructor(props) {
    super(props);

    this.state = {
      isDropdownOpen: false,
      inputValue: "",

      searchOptions: [],
      selectedOptions: [],
      selectedOptionsIcons: [],
    };
  }

  componentDidMount() {
    if (this.props.selectedOption) {
      this.setState({
        selectedOptions: [...this.props.selectedOption],
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedOptions !== this.state.selectedOptions) {
      this.setState({
        selectedOptionsIcons: this.props.allOptions.filter(
          (option) =>
            this.state.selectedOptions.includes(option.name) ||
            this.state.selectedOptions.includes(option.alt)
        ),
      });
    }
    if (prevProps.selectedOption !== this.props.selectedOption) {
      this.setState({
        selectedOptions: [...this.props.selectedOption],
      });
    }
    if (
      prevState.inputValue !== this.state.inputValue &&
      this.props.allOptions &&
      this.props.allOptions.length > 0
    ) {
      const searchOptions = this.props.allOptions.filter((item) => {
        return (
          item.name
            .toLowerCase()
            .includes(this.state.inputValue.toLowerCase()) ||
          item.alt.toLowerCase().includes(this.state.inputValue.toLowerCase())
        );
      });

      this.setState({ searchOptions });
    }
  }
  toggleDropdown = () => {
    this.setState({ isDropdownOpen: !this.state.isDropdownOpen });
  };
  closeDropdown = () => {
    if (this.state.isDropdownOpen) {
      this.setState({
        isDropdownOpen: false,
        selectedOptions: [...this.props.selectedOption],
        inputValue: "",
      });
    }
  };
  selectOption = () => {
    if (
      this.props.onOptionSelect &&
      !compareTwoArrayOfStrings(
        this.state.selectedOptions,
        this.props.selectedOption
      )
    ) {
      this.props.onOptionSelect(this.state.selectedOptions);
    }
    this.setState({
      isDropdownOpen: false,
      inputValue: "",
    });
  };
  changeInputValue = (passedInput) => {
    let tempText = passedInput.target.value;

    if (this.props.isInputDropDown) {
      tempText = passedInput.target.value;
      let finalItem = tempText;
      if (isNaN(tempText)) {
        return;
      }
      if (this.props.limitAmounTo) {
        if (this.props.limitAmounTo >= tempText) {
          this.setState({ inputValue: passedInput.target.value }, () => {
            this.itemSelected(finalItem, 0);
          });
        }
      } else {
        this.setState({ inputValue: passedInput.target.value }, () => {
          this.itemSelected(finalItem, 0);
        });
      }
    } else {
      this.setState({ inputValue: tempText });
    }
  };
  itemSelected = (item, index) => {
    let arrSize = this.state.selectedOptions.length;

    if (this.state.selectedOptions.includes(item.name)) {
      this.setState({
        selectedOptions: this.state.selectedOptions.filter(
          (option) => option !== item.name
        ),
      });
    } else {
      if (arrSize < 4) {
        this.setState({
          selectedOptions: [...this.state.selectedOptions, item.name],
        });
      }
    }
  };
  render() {
    return (
      <OutsideClickHandler onOutsideClick={this.closeDropdown}>
        <div className="back-test-strategy-pop-up-dropdown-container">
          <div
            onClick={this.toggleDropdown}
            className="back-test-strategy-pop-up-dropdown dotDotText"
          >
            {this.state.selectedOptionsIcons &&
            this.state.selectedOptionsIcons.length > 0 ? (
              <div className="back-test-strategy-pop-up-dropdown-icons-container">
                {this.state.selectedOptionsIcons.map((option, index) => (
                  <div
                    className="back-test-strategy-pop-up-dropdown-icon-container"
                    style={{ backgroundColor: option.iconColor }}
                  >
                    <Image
                      className="back-test-strategy-pop-up-dropdown-icon"
                      src={option.icon}
                    />
                  </div>
                ))}
              </div>
            ) : null}
            <div>
              {this.state.selectedOptions.length}
              <span className="back-test-strategy-pop-up-dropdown-light">
                /4
              </span>{" "}
              Selected
            </div>
            <StrategyChartDropdownArrowIcon className="back-test-strategy-pop-up-dropdown-icon" />
          </div>
          {this.state.isDropdownOpen ? (
            <div className="back-test-strategy-pop-up-dropdown-popup">
              <div className="back-test-strategy-popup-search-container">
                <div className="back-test-strategy-popup-search">
                  <input
                    placeholder="Search asset"
                    className="back-test-strategy-popup-search-input"
                    value={this.state.inputValue}
                    onChange={this.changeInputValue}
                    autoFocus
                  />
                </div>
              </div>
              <div className="back-test-strategy-popup-item-container">
                {this.state.inputValue.length > 0
                  ? this.state.searchOptions.map((option, index) => (
                      <div
                        className={`back-test-strategy-popup-list-item ${
                          this.state.selectedOptions.length >= 4
                            ? "back-test-strategy-popup-list-item-disabled"
                            : ""
                        } ${
                          this.state.selectedOptions.includes(option.name)
                            ? "back-test-strategy-popup-list-item-selected"
                            : ""
                        }`}
                        onClick={() => {
                          this.itemSelected(option, index);
                        }}
                        key={option.name + index}
                      >
                        <div>{option.name}</div>
                        {this.state.selectedOptions.includes(option.name) ? (
                          <Image
                            className="back-test-strategy-popup-list-item-check-icon"
                            src={CheckIcon}
                          />
                        ) : null}
                      </div>
                    ))
                  : this.props.allOptions
                  ? this.props.allOptions.map((option, index) => (
                      <div
                        className={`back-test-strategy-popup-list-item ${
                          this.state.selectedOptions.length >= 4
                            ? "back-test-strategy-popup-list-item-disabled"
                            : ""
                        } ${
                          this.state.selectedOptions.includes(option.name)
                            ? "back-test-strategy-popup-list-item-selected"
                            : ""
                        }`}
                        onClick={() => {
                          this.itemSelected(option, index);
                        }}
                        key={option.name + index}
                      >
                        <div className="back-test-strategy-popup-list-item-icon-name">
                          <div
                            className="back-test-strategy-popup-list-item-icon-container"
                            style={{ backgroundColor: option.iconColor }}
                          >
                            <Image
                              className="back-test-strategy-popup-list-item-icon"
                              src={option.icon}
                            />
                          </div>
                          <div>{option.alt}</div>
                        </div>
                        {this.state.selectedOptions.includes(option.name) ? (
                          <CheckBoldIcon
                            className="back-test-strategy-popup-list-item-check-icon"
                            // src={CheckBoldIcon}
                          />
                        ) : null}
                      </div>
                    ))
                  : null}
              </div>
              <div className={`back-test-strategy-accept-decline-container`}>
                <div
                  className={`back-test-strategy-accept-decline-button back-test-strategy-accept-decline-button-highlighted ${
                    this.state.selectedOptions.length === 0
                      ? "back-test-strategy-accept-decline-button-disabled"
                      : ""
                  }`}
                  onClick={this.selectOption}
                >
                  Apply
                </div>
                <div
                  className="back-test-strategy-accept-decline-button"
                  onClick={this.closeDropdown}
                >
                  Cancel
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </OutsideClickHandler>
    );
  }
}

export default BackTestStrategyDropdown;
