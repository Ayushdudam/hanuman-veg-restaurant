import { NextResponse } from 'next/server';
import { getOrders, createOrder, getMenuItemById } from '@/lib/storage';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
  try {
    const authed = await isAuthenticated();
    if (!authed) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const orders = await getOrders();
    return NextResponse.json({ success: true, count: orders.length, orders });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { tableNumber, customerName, customerPhone, items, orderType, notes } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Order must contain at least one item' }, { status: 400 });
    }

    // Server-side price calculation and validation
    let verifiedTotal = 0;
    const verifiedItems = [];

    for (const cartItem of items) {
      const dish = await getMenuItemById(cartItem.dishId);
      if (!dish) {
        return NextResponse.json(
          { error: `Item with id ${cartItem.dishId} not found` },
          { status: 400 }
        );
      }

      if (dish.isAvailable === false) {
        return NextResponse.json(
          { error: `Dish "${dish.name}" is currently unavailable` },
          { status: 400 }
        );
      }

      const qty = Math.max(1, Number(cartItem.quantity) || 1);
      verifiedTotal += dish.price * qty;

      verifiedItems.push({
        dishId: dish.id,
        name: dish.name,
        price: dish.price,
        quantity: qty,
        notes: cartItem.notes || undefined,
      });
    }

    const order = await createOrder({
      tableNumber: tableNumber ? String(tableNumber).trim() : undefined,
      customerName: customerName ? String(customerName).trim() : 'Dine-in Guest',
      customerPhone: customerPhone ? String(customerPhone).trim() : undefined,
      items: verifiedItems,
      totalAmount: verifiedTotal,
      orderType: orderType || (tableNumber ? 'dinein' : 'takeaway'),
      notes: notes ? String(notes).trim() : undefined,
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Order created successfully',
        orderReference: order.orderReference,
        order 
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: error.message || 'Failed to create order' }, { status: 500 });
  }
}
