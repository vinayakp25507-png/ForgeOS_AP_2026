// Imports ArrowLeft, CalendarDays, CloudSun, Save from lucide-react so this module can reuse that component, helper, or library.
import { ArrowLeft, CalendarDays, CloudSun, Save } from 'lucide-react'
// Imports useState from react so this module can reuse that component, helper, or library.
import { useState } from 'react'

// Continues the component or data expression so its related values and behavior stay grouped together.
interface DailyLogFormProps {
  // Sets the onCancel field so the surrounding object or component receives this setting.
  onCancel: () => void
  // Sets the onSave field so the surrounding object or component receives this setting.
  onSave: (summary: string) => void
  // Continues the component or data expression so its related values and behavior stay grouped together.
  initialSummary?: string
  // Continues the component or data expression so its related values and behavior stay grouped together.
  isEditing?: boolean
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines DailyLogForm so this module can perform its named task when needed.
export function DailyLogForm({ onCancel, onSave, initialSummary = '', isEditing = false }: DailyLogFormProps) {
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [summary, setSummary] = useState(initialSummary)

  // Returns the result so the caller or React receives the value or interface this function provides.
  return (
    // Continues the component or data expression so its related values and behavior stay grouped together.
    <div className="mx-auto w-full max-w-3xl p-6 lg:p-10">
      {/* Starts the <button> element to provide an action the user can activate. */}
      <button className="mb-8 flex items-center gap-2 text-sm font-medium text-[#8E827A] hover:text-[#323232]" onClick={onCancel} type="button">
        {/* Starts the <ArrowLeft> element to organize this part of the interface. */}
        <ArrowLeft className="h-4 w-4" /> Back to daily logs
      {/* Closes the <button> element so later content is no longer part of this region. */}
      </button>
      {/* Starts the <div> element to organize this part of the interface. */}
      <div className="mb-8">
        {/* Starts the <p> element to organize this part of the interface. */}
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9A5E3A]">New site record</p>
        {/* Starts the <h1> element to organize this part of the interface. */}
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#323232]">{isEditing ? 'Edit daily log' : 'Create daily log'}</h1>
        {/* Starts the <p> element to organize this part of the interface. */}
        <p className="mt-2 text-sm text-[#8E827A]">Capture the day’s work, attendance, equipment, and progress in one place.</p>
      {/* Closes the <div> element so later content is no longer part of this region. */}
      </div>
      {/* Starts the <div> element to organize this part of the interface. */}
      <div className="space-y-6">
        {/* Starts the <section> element to group related content into a meaningful region. */}
        <section className="rounded-2xl border border-[#E8E0DA] bg-white p-6">
          {/* Starts the <h2> element to organize this part of the interface. */}
          <h2 className="mb-5 font-semibold text-[#323232]">Log details</h2>
          {/* Starts the <div> element to organize this part of the interface. */}
          <div className="grid gap-5 sm:grid-cols-2">
            {/* Starts the <label> element to name a form control for users and assistive technology. */}
            <label className="text-sm font-medium text-[#595552]">Project
              {/* Starts the <select> element to collect or display a value. */}
              <select className="mt-2 w-full rounded-xl border border-[#E8E0DA] bg-[#FBF9F7] px-3 py-3 text-sm text-[#323232] outline-none focus:border-[#9A5E3A]">
                {/* Starts the <option> element to organize this part of the interface. */}
                <option>Riverside Residences</option>
                {/* Starts the <option> element to organize this part of the interface. */}
                <option>Northgate Commercial Park</option>
              {/* Closes the <select> element so later content is no longer part of this region. */}
              </select>
            {/* Closes the <label> element so later content is no longer part of this region. */}
            </label>
            {/* Starts the <label> element to name a form control for users and assistive technology. */}
            <label className="text-sm font-medium text-[#595552]">Date
              {/* Starts the <div> element to organize this part of the interface. */}
              <div className="relative mt-2">
                {/* Starts the <CalendarDays> element to organize this part of the interface. */}
                <CalendarDays className="absolute left-3 top-3.5 h-4 w-4 text-[#9A5E3A]" />
                {/* Starts the <input> element to collect or display a value. */}
                <input className="w-full rounded-xl border border-[#E8E0DA] bg-[#FBF9F7] py-3 pl-10 pr-3 text-sm text-[#323232] outline-none focus:border-[#9A5E3A]" type="date" defaultValue="2024-06-19" />
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>
            {/* Closes the <label> element so later content is no longer part of this region. */}
            </label>
            {/* Starts the <label> element to name a form control for users and assistive technology. */}
            <label className="text-sm font-medium text-[#595552] sm:col-span-2">Weather
              {/* Starts the <div> element to organize this part of the interface. */}
              <div className="relative mt-2">
                {/* Starts the <CloudSun> element to organize this part of the interface. */}
                <CloudSun className="absolute left-3 top-3.5 h-4 w-4 text-[#9A5E3A]" />
                {/* Starts the <input> element to collect or display a value. */}
                <input className="w-full rounded-xl border border-[#E8E0DA] bg-[#FBF9F7] py-3 pl-10 pr-3 text-sm text-[#323232] outline-none focus:border-[#9A5E3A]" placeholder="e.g. Clear · 28°C" />
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>
            {/* Closes the <label> element so later content is no longer part of this region. */}
            </label>
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>
        {/* Closes the <section> element so later content is no longer part of this region. */}
        </section>
        {/* Starts the <section> element to group related content into a meaningful region. */}
        <section className="rounded-2xl border border-[#E8E0DA] bg-white p-6">
          {/* Starts the <h2> element to organize this part of the interface. */}
          <h2 className="mb-2 font-semibold text-[#323232]">Site summary</h2>
          {/* Starts the <p> element to organize this part of the interface. */}
          <p className="mb-4 text-xs text-[#8E827A]">Add a concise overview of what happened on site.</p>
          {/* Starts the <textarea> element to collect or display a value. */}
          <textarea className="min-h-36 w-full resize-y rounded-xl border border-[#E8E0DA] bg-[#FBF9F7] p-3 text-sm text-[#323232] outline-none focus:border-[#9A5E3A]" onChange={(event) => setSummary(event.target.value)} placeholder="Describe completed work, constraints, incidents, and next steps..." value={summary} />
        {/* Closes the <section> element so later content is no longer part of this region. */}
        </section>
        {/* Starts the <div> element to organize this part of the interface. */}
        <div className="flex justify-end gap-3">
          {/* Starts the <button> element to provide an action the user can activate. */}
          <button className="rounded-xl border border-[#E8E0DA] px-5 py-3 text-sm font-semibold text-[#595552] hover:bg-white" onClick={onCancel} type="button">Cancel</button>
          {/* Starts the <button> element to provide an action the user can activate. */}
          <button className="flex items-center gap-2 rounded-xl bg-[#323232] px-5 py-3 text-sm font-semibold text-[#F7F3EE] hover:bg-[#9A5E3A]" onClick={() => onSave(summary || 'Daily site work recorded.')} type="button">
            {/* Starts the <Save> element to organize this part of the interface. */}
            <Save className="h-4 w-4" /> {isEditing ? 'Save changes' : 'Save as draft'}
          {/* Closes the <button> element so later content is no longer part of this region. */}
          </button>
        {/* Closes the <div> element so later content is no longer part of this region. */}
        </div>
      {/* Closes the <div> element so later content is no longer part of this region. */}
      </div>
    {/* Closes the <div> element so later content is no longer part of this region. */}
    </div>
  // Closes this function call or grouped expression so the surrounding code can continue.
  )
// Closes the current block or object so the grouped statements or settings end here.
}
