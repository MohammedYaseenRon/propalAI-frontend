"use client";

import React, { useEffect, useState } from 'react'
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';

interface FormData {
  fullName: string;
  email: string;
  password?: string;
}

const ProfilePage = () => {
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState<FormData>({ fullName: '', email: '' });
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    console.log('Stored user:', storedUser); // Debug
    ;
    if (!storedUser) return;

    try {
      const parsed = JSON.parse(storedUser);

      axios.get(`/api/profile?fullName=${encodeURIComponent(parsed.fullName)}`)
        .then((res) => {
          setUser(res.data.user);
          setFormData({ ...res.data.user, password: '' });
          localStorage.setItem('user', JSON.stringify(res.data.user));
        })
        .catch((err) => {
          console.error("Failed to load user", err);
        });

    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
    }
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/profile', formData);
      if (response.status === 200) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setUser(response.data.user);
        setEditMode(false);
        toast.success('Profile updated!');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Update failed');
    }
  }

  return (
    <div className='p-4'>
      {!editMode ? (
        <div>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
            <div className="space-y-2">
              <Label htmlFor="fullName" className='text-black text-md'>Full Name</Label>
              <Input
                id="fullName"
                type="text"
                value={user.fullName}
                disabled
                className="bg-gray-200 text-black placeholder-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className='text-black text-md'>Email</Label>
              <Input
                id="email"
                type="text"
                value={user.email}
                disabled
                className="bg-gray-200 text-black placeholder-white"
              />
            </div>
          </div>
          <Button onClick={() => setEditMode(true)} className='bg-blue-600 text-white px-4 py-2 mt-6 hover:bg-blue-800'>
            Update Profile
          </Button>
        </div>
      ) : (
        <form onSubmit={handleUpdate} className="space-y-4 mt-4">
          <div>
            <Label className="block text-sm font-medium">Full Name</Label>
            <Input
              type="text"
              value={formData.fullName}
              disabled
              className="w-full px-3 py-2 border rounded bg-gray-100"
            />
          </div>

          <div>
            <Label className="block text-sm font-medium">Email</Label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <Label className="block text-sm font-medium">New Password</Label>
            <Input
              type="password"
              placeholder="Leave blank to keep current"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Save Changes
            </Button>
            <Button type="button" onClick={() => setEditMode(false)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700">
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProfilePage;
