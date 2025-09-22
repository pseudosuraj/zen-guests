// app/actions/deleteDeal.ts
'use server'

export async function deleteDeal(dealId: string): Promise<{ ok: boolean }> {
  if (!dealId?.trim()) {
    throw new Error('dealId is required')
  }

  // Temporary: no DB delete. Replace with Prisma when UpsellDeal model is restored.
  console.warn('Deals deletion is temporarily stubbed; skipping DB delete for:', dealId)
  return { ok: true }
}
