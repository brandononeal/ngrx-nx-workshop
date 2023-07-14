import { GlobalState } from './reducer';

/**
 * Selector for products data
 */
export function getProducts(state: GlobalState) {
  return state.product.products;
}
