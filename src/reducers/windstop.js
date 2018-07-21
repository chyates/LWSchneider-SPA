const windstopDefaultState = {
  rotate: 0,
  rotating: false,
}

export default (state = windstopDefaultState, action) => {
  switch (action.type) {
    case 'ROTATE_ONCE':
      return {
        ...state,
        rotate: state.rotate += 15
      }
    case 'SET_SCALE':
      return {
        ...state,
        height: '200vh',
        rotating: true
      }
    case 'REVERT_SCALE':
      return {
        ...state,
        rotate: 0,
        rotating: false,
        height: '91.69vh'
      }
    default:
      return state;
  }
}
