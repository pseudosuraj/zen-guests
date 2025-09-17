// app/owner/deals/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { deleteDeal } from '@/app/actions/deleteDeal';
import CreateDealForm from '@/app/components/CreateDealForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// TypeScript interface for deals
interface Deal {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  type: string;
  createdAt: string;
}

export default function DealManagerPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch deals from API
  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    try {
      const response = await fetch('/api/deals', { cache: 'no-store' });
      if (response.ok) {
        const data = await response.json();
        setDeals(data);
      }
    } catch (error) {
      console.error('Error fetching deals:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete with confirmation
  const handleDelete = async (deal: Deal) => {
    if (!confirm(`Are you sure you want to delete "${deal.name}"?`)) {
      return;
    }

    try {
      await deleteDeal(deal.id);
      // Refresh the deals list
      await fetchDeals();
      alert('Deal deleted successfully!');
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete deal. Please try again.');
    }
  };

  // Handle edit (placeholder for now)
  const handleEdit = (deal: Deal) => {
    alert(`Edit functionality for "${deal.name}" coming soon!\n\nThis would open a modal with pre-filled form data for editing.`);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="flex items-center justify-center min-h-screen">
          <p>Loading deals...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Page Header */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">Deal Manager</h1>
              <p className="mt-2 text-sm text-gray-600">
                Create, edit, and publish the upsell offers for your guests.
              </p>
            </div>

            {/* Create Deal Form Component */}
            <CreateDealForm />
          </div>
        </div>
      </div>

      {/* Content - Live Data Table */}
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">All Deals ({deals.length})</CardTitle>
            <CardDescription>
              Manage the offers guests see in the portal and via WhatsApp campaigns.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {deals.length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                No deals created yet. Click "Create New Deal" to get started.
              </p>
            ) : (
              <Table>
                <TableCaption>A list of your current upsell deals.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[30%]">Deal Name</TableHead>
                    <TableHead className="w-[15%]">Price</TableHead>
                    <TableHead className="w-[35%]">Description</TableHead>
                    <TableHead className="w-[15%]">Type</TableHead>
                    <TableHead className="w-[15%] text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {deals.map((deal) => (
                    <TableRow key={deal.id}>
                      <TableCell className="font-medium text-gray-900">
                        {deal.name}
                      </TableCell>
                      <TableCell className="text-gray-700">
                        ₹{deal.price.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-gray-600 text-sm">
                        {deal.description.length > 100
                          ? `${deal.description.substring(0, 100)}...`
                          : deal.description}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={`${
                            deal.type === 'ROOM_UPGRADE' 
                              ? 'bg-purple-100 text-purple-800'
                              : deal.type === 'FOOD_BEVERAGE'
                              ? 'bg-orange-100 text-orange-800'
                              : deal.type === 'EXPERIENCE'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {deal.type.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      
                      {/* FUNCTIONAL EDIT & DELETE BUTTONS */}
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEdit(deal)}
                          >
                            Edit
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleDelete(deal)}
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
