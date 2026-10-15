import { NextResponse } from 'next/server';
import { getTables, createTable, deleteTable } from '@/lib/storage';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
  try {
    const tables = await getTables();
    return NextResponse.json({ success: true, count: tables.length, tables });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tables' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const authed = await isAuthenticated();
    if (!authed) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { tableNumber, label, capacity } = body;

    if (!tableNumber) {
      return NextResponse.json({ error: 'Table number is required' }, { status: 400 });
    }

    const table = await createTable(tableNumber, label, capacity ? Number(capacity) : 4);
    return NextResponse.json({ success: true, table }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create table' }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const authed = await isAuthenticated();
    if (!authed) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Table ID is required' }, { status: 400 });
    }

    const success = await deleteTable(id);
    if (!success) {
      return NextResponse.json({ error: 'Table not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Table deleted' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to delete table' }, { status: 500 });
  }
}
