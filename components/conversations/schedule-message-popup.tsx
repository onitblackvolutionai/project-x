"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { format, addMonths, subMonths, startOfMonth, setYear, setMonth } from "date-fns"
import { Clock, ChevronLeft, ChevronRight } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

interface ScheduleMessagePopupProps {
  onSchedule: (date: Date) => void
  className?: string
}

export function ScheduleMessagePopup({ onSchedule, className }: ScheduleMessagePopupProps) {
  const [date, setDate] = React.useState<Date>()
  const [time, setTime] = React.useState<string>("09:00")
  const [currentMonth, setCurrentMonth] = React.useState<Date>(new Date())
  const [isYearMonthDialogOpen, setIsYearMonthDialogOpen] = React.useState(false)
  const [tempYear, setTempYear] = React.useState<number>(new Date().getFullYear())
  const [tempMonth, setTempMonth] = React.useState<number>(new Date().getMonth())

  const handleSchedule = () => {
    if (date) {
      const [hours, minutes] = time.split(":").map(Number)
      const scheduledDate = new Date(date)
      scheduledDate.setHours(hours, minutes)
      onSchedule(scheduledDate)
    }
  }

  // Generate time options every 30 minutes
  const timeOptions = React.useMemo(() => {
    const options = []
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
        options.push(timeString)
      }
    }
    return options
  }, [])

  // Handle arrow navigation
  const handlePreviousMonth = () => {
    setCurrentMonth((prevMonth) => {
      const newMonth = subMonths(prevMonth, 1)
      setDate(undefined) // Reset selected date when month changes
      return newMonth
    })
  }

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => {
      const newMonth = addMonths(prevMonth, 1)
      setDate(undefined) // Reset selected date when month changes
      return newMonth
    })
  }

  const handleYearMonthSelect = () => {
    setIsYearMonthDialogOpen(true)
    setTempYear(currentMonth.getFullYear())
    setTempMonth(currentMonth.getMonth())
  }

  const handleSaveYearMonth = () => {
    const newDate = setYear(setMonth(currentMonth, tempMonth), tempYear)
    setCurrentMonth(newDate)
    setDate(undefined) // Reset selected date when month/year changes
    setIsYearMonthDialogOpen(false) // This only closes the year/month selection dialog
  }

  // Generate year options (current year and next 10 years)
  const yearOptions = React.useMemo(() => {
    const currentYear = new Date().getFullYear()
    return Array.from({ length: 11 }, (_, i) => currentYear + i)
  }, [])

  // Generate month options
  const monthOptions = React.useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      value: i,
      label: format(new Date(2000, i, 1), "MMMM"),
    }))
  }, [])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className={className}>
          <Clock className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" align="center">
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Schedule Message</h4>
            <p className="text-sm text-muted-foreground">Select date and time to schedule your message</p>
          </div>

          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" onClick={handlePreviousMonth} aria-label="Previous month">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" onClick={handleYearMonthSelect}>
              {format(currentMonth, "MMMM yyyy")}
            </Button>
            <Button variant="ghost" size="icon" onClick={handleNextMonth} aria-label="Next month">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            month={currentMonth}
            initialFocus
            showOutsideDays={false}
            disabled={(date) => date < startOfMonth(new Date())}
          />

          <Select value={time} onValueChange={setTime}>
            <SelectTrigger>
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent>
              {timeOptions.map((timeOption) => (
                <SelectItem key={timeOption} value={timeOption}>
                  {timeOption}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            onClick={handleSchedule}
            disabled={!date}
          >
            Schedule 🚀
          </Button>
        </div>
      </PopoverContent>

      <Dialog open={isYearMonthDialogOpen} onOpenChange={setIsYearMonthDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Year and Month</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Select value={tempYear.toString()} onValueChange={(value) => setTempYear(Number.parseInt(value, 10))}>
              <SelectTrigger>
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                {yearOptions.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={tempMonth.toString()} onValueChange={(value) => setTempMonth(Number.parseInt(value, 10))}>
              <SelectTrigger>
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                {monthOptions.map((month) => (
                  <SelectItem key={month.value} value={month.value.toString()}>
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button onClick={handleSaveYearMonth}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Popover>
  )
}

