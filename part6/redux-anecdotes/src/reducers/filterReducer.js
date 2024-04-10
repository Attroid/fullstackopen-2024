const CHANGE = "filterReducer/change";

const filterReducer = (state = "", action) => {
  switch (action.type) {
    case CHANGE: {
      const { value } = action.payload;

      return value;
    }

    default: {
      return state;
    }
  }
};

export const changeFilter = (value) => ({
  type: CHANGE,
  payload: { value },
});

export default filterReducer;
