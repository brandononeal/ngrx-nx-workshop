import { GlobalState } from './product.reducer';

/**
 * Selector for products data
 */
export function getProducts(state: GlobalState) {
  return state.product.products;
}
