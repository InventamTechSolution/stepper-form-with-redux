const initialState = {
  goSteps: 0,
  allDetail: {},
};

export default function common(state = initialState, action) {
  switch (action.type) {
    case "SET_GO_STEPS": {
      return {
        ...state,
        goSteps: action.payload,
      };
    }
    case "BASIC_INFO": {
      return {
        ...state,
        allDetail: { ...state.allDetail, ...action.payload },
      };
    }
    default: {
      return state;
    }
  }
}
