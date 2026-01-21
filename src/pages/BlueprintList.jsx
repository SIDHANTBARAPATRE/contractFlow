import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { StorageService } from '../services/storage';

const BlueprintList = () => {
  const [blueprints, setBlueprints] = useState([]);

  useEffect(() => {
    setBlueprints(StorageService.getBlueprints());
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-10">

      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-3xl font-extrabold text-slate-900">
            Blueprint Registry
          </h3>
          <p className="text-slate-700 mt-1">
            Create the blueprints.
          </p>
        </div>

        <Link
          to="/blueprints/new"
          className="bg-indigo-700 hover:bg-indigo-800 text-white px-8 py-3 rounded-2xl font-bold transition-all shadow-xl border-2 border-indigo-900/40 active:scale-95"
        > 
          New Template
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {blueprints.length > 0 ? (
          blueprints.map((bp) => (
            <div
              key={bp.id}
              className="bg-white rounded-[2.5rem] border-[3px] border-slate-300 p-8 hover:shadow-2xl transition-all group flex flex-col h-full relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100 rounded-bl-[100px] -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500 opacity-60" />

              {/* Card Top */}
              <div className="flex justify-between items-start mb-6 relative">
                <div className="bg-indigo-700 text-white p-3 rounded-2xl shadow-md">
                  <span className="text-xl">📝</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">
                    Template ID
                  </span>
                  <span className="text-[10px] font-mono text-slate-600">
                    {bp.id.slice(0, 8)}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h4 className="font-extrabold text-slate-900 text-xl mb-2 group-hover:text-indigo-700 transition-colors">
                {bp.name}
              </h4>

              <p className="text-slate-700 text-sm mb-8 flex-1 leading-relaxed">
                {bp.description ||
                  'Enterprise-grade legal framework with predefined variables.'}
              </p>

              {/* Footer */}
              <div className="space-y-4 pt-6 border-t-2 border-slate-300 relative">

                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {bp.fields.slice(0, 3).map((_, i) => (
                      <div
                        key={i}
                        className="w-7 h-7 rounded-full border-2 border-white bg-slate-300 flex items-center justify-center text-[10px] font-bold text-slate-700"
                      >
                        {i + 1}
                      </div>
                    ))}
                    {bp.fields.length > 3 && (
                      <div className="w-7 h-7 rounded-full border-2 border-white bg-indigo-200 flex items-center justify-center text-[10px] font-bold text-indigo-800">
                        +{bp.fields.length - 3}
                      </div>
                    )}
                  </div>

                  <span className="text-xs font-bold text-slate-600">
                    {bp.fields.length} Dynamic Fields
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    {new Date(bp.createdAt).toLocaleDateString()}
                  </span>

                  <Link
                    to={`/contracts/new?blueprintId=${bp.id}`}
                    className="text-xs font-black text-indigo-700 hover:bg-indigo-700 hover:text-white px-4 py-2 rounded-xl transition-all border-2 border-indigo-300"
                  >
                    GENERATE →
                  </Link>
                </div>

              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-32 text-center bg-white rounded-[3rem] border-[3px] border-dashed border-slate-300 shadow-lg">

            <div className="text-6xl mb-6 opacity-80">📐</div>

            <h4 className="text-slate-900 text-2xl font-black mb-2">
              No blueprints yet.
            </h4>

            <p className="text-slate-700 text-sm max-w-md mx-auto mb-8">
              Create your first architectural blueprint.
            </p>

            <Link
              to="/blueprints/new"
              className="inline-block bg-indigo-700 text-white px-10 py-4 rounded-2xl font-black shadow-xl border-2 border-indigo-900/40 hover:bg-indigo-800 active:scale-95 transition-all"
            >
              Launch Creator
            </Link>

          </div>
        )}
      </div>
    </div>
  );
};

export default BlueprintList;
