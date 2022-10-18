import { StoreGameProps } from '../store.types';

export const GAME_OVER = 'GAME_OVER';
export const GAME_PAUSE = 'GAME_PAUSE';
export const GAME_NEXT_LEVEL = 'GAME_NEXT_LEVEL';
export const GAME_RESET = 'GAME_RESET';

export const gameOverAction = (payload: StoreGameProps) => ({
    type: GAME_OVER,
    payload,
});

export const gamePauseAction = (payload: StoreGameProps) => ({
    type: GAME_PAUSE,
    payload,
});

export const gameNextLevelAction = (payload: boolean) => ({
    type: GAME_NEXT_LEVEL,
    payload,
});

export const gameResetAction = () => ({
    type: GAME_RESET,
});
