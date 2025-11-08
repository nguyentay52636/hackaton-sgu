"use client"

import { useState } from "react"
import { Card, CardContent } from "@/shared/ui/card"
import {
  HeaderUser,
  UsersStatsCards,
  UsersFilters,
  UserCard,
  UsersTable,
  UserDetailDialog,
  AddUserDialog,
  type User,
  type UserStats,
} from "./components"
import { users } from "./components/data"

export default function UsersAdmin() {
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"table" | "grid">("table")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)

  const stats: UserStats = {
    total: users.length,
    active: users.filter((u) => u.status === "active").length,
    suspended: users.filter((u) => u.status === "suspended").length,
    newThisMonth: 2,
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    return matchesSearch && matchesRole && matchesStatus
  })

  const handleViewDetails = (user: User) => {
    setSelectedUser(user)
    setIsDetailDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <HeaderUser setIsAddDialogOpen={setIsAddDialogOpen} />

      <UsersStatsCards stats={stats} />

      <UsersFilters
        searchQuery={searchQuery}
        roleFilter={roleFilter}
        statusFilter={statusFilter}
        viewMode={viewMode}
        onSearchChange={setSearchQuery}
        onRoleFilterChange={setRoleFilter}
        onStatusFilterChange={setStatusFilter}
        onViewModeChange={setViewMode}
      />

      <Card>
        <CardContent className="pt-6">
          {viewMode === "table" ? (
            <UsersTable users={filteredUsers} onViewDetails={handleViewDetails} />
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredUsers.map((user, index) => (
                <UserCard
                  key={user.id}
                  user={user}
                  index={index}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <UserDetailDialog
        isOpen={isDetailDialogOpen}
        onOpenChange={setIsDetailDialogOpen}
        user={selectedUser}
      />

      <AddUserDialog isOpen={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} />
    </div>
  )
}
