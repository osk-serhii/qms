import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";


function SideOverlap(props) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (props.open) {
      document.getElementsByTagName("body")[0].classList.add("overflow-hidden");
    } else {
      document
        .getElementsByTagName("body")[0]
        .classList.remove("overflow-hidden");
    }

    return () => {
      document
        .getElementsByTagName("body")[0]
        .classList.remove("overflow-hidden");
    };
  }, [props.open]);

  const clickOutSide = (e) => {
    if (!props.backdrop) return;
    if (containerRef.current && e.target !== containerRef.current) return;

    e.stopPropagation();
    props.onClose();
  };

  if (!props.open) return null;

  return ReactDOM.createPortal(
    <div
      className="h-screen w-screen z-20 fixed left-0 top-0 bg-black bg-opacity-70 flex justify-end"
      onClick={clickOutSide}
      ref={containerRef}
    >
      <div className="bg-white h-full relative" style={{ width: props.width }}>
        {props.showClose &&
          <FontAwesomeIcon
            className="absolute right-3 top-3 text-white text-xl cursor-pointer"
            style={props.closeIconStyles}
            icon={faClose}
            onClick={props.onClose} />
        }
        {props.children}
      </div>
    </div>,
    document.getElementById("sideoverlap-root")
  );
}

SideOverlap.propTypes = {
  children: PropTypes.any,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  open: PropTypes.bool,
  onClose: PropTypes.func,
  backdrop: PropTypes.bool,
  showClose: PropTypes.bool,
  closeIconStyles: PropTypes.object,
};

SideOverlap.defaultProps = {
  open: true,
  width: 320,
  onClose: () => {},
  backdrop: true,
  showClose: false,
  closeIconStyles: {},
};

export default SideOverlap;
