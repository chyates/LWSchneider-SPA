// export const ROTATE_ONCE = 'windstop:rotateOnce';

export const rotateOnce = () => ({
  type: 'ROTATE_ONCE',
});
export const scaleWindstop = () => ({
  type: 'SET_SCALE'
});
export const revertWindstop = () => ({
  type: 'REVERT_SCALE'
})