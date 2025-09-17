// app/actions/deleteDeal.ts
'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function deleteDeal(dealId: number) {
  try {
    console.log('🗑️ Deleting deal with ID:', dealId);
    
    await prisma.upsellDeal.delete({
      where: { id: dealId },
    });
    
    console.log('✅ Deal deleted successfully');
    
    // Refresh both pages to remove the deleted deal
    revalidatePath('/owner/deals');
    revalidatePath('/owner/dashboard');
    
    return { success: true };
  } catch (error) {
    console.error('❌ Error deleting deal:', error);
    throw error;
  }
}
