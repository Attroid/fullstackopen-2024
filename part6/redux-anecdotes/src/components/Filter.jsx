import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);

  const handleChange = (ev) => {
    const { value } = ev.target;

    dispatch(changeFilter(value));
  };

  return (
    <div style={{ marginBottom: 10 }}>
      filter <input value={filter} onChange={handleChange} />
    </div>
  );
};

export default Filter;
