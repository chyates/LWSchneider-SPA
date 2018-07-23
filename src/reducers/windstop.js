const windstopDefaultState = {
  rotate: 0,
  rotating: false,
}
const baseHeight = () => (
  (window.innerWidth < 992) ? '91.69vw' : '91.69vh'
)
const zoomHeight = () => (
  (window.innerWidth < 992) ? '200vw' : '200vh'
)
export default (state = windstopDefaultState, action) => {
  switch (action.type) {
    case 'ROTATE_ONCE':
      return {
        ...state,
        rotate: state.rotate += (action.direction >= 0) ? 15 : -15
      }
    case 'SET_SCALE':
      return {
        ...state,
        height: zoomHeight(),
        rotating: true
      }
    case 'REVERT_SCALE':
      return {
        ...state,
        rotate: 0,
        rotating: false,
        height: baseHeight()
      }
    default:
      return state;
  }
}
