// export const ROTATE_ONCE = 'windstop:rotateOnce';

export const rotateOnce = direction => ({
  type: 'ROTATE_ONCE',
  direction
});
export const scaleWindstop = () => ({
  type: 'SET_SCALE'
});
export const revertWindstop = () => ({
  type: 'REVERT_SCALE'
})