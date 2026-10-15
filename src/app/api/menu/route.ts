import { NextResponse } from 'next/server';
import { getMenuItems, createMenuItem } from '@/lib/storage';
import { isAuthenticated } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || undefined;
    const jainOnly = searchParams.get('jainOnly') === 'true';
    const search = searchParams.get('search') || undefined;
    const includeUnavailableParam = searchParams.get('includeUnavailable') === 'true';

    // Allow includeUnavailable if authed or explicitly requested by admin
    const authed = await isAuthenticated();
    const includeUnavailable = authed && includeUnavailableParam;

    const items = await getMenuItems({
      category,
      jainOnly,
      search,
      includeUnavailable,
    });

    return NextResponse.json({ success: true, count: items.length, items });
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return NextResponse.json({ error: 'Failed to fetch menu items' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const authed = await isAuthenticated();
    if (!authed) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, category, price, description, dietary, isJainFriendly } = body;

    if (!name || !category || price === undefined || !description) {
      return NextResponse.json(
        { error: 'Name, category, price, and description are required' },
        { status: 400 }
      );
    }

    const newItem = await createMenuItem({
      name,
      category,
      price: Number(price),
      description,
      dietary: dietary || 'pure-veg',
      isJainFriendly: Boolean(isJainFriendly),
      spiceLevel: body.spiceLevel ?? 1,
      isSignature: Boolean(body.isSignature),
      isBestseller: Boolean(body.isBestseller),
      isAvailable: body.isAvailable ?? true,
      badge: body.badge || undefined,
      imageUrl: body.imageUrl || undefined,
      sortOrder: body.sortOrder,
    });

    return NextResponse.json({ success: true, item: newItem }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating menu item:', error);
    return NextResponse.json({ error: error.message || 'Failed to create menu item' }, { status: 500 });
  }
}
