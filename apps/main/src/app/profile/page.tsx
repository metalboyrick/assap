"use client"

import type React from "react"

import { useState } from "react"
import { Check, Twitter, Mail, User, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Mock user data
const userData = {
  name: "Alex Johnson",
  solanaAddress: "8YLKoCr5Nz3q3JoGzEwgHXLKJqUPMFxpCvnpxpCLJxN9",
  email: "alex@example.com",
  twitter: "@alexjohnson",
  solanaName: "alex.sol",
  isVerified: true,
  verifications: ["Email", "Human", "Solana Balance"],
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    twitter: userData.twitter,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would submit this to your API
    console.log("Updating profile:", formData)
    setIsEditing(false)
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-4xl font-bold tracking-tighter">Profile</h1>
        <p className="text-zinc-400 mt-1">Manage your account and verifications</p>
      </div>

      <div className="space-y-6">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription className="text-zinc-400">Update your personal information</CardDescription>
            </div>
            <Button variant="outline" onClick={() => setIsEditing(!isEditing)} className="border-zinc-700">
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex flex-col items-center text-center md:w-1/3">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" alt={userData.name} />
                  <AvatarFallback className="bg-gradient-to-r from-red-600 to-blue-600 text-" />
                  <AvatarFallback className="bg-gradient-to-r from-red-600 to-blue-600 text-xl">
                    {userData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold">{userData.name}</h2>
                <div className="flex items-center mt-1">
                  {userData.isVerified && (
                    <Badge className="bg-gradient-to-r from-blue-600 to-green-600 text-white border-0 flex items-center gap-1">
                      <Check className="h-3 w-3" /> Verified
                    </Badge>
                  )}
                </div>
              </div>

              <div className="md:w-2/3">
                {isEditing ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Display Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-zinc-900 border-zinc-800"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-zinc-900 border-zinc-800"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="twitter">Twitter Handle</Label>
                      <Input
                        id="twitter"
                        name="twitter"
                        value={formData.twitter}
                        onChange={handleChange}
                        className="bg-zinc-900 border-zinc-800"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700"
                    >
                      Save Changes
                    </Button>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-zinc-400">Display Name</h3>
                        <p className="mt-1">{userData.name}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-zinc-400">Email Address</h3>
                        <p className="mt-1">{userData.email}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-zinc-400">Twitter Handle</h3>
                        <p className="mt-1">{userData.twitter}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-zinc-400">Solana Name</h3>
                        <p className="mt-1">{userData.solanaName}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle>Linked Accounts</CardTitle>
            <CardDescription className="text-zinc-400">Manage your connected accounts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 border border-zinc-800 rounded-lg">
              <div className="flex items-center gap-3">
                <Twitter className="h-5 w-5 text-blue-400" />
                <div>
                  <p className="font-medium">Twitter</p>
                  <p className="text-sm text-zinc-400">{userData.twitter}</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-green-900/20 text-green-400 border-green-800">
                Connected
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 border border-zinc-800 rounded-lg">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-red-400" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-zinc-400">{userData.email}</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-green-900/20 text-green-400 border-green-800">
                Verified
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle>Verification Status</CardTitle>
            <CardDescription className="text-zinc-400">Manage your verification methods</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border border-zinc-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium">Human Verification</p>
                    <p className="text-sm text-zinc-400">Verify your identity</p>
                  </div>
                </div>
                <Badge className="bg-green-900 text-green-100 border-green-700">Verified</Badge>
              </div>

              <div className="flex items-center justify-between p-3 border border-zinc-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium">Email Verification</p>
                    <p className="text-sm text-zinc-400">{userData.email}</p>
                  </div>
                </div>
                <Badge className="bg-green-900 text-green-100 border-green-700">Verified</Badge>
              </div>

              <div className="flex items-center justify-between p-3 border border-zinc-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <Twitter className="h-5 w-5 text-blue-400" />
                  <div>
                    <p className="font-medium">Twitter Verification</p>
                    <p className="text-sm text-zinc-400">{userData.twitter}</p>
                  </div>
                </div>
                <Badge className="bg-green-900 text-green-100 border-green-700">Verified</Badge>
              </div>

              <div className="flex items-center justify-between p-3 border border-zinc-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-orange-400" />
                  <div>
                    <p className="font-medium">Solana Name</p>
                    <p className="text-sm text-zinc-400">{userData.solanaName}</p>
                  </div>
                </div>
                <Badge className="bg-green-900 text-green-100 border-green-700">Verified</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
"use client"

import type React from "react"

import { useState } from "react"
import { Check, Twitter, Mail, User, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Mock user data
const userData = {
  name: "Alex Johnson",
  solanaAddress: "8YLKoCr5Nz3q3JoGzEwgHXLKJqUPMFxpCvnpxpCLJxN9",
  email: "alex@example.com",
  twitter: "@alexjohnson",
  solanaName: "alex.sol",
  isVerified: true,
  verifications: ["Email", "Human", "Solana Balance"],
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    twitter: userData.twitter,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would submit this to your API
    console.log("Updating profile:", formData)
    setIsEditing(false)
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-4xl font-bold tracking-tighter">Profile</h1>
        <p className="text-zinc-400 mt-1">Manage your account and verifications</p>
      </div>

      <div className="space-y-6">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription className="text-zinc-400">Update your personal information</CardDescription>
            </div>
            <Button variant="outline" onClick={() => setIsEditing(!isEditing)} className="border-zinc-700">
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex flex-col items-center text-center md:w-1/3">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" alt={userData.name} />
                  <AvatarFallback className="bg-gradient-to-r from-red-600 to-blue-600 text-" />
                  <AvatarFallback className="bg-gradient-to-r from-red-600 to-blue-600 text-xl">
                    {userData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold">{userData.name}</h2>
                <div className="flex items-center mt-1">
                  {userData.isVerified && (
                    <Badge className="bg-gradient-to-r from-blue-600 to-green-600 text-white border-0 flex items-center gap-1">
                      <Check className="h-3 w-3" /> Verified
                    </Badge>
                  )}
                </div>
              </div>

              <div className="md:w-2/3">
                {isEditing ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Display Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-zinc-900 border-zinc-800"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-zinc-900 border-zinc-800"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="twitter">Twitter Handle</Label>
                      <Input
                        id="twitter"
                        name="twitter"
                        value={formData.twitter}
                        onChange={handleChange}
                        className="bg-zinc-900 border-zinc-800"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700"
                    >
                      Save Changes
                    </Button>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-zinc-400">Display Name</h3>
                        <p className="mt-1">{userData.name}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-zinc-400">Email Address</h3>
                        <p className="mt-1">{userData.email}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-zinc-400">Twitter Handle</h3>
                        <p className="mt-1">{userData.twitter}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-zinc-400">Solana Name</h3>
                        <p className="mt-1">{userData.solanaName}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle>Linked Accounts</CardTitle>
            <CardDescription className="text-zinc-400">Manage your connected accounts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 border border-zinc-800 rounded-lg">
              <div className="flex items-center gap-3">
                <Twitter className="h-5 w-5 text-blue-400" />
                <div>
                  <p className="font-medium">Twitter</p>
                  <p className="text-sm text-zinc-400">{userData.twitter}</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-green-900/20 text-green-400 border-green-800">
                Connected
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 border border-zinc-800 rounded-lg">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-red-400" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-zinc-400">{userData.email}</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-green-900/20 text-green-400 border-green-800">
                Verified
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle>Verification Status</CardTitle>
            <CardDescription className="text-zinc-400">Manage your verification methods</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border border-zinc-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium">Human Verification</p>
                    <p className="text-sm text-zinc-400">Verify your identity</p>
                  </div>
                </div>
                <Badge className="bg-green-900 text-green-100 border-green-700">Verified</Badge>
              </div>

              <div className="flex items-center justify-between p-3 border border-zinc-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium">Email Verification</p>
                    <p className="text-sm text-zinc-400">{userData.email}</p>
                  </div>
                </div>
                <Badge className="bg-green-900 text-green-100 border-green-700">Verified</Badge>
              </div>

              <div className="flex items-center justify-between p-3 border border-zinc-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <Twitter className="h-5 w-5 text-blue-400" />
                  <div>
                    <p className="font-medium">Twitter Verification</p>
                    <p className="text-sm text-zinc-400">{userData.twitter}</p>
                  </div>
                </div>
                <Badge className="bg-green-900 text-green-100 border-green-700">Verified</Badge>
              </div>

              <div className="flex items-center justify-between p-3 border border-zinc-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-orange-400" />
                  <div>
                    <p className="font-medium">Solana Name</p>
                    <p className="text-sm text-zinc-400">{userData.solanaName}</p>
                  </div>
                </div>
                <Badge className="bg-green-900 text-green-100 border-green-700">Verified</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
