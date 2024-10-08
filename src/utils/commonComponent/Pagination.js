import PropTypes from "prop-types";
import React from "react";
import { Image } from "react-bootstrap";
import { PagePrevIcon, PageNextIcon } from "../../assets/images/icons";

const Pagination = (props) => {
  React.useEffect(() => {
    var pageNo = document.getElementById("pageNo");
    pageNo.value = props.page;
  }, [props.page]);

  const [input, setInput] = React.useState(props.page);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSubumit(props);
    }
  };
  const onSubumit = (props) => {
    if (props.onPageChange) {
      props.onPageChange();
    }
    var pageNo = document.getElementById("pageNo");
    if (input <= 0) {
      const params = new URLSearchParams(props.location.search);
      params.set("p", 0);
      props.history.push(`${props.history.location.pathname}?${params}`);
      pageNo.value = 1;
    } else if (input < props.pageCount) {
      const params = new URLSearchParams(props.location.search);
      params.set("p", input - 1);
      props.history.push(`${props.history.location.pathname}?${params}`);
    } else {
      const params = new URLSearchParams(props.location.search);
      params.set("p", props.pageCount - 1);
      props.history.push(`${props.history.location.pathname}?${params}`);
      pageNo.value = props.pageCount;
    }
  };

  const onLeftClick = (props) => {
    if (props.onPageChange) {
      props.onPageChange();
    }
    var pageNo = document.getElementById("pageNo");
    //  TransactionHistoryPageBack({
    //    session_id: getCurrentUser().id,
    //    email_address: getCurrentUser().email,
    //    page_no: pageNo,
    //  });
    // console.log("back", pageNo)
    if (props.noUrl) {
      props.loadData(props.page - 1);
    } else {
      if (props.page > 1) {
        const params = new URLSearchParams(props.location.search);
        params.set("p", props.page - 2);
        props.history.push(`${props.history.location.pathname}?${params}`);
        // props.loadData(props.page - 1);
        pageNo.value = props.page - 1;
      }
    }
  };

  const onNextClick = (props) => {
    if (props.onPageChange) {
      props.onPageChange();
    }
    var pageNo = document.getElementById("pageNo");
    // TransactionHistoryPageNext({
    //   session_id: getCurrentUser().id,
    //   email_address: getCurrentUser().email,
    //   page_no: pageNo,
    // });
    // console.log("next", pageNo);
    if (props.noUrl) {
      props.loadData(props.page + 1);
    } else {
      if (props.page < props.pageCount) {
        const params = new URLSearchParams(props.location.search);
        params.set("p", props.page);
        props.history.push(`${props.history.location.pathname}?${params}`);
        // props.loadData(props.page + 1);
        pageNo.value = props.page + 1;
      }
    }
  };

  return (
    <div className="pagination-wrapper">
      <Image
        src={props.pagePrev ? props.pagePrev : PagePrevIcon}
        onClick={() => onLeftClick(props)}
        className="left-arrow"
      />
      <h5 className="inter-display-medium f-s-14">
        <input
          type="number"
          name="pagenumber"
          id="pageNo"
          defaultValue={props.page}
          onChange={(event) => {
            setInput(event.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
        of {props.pageCount}
      </h5>
      <Image
        src={props.pageNext ? props.pageNext : PageNextIcon}
        onClick={() => onNextClick(props)}
        className="right-arrow"
      />
    </div>
  );
};

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  loadData: PropTypes.func,
};
export default Pagination;
