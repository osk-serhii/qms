import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

function FullOverlap(props) {
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
      <div className="bg-white h-full" style={{ width: props.width }}>
        {props.children}
      </div>
    </div>,
    document.getElementById("overlap-root")
  );
}

FullOverlap.propTypes = {
  children: PropTypes.any,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  open: PropTypes.bool,
  onClose: PropTypes.func,
  backdrop: PropTypes.bool
};

FullOverlap.defaultProps = {
  open: true,
  width: 320,
  onClose: () => {},
  backdrop: true
};

export default FullOverlap;
