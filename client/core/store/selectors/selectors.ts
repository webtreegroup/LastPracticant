import { StoreProps } from '../store.types';

export const loaderSelector = (store: StoreProps) => ({
    isVisible: store.loader,
});
