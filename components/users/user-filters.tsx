"use client";

import { Search, Filter, X, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

interface UserFiltersProps {
  search: string;
  selectedRegions: string[];
  selectedAgeGroups: string[];
  registrationStatus: string;
  regions: string[];
  ageGroups: string[];
  onSearchChange: (value: string) => void;
  onRegionsChange: (regions: string[]) => void;
  onAgeGroupsChange: (ageGroups: string[]) => void;
  onRegistrationStatusChange: (status: string) => void;
  onReset: () => void;
  onExport: () => void;
}

export function UserFilters({
  search,
  selectedRegions,
  selectedAgeGroups,
  registrationStatus,
  regions,
  ageGroups,
  onSearchChange,
  onRegionsChange,
  onAgeGroupsChange,
  onRegistrationStatusChange,
  onReset,
  onExport,
}: UserFiltersProps) {
  const hasFilters =
    selectedRegions.length > 0 ||
    selectedAgeGroups.length > 0 ||
    registrationStatus !== "all";

  const handleRegionToggle = (region: string) => {
    if (selectedRegions.includes(region)) {
      onRegionsChange(selectedRegions.filter((r) => r !== region));
    } else {
      onRegionsChange([...selectedRegions, region]);
    }
  };

  const handleAgeGroupToggle = (ageGroup: string) => {
    if (selectedAgeGroups.includes(ageGroup)) {
      onAgeGroupsChange(selectedAgeGroups.filter((a) => a !== ageGroup));
    } else {
      onAgeGroupsChange([...selectedAgeGroups, ageGroup]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, phone, username..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2 bg-transparent">
                <Filter className="h-4 w-4" />
                Filters
                {hasFilters && (
                  <Badge
                    variant="secondary"
                    className="ml-1 px-1.5 min-w-[20px] h-5"
                  >
                    {selectedRegions.length +
                      selectedAgeGroups.length +
                      (registrationStatus !== "all" ? 1 : 0)}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="space-y-4">
                {/* Region Filter */}
                <div>
                  <Label className="text-sm font-semibold">Region</Label>
                  <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                    {regions.map((region) => (
                      <div key={region} className="flex items-center gap-2">
                        <Checkbox
                          id={`region-${region}`}
                          checked={selectedRegions.includes(region)}
                          onCheckedChange={() => handleRegionToggle(region)}
                        />
                        <label
                          htmlFor={`region-${region}`}
                          className="text-sm cursor-pointer flex-1"
                        >
                          {region}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Age Group Filter */}
                <div>
                  <Label className="text-sm font-semibold">Age Group</Label>
                  <div className="mt-2 space-y-2">
                    {ageGroups.map((ageGroup) => (
                      <div key={ageGroup} className="flex items-center gap-2">
                        <Checkbox
                          id={`age-${ageGroup}`}
                          checked={selectedAgeGroups.includes(ageGroup)}
                          onCheckedChange={() => handleAgeGroupToggle(ageGroup)}
                        />
                        <label
                          htmlFor={`age-${ageGroup}`}
                          className="text-sm cursor-pointer flex-1"
                        >
                          {ageGroup}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Registration Status */}
                <div>
                  <Label className="text-sm font-semibold">
                    Registration Status
                  </Label>
                  <div className="mt-2 space-y-2">
                    {[
                      { value: "all", label: "All" },
                      { value: "registered", label: "Registered" },
                      { value: "not_registered", label: "Not Registered" },
                    ].map((status) => (
                      <div
                        key={status.value}
                        className="flex items-center gap-2"
                      >
                        <Checkbox
                          id={`status-${status.value}`}
                          checked={registrationStatus === status.value}
                          onCheckedChange={() =>
                            onRegistrationStatusChange(status.value)
                          }
                        />
                        <label
                          htmlFor={`status-${status.value}`}
                          className="text-sm cursor-pointer flex-1"
                        >
                          {status.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {hasFilters && (
            <Button variant="ghost" size="icon" onClick={onReset}>
              <X className="h-4 w-4" />
            </Button>
          )}

          <Button
            variant="outline"
            onClick={onExport}
            className="gap-2 bg-transparent"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export excel file</span>
          </Button>
        </div>
      </div>

      {/* Active Filters */}
      {hasFilters && (
        <div className="flex flex-wrap gap-2">
          {selectedRegions.map((region) => (
            <Badge key={region} variant="secondary" className="gap-1">
              {region}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() =>
                  onRegionsChange(selectedRegions.filter((r) => r !== region))
                }
              />
            </Badge>
          ))}
          {selectedAgeGroups.map((ageGroup) => (
            <Badge key={ageGroup} variant="secondary" className="gap-1">
              {ageGroup}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() =>
                  onAgeGroupsChange(
                    selectedAgeGroups.filter((a) => a !== ageGroup)
                  )
                }
              />
            </Badge>
          ))}
          {registrationStatus !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {registrationStatus === "registered"
                ? "Registered"
                : "Not Registered"}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => onRegistrationStatusChange("all")}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
