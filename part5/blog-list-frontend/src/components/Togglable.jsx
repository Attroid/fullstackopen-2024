import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";

const propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  // https://stackoverflow.com/questions/42122522/reactjs-what-should-the-proptypes-be-for-this-props-children
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

const Togglable = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);

  useImperativeHandle(
    ref,
    () => ({
      toggleVisibility: () => setOpen((value) => !value),
    }),
    []
  );

  if (!open) {
    return <button onClick={() => setOpen(true)}>{props.buttonLabel}</button>;
  }

  return (
    <>
      <div>{props.children}</div>
      <button onClick={() => setOpen(false)}>cancel</button>
    </>
  );
});

Togglable.propTypes = propTypes;
Togglable.displayName = "Togglable";

export default Togglable;
