import { useState, forwardRef, useImperativeHandle } from "react";

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

export default Togglable;
