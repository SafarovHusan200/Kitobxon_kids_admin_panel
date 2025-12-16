"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { format } from "date-fns";

interface User {
  userId: string;
  full_name: string;
  username: string;
  region: string;
  district: string;
  school: string;
  parent: string;
  age_group: string;
  phone: string;
  parent_phone: string;
  registered: boolean;
  referrals: any[];
  createdAt: string;
  updatedAt: string;
}

interface UserDrawerProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

export function UserDrawer({ user, isOpen, onClose }: UserDrawerProps) {
  if (!isOpen || !user) return null;

  const getInitials = (name: string) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose} />

      {/* Drawer */}
      <div className="fixed right-0 top-0 z-50 h-screen w-full sm:w-[500px] bg-card border-l border-border shadow-xl overflow-y-auto animate-in slide-in-from-right duration-300">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="text-lg">
                  {getInitials(user.full_name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  {user.full_name}
                </h2>
                <p className="text-muted-foreground">@{user.username}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Status Badge */}
          <div className="mb-6">
            {user.registered ? (
              <Badge className="bg-green-500/10 text-green-700 dark:text-green-400">
                Registered
              </Badge>
            ) : (
              <Badge variant="secondary">Not Registered</Badge>
            )}
          </div>

          {/* Tabs */}
          <Tabs defaultValue="profile">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile">Profile Info</TabsTrigger>
              <TabsTrigger value="referrals" className="gap-2">
                Referrals
                <Badge variant="secondary" className="ml-1">
                  {user.referrals?.length || 0}
                </Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-4 mt-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Full Name
                  </label>
                  <p className="text-foreground mt-1">{user.full_name}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Username
                  </label>
                  <p className="text-foreground mt-1">@{user.username}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Phone
                  </label>
                  <p className="text-foreground mt-1">{user.phone}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Parent Name
                  </label>
                  <p className="text-foreground mt-1">{user.parent}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Parent Phone
                  </label>
                  <p className="text-foreground mt-1">{user.parent_phone}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Region
                  </label>
                  <p className="text-foreground mt-1">{user.region}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    District
                  </label>
                  <p className="text-foreground mt-1">{user.district}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    School
                  </label>
                  <p className="text-foreground mt-1">{user.school}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Age Group
                  </label>
                  <p className="text-foreground mt-1">
                    <Badge variant="outline">{user.age_group}</Badge>
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Joined Date
                  </label>
                  <p className="text-foreground mt-1">
                    {user.createdAt &&
                      format(new Date(user.createdAt), "MMM d, yyyy")}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Last Updated
                  </label>
                  <p className="text-foreground mt-1">
                    {user.updatedAt &&
                      format(new Date(user.updatedAt), "MMMM d, yyyy")}
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="referrals" className="mt-6">
              {user.referrals && user.referrals.length > 0 ? (
                <div className="space-y-4">
                  {user.referrals.map((referral: any, index: number) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg border border-border bg-accent/50"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>
                            {getInitials(
                              referral.fullName || referral.username
                            )}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-semibold text-foreground">
                            {referral.fullName || referral.username}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            @{referral.username}
                          </p>
                        </div>
                      </div>
                      {referral.joinedAt && (
                        <p className="text-xs text-muted-foreground mt-2">
                          Joined{" "}
                          {format(new Date(referral.joinedAt), "MMM d, yyyy")}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No referrals yet</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
