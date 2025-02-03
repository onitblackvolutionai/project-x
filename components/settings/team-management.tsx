import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

interface User {
  id: string
  name: string
  email: string
  phone: string
  role: "Admin" | "User"
  features: string[]
}

interface TeamManagementProps {
  initialUsers: User[]
  onAddUser: (user: Omit<User, "id">) => void
  onUpdateUser: (user: User) => void
  onRemoveUser: (userId: string) => void
}

const availableFeatures = ["Phone", "Email", "SMS", "AI Agents", "Campaigns", "Lead Database"]

export function TeamManagement({ initialUsers, onAddUser, onUpdateUser, onRemoveUser }: TeamManagementProps) {
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
    onAddUser(newUser)
    setUsers([...users, { ...newUser, id: Date.now().toString() }])
    setNewUser({ name: "", email: "", phone: "", role: "User", features: [] })
    toast({
      title: "User added",
      description: "The new user has been successfully added.",
    })
  }

  const handleUpdateUser = (updatedUser: User) => {
    onUpdateUser(updatedUser)
    setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)))
    toast({
      title: "User updated",
      description: "The user has been successfully updated.",
    })
  }

  const handleRemoveUser = (userId: string) => {
    onRemoveUser(userId)
    setUsers(users.filter((user) => user.id !== userId))
    toast({
      title: "User removed",
      description: "The user has been successfully removed.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Management</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Add New User</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                placeholder="Enter name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                placeholder="Enter email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={newUser.phone}
                onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                placeholder="Enter phone number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select
                value={newUser.role}
                onValueChange={(value: "Admin" | "User") => setNewUser({ ...newUser, role: value })}
              >
                <SelectTrigger>
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
                        if (checked) {
                          setNewUser({ ...newUser, features: [...newUser.features, feature] })
                        } else {
                          setNewUser({ ...newUser, features: newUser.features.filter((f) => f !== feature) })
                        }
                      }}
                    />
                    <Label htmlFor={`feature-${feature}`}>{feature}</Label>
                  </div>
                ))}
              </div>
            </div>
          )}
          <Button onClick={handleAddUser}>Add User</Button>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Existing Users</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Features</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.role === "Admin" ? "All" : user.features.join(", ")}</TableCell>
                  <TableCell>
                    <Button variant="destructive" onClick={() => handleRemoveUser(user.id)}>
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

