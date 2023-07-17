import {
  MinimalRouterStateSnapshot,
  RouterReducerState,
  getSelectors,
} from '@ngrx/router-store';
import { createFeatureSelector } from '@ngrx/store';

export const ROUTER_FEATURE_KEY = 'router';

export const routerFeatureState =
  createFeatureSelector<RouterReducerState<MinimalRouterStateSnapshot>>(
    ROUTER_FEATURE_KEY
  );

export const getRouterParams =
  getSelectors(routerFeatureState).selectRouteParam;
