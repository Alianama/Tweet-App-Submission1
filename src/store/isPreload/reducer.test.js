/**
 * test scenarios for isPreloadReducer
 *
 * - isPreloadReducer function
 *   - should return initial state when given unknown action type
 *   - should return false when action type is SET_IS_PRELOAD with payload false
 *   - should return true when action type is SET_IS_PRELOAD with payload true
 */

import { describe, it, expect } from 'vitest';
import isPreloadReducer from './reducer';
import { ActionType } from './action';

describe('isPreloadReducer', () => {
  it('should return initial state when given unknown action type', () => {
    const initialState = true;
    const action = { type: 'UNKNOWN' };
    const nextState = isPreloadReducer(initialState, action);
    expect(nextState).toBe(initialState);
  });

  it('should return false when action type is SET_IS_PRELOAD with payload false', () => {
    const initialState = true;
    const action = {
      type: ActionType.SET_IS_PRELOAD,
      payload: { isPreload: false },
    };
    const nextState = isPreloadReducer(initialState, action);
    expect(nextState).toBe(false);
  });

  it('should return true when action type is SET_IS_PRELOAD with payload true', () => {
    const initialState = false;
    const action = {
      type: ActionType.SET_IS_PRELOAD,
      payload: { isPreload: true },
    };
    const nextState = isPreloadReducer(initialState, action);
    expect(nextState).toBe(true);
  });

  it('should return initial state when state is undefined and unknown action', () => {
    const action = { type: 'UNKNOWN' };
    const nextState = isPreloadReducer(undefined, action);
    expect(nextState).toBe(true);
  });
});
