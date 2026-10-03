import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import AppLayout from "../components/layout/AppLayout";
import {
  CalendarCheck2,
  CheckCircle2,
  Clock,
  AlertCircle,
  ExternalLink,
  Calendar,
  Building2,
} from "lucide-react";

export default function Compliance() {
  const { complianceTasks, toggleComplianceStatus, showToast, businessProfile } = useApp();
  const [activeTab, setActiveTab] = useState("all");

  const completedTasks = complianceTasks.filter((t) => t.status === "Completed");
  const dueSoonTasks = complianceTasks.filter(
    (t) => t.status !== "Completed" && (t.urgency === "Urgent" || t.status === "Action Required")
  );
  const upcomingTasks = complianceTasks.filter(
    (t) => t.status !== "Completed" && t.urgency !== "Urgent" && t.status !== "Action Required"
  );

  const tabs = [
    { id: "all", label: "All Tasks", count: complianceTasks.length },
    { id: "upcoming", label: "Upcoming", count: upcomingTasks.length },
    { id: "due_soon", label: "Due Soon", count: dueSoonTasks.length },
    { id: "completed", label: "Completed", count: completedTasks.length },
  ];

  const filteredTasks = complianceTasks.filter((task) => {
    if (activeTab === "completed") return task.status === "Completed";
    if (activeTab === "due_soon") {
      return task.status !== "Completed" && (task.urgency === "Urgent" || task.status === "Action Required");
    }
    if (activeTab === "upcoming") {
      return task.status !== "Completed" && task.urgency !== "Urgent" && task.status !== "Action Required";
    }
    return true;
  });

  const handleToggle = (taskId) => {
    toggleComplianceStatus(taskId);
    showToast("Compliance task status updated.");
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* ========================================================================= */}
        {/* HEADER                                                                    */}
        {/* ========================================================================= */}
        <div className="bg-white border border-[#D8DEE4] rounded p-5 sm:p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#D8DEE4]">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-[#0B4F71] uppercase tracking-wider px-2 py-0.5 rounded bg-[#e3f0f8] border border-[#b8d7eb]">
                  Statutory Schedules
                </span>
                <span className="text-xs text-[#495057]">
                  {businessProfile?.legalName} • {businessProfile?.district || "Maharashtra"}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-[#12304A] font-serif mt-1">
                Compliance Calendar
              </h1>
              <p className="text-xs sm:text-sm text-[#495057] mt-0.5">
                Track periodic returns, annual inspections, and fee renewals required under Maharashtra regulations.
              </p>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
            {tabs.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`p-3 rounded border text-left transition-colors ${
                    active
                      ? "bg-[#0B4F71] text-white border-[#0B4F71]"
                      : "bg-[#F5F7F8] text-[#263238] border-[#D8DEE4] hover:bg-white"
                  }`}
                >
                  <div className={`text-[11px] uppercase font-semibold tracking-wider ${active ? "text-[#cfe5ff]" : "text-[#8c96a0]"}`}>
                    {tab.label}
                  </div>
                  <div className="text-lg sm:text-xl font-bold mt-0.5">
                    {tab.count} <span className="text-xs font-normal">Tasks</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* COMPLIANCE TASKS TABLE                                                    */}
        {/* ========================================================================= */}
        <div className="bg-white border border-[#D8DEE4] rounded p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#D8DEE4]">
            <h2 className="text-base sm:text-lg font-bold text-[#12304A] font-serif">
              Compliance Tasks ({filteredTasks.length})
            </h2>
            <span className="text-xs text-[#8c96a0]">
              Filter: <strong className="text-[#263238] capitalize">{activeTab.replace("_", " ")}</strong>
            </span>
          </div>

          {filteredTasks.length === 0 ? (
            <div className="text-center py-8 text-xs text-[#8c96a0] space-y-2">
              <CalendarCheck2 className="w-8 h-8 text-[#D8DEE4] mx-auto" />
              <p>No compliance tasks found under this filter.</p>
              <button
                onClick={() => setActiveTab("all")}
                className="text-xs font-semibold text-[#0B4F71] underline"
              >
                Show All Tasks
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#F5F7F8] border-b border-[#D8DEE4] text-[#495057] uppercase text-[10px] tracking-wider font-semibold">
                    <th className="py-2.5 px-3">Task</th>
                    <th className="py-2.5 px-3">Due Date</th>
                    <th className="py-2.5 px-3 hidden md:table-cell">Authority</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D8DEE4]">
                  {filteredTasks.map((task) => {
                    const isCompleted = task.status === "Completed";
                    const isDueSoon = !isCompleted && (task.urgency === "Urgent" || task.status === "Action Required");

                    return (
                      <tr key={task.id} className="hover:bg-[#F5F7F8]/80 transition-colors">
                        {/* 1. Task */}
                        <td className="py-3 px-3">
                          <div className={`font-semibold text-sm ${isCompleted ? "line-through text-[#8c96a0]" : "text-[#12304A]"}`}>
                            {task.title}
                          </div>
                          <div className="text-[11px] text-[#495057] mt-0.5">
                            Frequency: {task.frequency || "Annual"} {task.category && `• ${task.category}`}
                          </div>
                          {task.description && (
                            <div className="text-[11px] text-[#8c96a0] mt-0.5 max-w-md hidden sm:block">
                              {task.description}
                            </div>
                          )}
                        </td>

                        {/* 2. Due Date */}
                        <td className="py-3 px-3">
                          <div className="font-semibold text-[#263238]">
                            {task.dueDate || "As scheduled"}
                          </div>
                          {isDueSoon && (
                            <div className="text-[10px] font-bold text-[#b91c1c] uppercase mt-0.5">
                              Due Soon
                            </div>
                          )}
                        </td>

                        {/* 3. Authority */}
                        <td className="py-3 px-3 hidden md:table-cell text-[#495057]">
                          <div className="font-medium text-[#263238]">{task.authority}</div>
                          {task.filingPortal && (
                            <div className="text-[11px] text-[#8c96a0]">{task.filingPortal}</div>
                          )}
                        </td>

                        {/* 4. Status */}
                        <td className="py-3 px-3">
                          {isCompleted ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-[#e1f5ee] text-[#176B55] border border-[#a2e0cb]">
                              <CheckCircle2 className="w-3 h-3" />
                              Completed
                            </span>
                          ) : isDueSoon ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-[#fee2e2] text-[#b91c1c] border border-[#fca5a5]">
                              <AlertCircle className="w-3 h-3" />
                              Due Soon
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-[#e3f0f8] text-[#0B4F71] border border-[#b8d7eb]">
                              <Clock className="w-3 h-3" />
                              Upcoming
                            </span>
                          )}
                        </td>

                        {/* 5. Action */}
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => handleToggle(task.id)}
                            className={`px-3 py-1.5 rounded text-xs font-semibold border transition-colors ${
                              isCompleted
                                ? "bg-white text-[#495057] border-[#D8DEE4] hover:bg-[#F5F7F8]"
                                : "bg-[#0B4F71] text-white border-[#0B4F71] hover:bg-[#12304A]"
                            }`}
                          >
                            {isCompleted ? "Mark Pending" : "Mark Completed"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
