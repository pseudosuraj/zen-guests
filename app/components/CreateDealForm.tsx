// app/components/CreateDealForm.tsx
'use client';

import { useState, useTransition } from 'react';
import { createDeal } from '@/app/actions/createDeal';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreateDealForm() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubmit = async (formData: FormData) => {
    console.log('🚀 Form submission started');
    setMessage(null);
    
    startTransition(async () => {
      try {
        console.log('📤 Calling server action...');
        const result = await createDeal(formData);
        console.log('✅ Server action completed:', result);
        
        setMessage({ type: 'success', text: 'Deal created successfully!' });
        
        // Close dialog after a brief delay to show success message
        setTimeout(() => {
          setOpen(false);
          setMessage(null);
        }, 1500);
        
      } catch (error) {
        console.error('❌ Form submission error:', error);
        setMessage({ type: 'error', text: 'Failed to create deal. Please try again.' });
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-purple-600 hover:bg-purple-700">
          + Create New Deal
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create a New Deal</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new upsell offer for your guests.
          </DialogDescription>
        </DialogHeader>

        {/* Show success/error message */}
        {message && (
          <div className={`p-3 rounded ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message.text}
          </div>
        )}

        {/* Form with proper name attributes */}
        <form action={handleSubmit} className="grid gap-4 py-2">
          <div className="grid gap-1.5">
            <Label htmlFor="dealName">Deal Name</Label>
            <Input 
              id="dealName" 
              name="name"
              placeholder="Premium Suite Upgrade" 
              required 
              disabled={isPending}
            />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="price">Price (₹)</Label>
            <Input 
              id="price" 
              name="price"
              type="number" 
              min="0" 
              step="0.01" 
              placeholder="2500.00" 
              required 
              disabled={isPending}
            />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Upgrade to our best suite with city view, minibar, and express checkout..."
              rows={4}
              required
              disabled={isPending}
            />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input 
              id="imageUrl" 
              name="imageUrl"
              type="url" 
              placeholder="https://images.unsplash.com/..." 
              required 
              disabled={isPending}
            />
          </div>

          <div className="grid gap-1.5">
            <Label>Deal Type</Label>
            <Select name="type" defaultValue="ROOM_UPGRADE" disabled={isPending}>
              <SelectTrigger>
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ROOM_UPGRADE">Room Upgrade</SelectItem>
                <SelectItem value="FOOD_BEVERAGE">Food & Beverage</SelectItem>
                <SelectItem value="EXPERIENCE">Experience</SelectItem>
                <SelectItem value="CONCIERGE_SERVICE">Concierge Service</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="mt-2 flex items-center gap-2">
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isPending}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700"
              disabled={isPending}
            >
              {isPending ? 'Creating...' : 'Save Deal'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
