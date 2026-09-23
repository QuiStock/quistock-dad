import type { IIdAndName } from './global'

export interface IGetStoresResponse {
  data: { stores: IIdAndName[]; totalCount: number }
}
