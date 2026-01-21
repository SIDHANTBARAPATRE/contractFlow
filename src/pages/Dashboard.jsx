import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Plus,
  ExternalLink,
  Filter,
  Inbox,
  Send,
  CheckCircle,
  Lock,
} from 'lucide-react';

import { ContractStatus } from '../types';
import { StorageService } from '../services/storage';
import { STATUS_COLORS, STATUS_GROUPS } from '../constants';

const Dashboard = () => {
  const [contracts, setContracts] = useState([]);
  const [blueprints, setBlueprints] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  useEffect(() => {
    setContracts(StorageService.getContracts());
    setBlueprints(StorageService.getBlueprints());
  }, []);

  const stats = useMemo(() => {
    return {
      total: contracts.length,
      pending: contracts.filter((c) => STATUS_GROUPS[c.status] === 'PENDING').length,
      active: contracts.filter((c) => STATUS_GROUPS[c.status] === 'ACTIVE').length,
      signed: contracts.filter((c) => STATUS_GROUPS[c.status] === 'SIGNED').length,
    };
  }, [contracts]);

  const filteredContracts = contracts.filter((c) => {
    const matchesFilter = filter === 'ALL' || STATUS_GROUPS[c.status] === filter;
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-10">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Contract Pipeline
          </h3>
        </div>

        <Link
          to="/contracts/new"
          className="group bg-indigo-700 hover:bg-indigo-800 text-white px-7 py-3 rounded-2xl font-bold transition-all duration-200 shadow-xl border-2 border-indigo-900/40 flex items-center gap-3 active:scale-95"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          New Agreement
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Volume', value: stats.total, color: 'text-slate-900', icon: Inbox },
          { label: 'Awaiting Action', value: stats.pending, color: 'text-indigo-700', icon: Filter },
          { label: 'Out for Signature', value: stats.active, color: 'text-amber-700', icon: Send },
          { label: 'Executed', value: stats.signed, color: 'text-emerald-700', icon: CheckCircle },
        ].map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className="bg-white p-6 rounded-3xl border-[3px] border-slate-300 shadow-lg hover:shadow-xl transition flex flex-col relative overflow-hidden group"
            >
              <Icon
                size={48}
                className={`absolute -right-4 -bottom-4 opacity-15 transition-transform group-hover:scale-110 ${s.color}`}
              />
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-1 relative z-10">
                {s.label}
              </span>
              <span className={`text-3xl font-black ${s.color} relative z-10`}>
                {s.value}
              </span>
            </div>
          );
        })}
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-[2rem] shadow-2xl border-[3px] border-slate-300 overflow-hidden">

        {/* Filters */}
        <div className="px-8 py-6 border-b-[3px] border-slate-300 bg-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">

          <div className="flex items-center gap-2 p-1 bg-white border-[3px] border-slate-300 rounded-2xl shadow">
            {['ALL', 'PENDING', 'ACTIVE', 'SIGNED'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all border-2 ${
                  filter === f
                    ? 'bg-indigo-700 text-white border-indigo-800 shadow'
                    : 'text-slate-700 border-transparent hover:bg-slate-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Quick search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white border-[3px] border-slate-300 rounded-xl px-10 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 w-full sm:w-64 outline-none transition-all shadow"
            />
            <Search className="absolute left-3.5 top-2.5 text-slate-500" size={16} />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-200">
              <tr className="text-[10px] uppercase text-slate-700 font-bold border-b-[3px] border-slate-300">
                <th className="px-10 py-5">Contract Title</th>
                <th className="px-10 py-5">Blueprint</th>
                <th className="px-10 py-5">Status</th>
                <th className="px-10 py-5">Timestamp</th>
                <th className="px-10 py-5 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y-[3px] divide-slate-300">
              {filteredContracts.length > 0 ? (
                filteredContracts.map((contract) => (
                  <tr key={contract.id} className="hover:bg-slate-100 transition group">
                    <td className="px-10 py-6">
                      <div className="font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                        {contract.name}
                      </div>
                      <div className="text-[10px] text-slate-600 font-mono mt-0.5">
                        {contract.id}
                      </div>
                    </td>

                    <td className="px-10 py-6">
                      <span className="text-xs font-semibold text-slate-800 bg-slate-200 px-3 py-1 rounded-lg border-2 border-slate-400">
                        {blueprints.find((b) => b.id === contract.blueprintId)?.name || 'Template'}
                      </span>
                    </td>

                    <td className="px-10 py-6">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase border-2 inline-flex items-center gap-2 ${STATUS_COLORS[contract.status]}`}
                      >
                        {contract.status === ContractStatus.LOCKED && <Lock size={10} />}
                        {contract.status}
                      </span>
                    </td>

                    <td className="px-10 py-6 text-slate-700 text-sm font-medium">
                      {new Date(contract.createdAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>

                    <td className="px-10 py-6 text-right">
                      <Link
                        to={`/contracts/${contract.id}`}
                        className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white border-[3px] border-slate-300 text-slate-700 hover:bg-indigo-700 hover:text-white hover:border-indigo-800 transition-all shadow"
                        title="View Details"
                      >
                        <ExternalLink size={16} />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-10 py-24 text-center">
                    <div className="flex justify-center mb-4">
                      <Inbox size={48} className="text-slate-400" />
                    </div>
                    <div className="text-slate-900 font-bold text-lg">No contracts found</div>
                    <p className="text-slate-600 text-sm max-w-xs mx-auto mt-1">
                      Start by selecting a blueprint to generate your first professional agreement.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
