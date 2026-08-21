'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'
import { Textarea } from '@/app/components/ui/textarea'
import { Badge } from '@/app/components/ui/badge'
import { toast } from 'sonner'
import {
  User,
  Mail,
  Phone,
  Camera,
  Save,
  Loader2,
  CheckCircle
} from 'lucide-react'

export default function ProfilePage() {
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  
  // Sample profile data
  const [profile, setProfile] = useState({
    name: 'Student Name',
    email: 'student@email.com',
    phone: '9876543210',
    avatar: '',
    bio: 'I am a student preparing for competitive exams',
    address: '123, Main Street',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110001',
    qualification: 'B.Tech',
    occupation: 'Student',
    dateOfBirth: '2000-01-01',
    isVerified: true,
    createdAt: new Date().toISOString()
  })

  const [formData, setFormData] = useState({
    name: profile.name,
    phone: profile.phone,
    bio: profile.bio,
    address: profile.address,
    city: profile.city,
    state: profile.state,
    pincode: profile.pincode,
    qualification: profile.qualification,
    occupation: profile.occupation,
    dateOfBirth: profile.dateOfBirth
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setProfile({ ...profile, ...formData })
    setIsEditing(false)
    setSaving(false)
    toast.success('Profile updated successfully! 🎉')
  }

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    toast.success('Profile photo updated! 📸')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold gradient-text">My Profile</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your personal information</p>
        </div>
        <div className="flex gap-3">
          {!isEditing ? (
            <Button variant="gradient" onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          ) : (
            <>
              <Button variant="outline" onClick={() => {
                setIsEditing(false)
                setFormData({
                  name: profile.name,
                  phone: profile.phone,
                  bio: profile.bio,
                  address: profile.address,
                  city: profile.city,
                  state: profile.state,
                  pincode: profile.pincode,
                  qualification: profile.qualification,
                  occupation: profile.occupation,
                  dateOfBirth: profile.dateOfBirth
                })
              }}>
                Cancel
              </Button>
              <Button variant="gradient" onClick={handleSubmit} disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </>
          )}
        </div>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* LEFT COLUMN - Profile Photo & Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-6 text-center">
              {/* Profile Photo */}
              <div className="relative w-32 h-32 mx-auto mb-4">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20">
                  {profile.avatar ? (
                    <Image src={profile.avatar} alt={profile.name} width={128} height={128} className="object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white text-4xl font-bold">
                      {profile.name?.charAt(0) || 'U'}
                    </div>
                  )}
                </div>
                <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer hover:bg-primary/90">
                  <Camera className="w-4 h-4" />
                  <input id="avatar-upload" type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
                </label>
              </div>

              <h2 className="text-xl font-semibold">{profile.name}</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{profile.email}</p>
              
              {profile.isVerified && (
                <Badge variant="success" className="mt-2">
                  <CheckCircle className="w-3 h-3 mr-1" /> Verified
                </Badge>
              )}

              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <p>Member since</p>
                  <p className="font-medium text-gray-700 dark:text-gray-300">
                    {new Date(profile.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* RIGHT COLUMN - Profile Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                {isEditing ? 'Edit your personal details' : 'View your personal information'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name" name="name"
                      value={formData.name} onChange={handleChange}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-gray-50 dark:bg-gray-800' : ''}
                    />
                  </div>

                  {/* Email (Read-only) */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" value={profile.email} disabled className="bg-gray-50 dark:bg-gray-800" />
                    <p className="text-xs text-gray-500">Email cannot be changed</p>
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone" name="phone" type="tel"
                      value={formData.phone} onChange={handleChange}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-gray-50 dark:bg-gray-800' : ''}
                    />
                  </div>

                  {/* Date of Birth */}
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth" name="dateOfBirth" type="date"
                      value={formData.dateOfBirth} onChange={handleChange}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-gray-50 dark:bg-gray-800' : ''}
                    />
                  </div>

                  {/* Qualification */}
                  <div className="space-y-2">
                    <Label htmlFor="qualification">Qualification</Label>
                    <Input
                      id="qualification" name="qualification"
                      value={formData.qualification} onChange={handleChange}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-gray-50 dark:bg-gray-800' : ''}
                    />
                  </div>

                  {/* Occupation */}
                  <div className="space-y-2">
                    <Label htmlFor="occupation">Occupation</Label>
                    <Input
                      id="occupation" name="occupation"
                      value={formData.occupation} onChange={handleChange}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-gray-50 dark:bg-gray-800' : ''}
                    />
                  </div>

                  {/* Address */}
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address" name="address"
                      value={formData.address} onChange={handleChange}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-gray-50 dark:bg-gray-800' : ''}
                    />
                  </div>

                  {/* City */}
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city" name="city"
                      value={formData.city} onChange={handleChange}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-gray-50 dark:bg-gray-800' : ''}
                    />
                  </div>

                  {/* State */}
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state" name="state"
                      value={formData.state} onChange={handleChange}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-gray-50 dark:bg-gray-800' : ''}
                    />
                  </div>

                  {/* Bio */}
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="bio">Bio / About You</Label>
                    <Textarea
                      id="bio" name="bio"
                      value={formData.bio} onChange={handleChange}
                      disabled={!isEditing}
                      rows={4}
                      className={!isEditing ? 'bg-gray-50 dark:bg-gray-800' : ''}
                    />
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}