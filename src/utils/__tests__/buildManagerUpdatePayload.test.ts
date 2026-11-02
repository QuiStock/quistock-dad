import { describe, expect, it } from 'vitest'

import type { IManager } from '@/types'
import {
  buildManagerUpdatePayload,
  isEmptyManagerUpdatePayload,
} from '@/utils/buildManagerUpdatePayload'
import { validateManagerUpdatePayload } from '@/utils/validateForms'

const activeManager: IManager = {
  id: '7',
  name: 'Demo Gerente 04',
  email: 'finalv1.usuario.08@quistock.test',
  role: 'MANAGER',
  status: 'ACTIVE',
  profile_photo_url: null,
  store_id: 810000504,
  store_code: 'FIL504',
  store_name: 'Filial 504',
  region_id: 3,
  region_code: 'REGION-NORTH',
  region_name: 'REGION-NORTH',
}

const unchanged = {
  name: activeManager.name,
  email: activeManager.email,
  status: activeManager.status,
  store_id: activeManager.store_id ?? undefined,
}

describe('buildManagerUpdatePayload', () => {
  it('deactivates sending only status, never store_id', () => {
    const payload = buildManagerUpdatePayload(activeManager, {
      ...unchanged,
      status: 'INACTIVE',
    })

    expect(payload).toEqual({ status: 'INACTIVE' })
    expect(validateManagerUpdatePayload(payload)).toEqual({})
  })

  it('sends replacement_manager_id only together with deactivation', () => {
    expect(
      buildManagerUpdatePayload(activeManager, {
        ...unchanged,
        status: 'INACTIVE',
        replacement_manager_id: 42,
      }),
    ).toEqual({ status: 'INACTIVE', replacement_manager_id: 42 })

    expect(
      buildManagerUpdatePayload(activeManager, {
        ...unchanged,
        replacement_manager_id: 42,
      }),
    ).toEqual({})
  })

  it('requires store_id when reactivating, even if unchanged', () => {
    expect(
      buildManagerUpdatePayload(
        { ...activeManager, status: 'INACTIVE' },
        { ...unchanged, status: 'ACTIVE' },
      ),
    ).toEqual({ status: 'ACTIVE', store_id: 810000504 })
  })

  it('sends only changed fields for an active manager', () => {
    expect(
      buildManagerUpdatePayload(activeManager, {
        ...unchanged,
        name: '  Novo Nome ',
        email: 'NOVO@Quistock.test',
        store_id: 17,
      }),
    ).toEqual({ name: 'Novo Nome', email: 'novo@quistock.test', store_id: 17 })
  })

  it('returns an empty payload when nothing changed', () => {
    const payload = buildManagerUpdatePayload(activeManager, unchanged)
    expect(isEmptyManagerUpdatePayload(payload)).toBe(true)
    expect(validateManagerUpdatePayload(payload).payload).toBeDefined()
  })

  it('edits an inactive manager without touching the store', () => {
    expect(
      buildManagerUpdatePayload(
        { ...activeManager, status: 'INACTIVE' },
        { ...unchanged, status: 'INACTIVE', name: 'Outro' },
      ),
    ).toEqual({ name: 'Outro' })
  })
})

describe('validateManagerUpdatePayload contract rules', () => {
  it('rejects store_id with INACTIVE and replacement without INACTIVE', () => {
    expect(
      validateManagerUpdatePayload({ status: 'INACTIVE', store_id: 17 })
        .store_id,
    ).toBeDefined()
    expect(
      validateManagerUpdatePayload({ name: 'X', replacement_manager_id: 42 })
        .replacement_manager_id,
    ).toBeDefined()
  })
})
