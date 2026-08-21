'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'
import { Badge } from '@/app/components/ui/badge'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  Briefcase,
  Camera,
  Save,
  Loader2,
  CheckCircle,
  LogOut,
  ArrowLeft
} from 'lucide-react'

export default function ProfilePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [user, setUser] = useState<any>(null)

  // Profile data
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    avatar: '',
    bio: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    qualification: '',
    occupation: '',
    dateOfBirth: '',
    isVerified: false,
    createdAt: ''
  })

  // Form data
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    bio: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    qualification: '',
    occupation: '',
    dateOfBirth: ''
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')

    if (!token) {
      router.push('/auth/login')
      return
    }

    if (userData) {
      try {
        const parsed = JSON.parse(userData)
        setUser(parsed)
        setProfile({
          ...profile,
          name: parsed.name || '',
          email: parsed.email || '',
          phone: parsed.phone || '',
          isVerified: parsed.isVerified || false,
          createdAt: parsed.createdAt || new Date().toISOString()
        })
        setFormData({
          name: parsed.name || '',
          phone: parsed.phone || '',
          bio: '',
          address: '',
          city: '',
          state: '',
          pincode: '',
          qualification: '',
          occupation: '',
          dateOfBirth: ''
        })
      } catch (e) {
        console.log('Error parsing user data')
      }
    }
    setLoading(false)
  }, [router])

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
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/auth/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link href="/dashboard">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold gradient-text">My Profile</h1>
            <p className="text-gray-500 dark:text-gray-400">Manage your personal information</p>
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
                    name: profile.name || '',
                    phone: profile.phone || '',
                    bio: profile.bio || '',
                    address: profile.address || '',
                    city: profile.city || '',
                    state: profile.state || '',
                    pincode: profile.pincode || '',
                    qualification: profile.qualification || '',
                    occupation: profile.occupation || '',
                    dateOfBirth: profile.dateOfBirth || ''
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
            <Button variant="ghost" className="text-red-500" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* LEFT - Profile Photo & Info */}
          <Card>
            <CardContent className="p-6 text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white text-4xl font-bold">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <label className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer hover:bg-primary/90">
                  <Camera className="w-4 h-4" />
                  <input type="file" accept="image/*" className="hidden" />
                </label>
              </div>

              <h2 className="text-xl font-semibold">{profile.name || user?.name || 'User'}</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{profile.email || user?.email}</p>
              
              {profile.isVerified && (
                <Badge variant="success" className="mt-2">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              )}

              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">Member since</p>
                <p className="font-medium">
                  {new Date(profile.createdAt || Date.now()).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* RIGHT - Profile Form */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-gray-50 dark:bg-gray-800' : ''}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      value={profile.email || user?.email || ''}
                      disabled
                      className="bg-gray-50 dark:bg-gray-800"
                    />
                    <p className="text-xs text-gray-500">Email cannot be changed</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-gray-50 dark:bg-gray-800' : ''}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-gray-50 dark:bg-gray-800' : ''}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="qualification">Qualification</Label>
                    <Input
                      id="qualification"
                      name="qualification"
                      value={formData.qualification}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-gray-50 dark:bg-gray-800' : ''}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="occupation">Occupation</Label>
                    <Input
                      id="occupation"
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-gray-50 dark:bg-gray-800' : ''}
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-gray-50 dark:bg-gray-800' : ''}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-gray-50 dark:bg-gray-800' : ''}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-gray-50 dark:bg-gray-800' : ''}
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      disabled={!isEditing}
                      rows={3}
                      className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 disabled:bg-gray-50 dark:disabled:bg-gray-800"
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}