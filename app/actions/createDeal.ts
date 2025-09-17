// app/actions/createDeal.ts
'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createDeal(formData: FormData) {
  try {
    console.log('🚀 SERVER ACTION: createDeal started');
    
    // Extract and log form data
    const name = formData.get('name')?.toString();
    const price = formData.get('price')?.toString();
    const description = formData.get('description')?.toString();
    const imageUrl = formData.get('imageUrl')?.toString();
    const type = formData.get('type')?.toString();

    console.log('📝 Form data received:', { name, price, description, imageUrl, type });

    // Validate required fields
    if (!name || !price || !description || !imageUrl || !type) {
      console.error('❌ Missing required fields');
      throw new Error('All fields are required');
    }

    // Create the deal in database
    console.log('💾 Creating deal in database...');
    const deal = await prisma.upsellDeal.create({
      data: {
        name,
        price: parseFloat(price),
        description,
        imageUrl,
        type: type as 'ROOM_UPGRADE' | 'FOOD_BEVERAGE' | 'EXPERIENCE' | 'CONCIERGE_SERVICE',
      },
    });

    console.log('✅ Deal created successfully with ID:', deal.id);

    // Revalidate both pages to show the new deal instantly
    revalidatePath('/owner/deals');
    revalidatePath('/owner/dashboard');
    
    console.log('🔄 Pages revalidated');
    
    // Return simple success status (no Decimal objects)
    return { success: true, id: deal.id };
    
  } catch (error) {
    console.error('❌ Error creating deal:', error);
    throw error;
  }
}
