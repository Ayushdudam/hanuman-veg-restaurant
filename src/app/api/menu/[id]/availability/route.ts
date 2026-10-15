import { NextResponse } from 'next/server';
import { toggleMenuItemAvailability } from '@/lib/storage';
import { isAuthenticated } from '@/lib/auth';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const authed = await isAuthenticated();
    if (!authed) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    const item = await toggleMenuItemAvailability(params.id, body.isAvailable);

    if (!item) {
      return NextResponse.json({ error: 'Menu item not found' }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true, 
      id: item.id,
      name: item.name,
      isAvailable: item.isAvailable 
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to toggle availability' }, { status: 500 });
  }
}
