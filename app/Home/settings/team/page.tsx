"use client"

import { useState } from "react"
import { PlusCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Trash2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface User {
  id: string
  name: string
  email: string
  phone: string
  role: "Admin" | "User"
  features: string[]
}

const availableFeatures = ["Phone", "Email", "SMS", "AI Agents", "Campaigns", "Lead Database"]

export default function TeamPage({ initialUsers = [] }: { initialUsers?: User[] }) {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [newUser, setNewUser] = useState<Omit<User, "id">>({
    name: "",
    email: "",
    phone: "",
    role: "User",
    features: [],
  })
  const { toast } = useToast()

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.phone) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    const newUserWithId: User = { ...newUser, id: Date.now().toString() }
    setUsers([...users, newUserWithId])
    setNewUser({ name: "", email: "", phone: "", role: "User", features: [] })

    toast({
      title: "User added",
      description: `${newUser.name} has been added to the team.`,
    })
  }

  const handleRemoveUser = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId))
    toast({
      title: "User removed",
      description: "The user has been successfully removed.",
    })
  }

  return (
    <div className="space-y-6 p-8">
      <Card className="border-white/10 bg-black/40 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Team Members</CardTitle>
          <CardDescription>Manage your team members and their access</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Add New User */}
          <Card className="border-white/10 bg-black/20">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-white">Add New Member</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    placeholder="Enter name"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    placeholder="Enter email"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={newUser.phone}
                    onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                    placeholder="Enter phone number"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select
                    value={newUser.role}
                    onValueChange={(value) => setNewUser({ ...newUser, role: value as "Admin" | "User" })}
                  >
                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="User">User</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {newUser.role === "User" && (
                <div className="space-y-2">
                  <Label>Features</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {availableFeatures.map((feature) => (
                      <div key={feature} className="flex items-center space-x-2">
                        <Checkbox
                          id={`feature-${feature}`}
                          checked={newUser.features.includes(feature)}
                          onCheckedChange={(checked) => {
                            const updatedFeatures = checked
                              ? [...newUser.features, feature]
                              : newUser.features.filter((f) => f !== feature)
                            setNewUser({ ...newUser, features: updatedFeatures })
                          }}
                        />
                        <Label htmlFor={`feature-${feature}`}>{feature}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <Button onClick={handleAddUser} className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Member
              </Button>
            </CardContent>
          </Card>
          {/* Existing Users Table */}
          <div className="mt-8 space-y-4">
            <h3 className="text-lg font-medium text-white">Existing Members</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-white/80">Name</TableHead>
                  <TableHead className="text-white/80">Email</TableHead>
                  <TableHead className="text-white/80">Phone</TableHead>
                  <TableHead className="text-white/80">Role</TableHead>
                  <TableHead className="text-white/80">Features</TableHead>
                  <TableHead className="text-white/80">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} className="hover:bg-white/5 transition-colors">
                    <TableCell className="text-white">{user.name}</TableCell>
                    <TableCell className="text-white">{user.email}</TableCell>
                    <TableCell className="text-white">{user.phone}</TableCell>
                    <TableCell className="text-white">{user.role}</TableCell>
                    <TableCell className="text-white">
                      {user.role === "Admin" ? "All" : user.features.join(", ")}
                    </TableCell>
                    <TableCell>
                      <Button variant="destructive" size="icon" onClick={() => handleRemoveUser(user.id)}>
                        <Trash2 className="h-4 w-4 text-white" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

