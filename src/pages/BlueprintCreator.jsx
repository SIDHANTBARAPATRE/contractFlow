import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FieldType } from '../types';
import { StorageService } from '../services/storage';

const BlueprintCreator = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [fields, setFields] = useState([]);
  const [isAddingField, setIsAddingField] = useState(false);
  const [newField, setNewField] = useState({
    type: FieldType.TEXT,
    label: '',
  });

  const handleAddField = () => {
    if (!newField.label) return;

    const field = {
      id: Math.random().toString(36).substr(2, 9),
      type: newField.type,
      label: newField.label,
      x: 0,
      y: 0,
    };

    setFields([...fields, field]);
    setIsAddingField(false);
    setNewField({ type: FieldType.TEXT, label: '' });
  };

  const removeField = (id) => {
    setFields(fields.filter((f) => f.id !== id));
  };

  const handleSave = () => {
    if (!name || fields.length === 0) return;

    const blueprint = {
      id: 'BP-' + Math.random().toString(36).substr(2, 5).toUpperCase(),
      name,
      description,
      fields,
      createdAt: new Date().toISOString(),
    };

    StorageService.saveBlueprint(blueprint);
    navigate('/blueprints');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-3xl font-black text-slate-900 tracking-tight">
            Design Blueprint
          </h3>
          <p className="text-slate-700 mt-1">
            Structure the data schema for your next contract template.
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/blueprints')}
            className="px-8 py-3 rounded-2xl font-bold text-slate-600 border-2 border-slate-300 hover:bg-slate-100 transition-all"
          >
            Discard
          </button>
          <button
            onClick={handleSave}
            disabled={!name || fields.length === 0}
            className="bg-indigo-700 hover:bg-indigo-800 disabled:bg-slate-400 text-white px-10 py-3 rounded-2xl font-black transition-all shadow-xl border-2 border-indigo-900/40"
          >
            Commit Template
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

        {/* Left Panel */}
        <div className="lg:col-span-4 space-y-8">

          {/* Metadata */}
          <div className="bg-white p-8 rounded-[2rem] border-[3px] border-slate-300 shadow-lg">
            <h4 className="font-black text-slate-900 mb-6 uppercase text-xs tracking-widest text-indigo-600">
              Metadata
            </h4>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-black text-slate-600 uppercase mb-2">
                  Blueprint Identity
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-5 py-3 bg-white border-[3px] border-slate-300 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 font-bold shadow-sm"
                  placeholder="Housing aggrement"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-600 uppercase mb-2">
                  Internal Notes
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-5 py-3 bg-white border-[3px] border-slate-300 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none h-32 resize-none text-sm text-slate-700 shadow-sm"
                  placeholder="Additional information"
                />
              </div>
            </div>
          </div>

          {/* Fields */}
          <div className="bg-white p-8 rounded-[2rem] border-[3px] border-slate-300 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest text-indigo-600">
                Dynamic Components
              </h4>
              <button
                onClick={() => setIsAddingField(true)}
                className="w-9 h-9 rounded-full bg-indigo-700 text-white flex items-center justify-center font-bold hover:bg-indigo-800 transition-all shadow-md"
              >
                +
              </button>
            </div>

            <div className="space-y-3">
              {fields.map((f, idx) => (
                <div
                  key={f.id}
                  className="flex items-center justify-between p-4 bg-white rounded-2xl group border-[2px] border-slate-300 hover:border-slate-400 transition-all shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-slate-500 w-4">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="text-sm font-bold text-slate-900">
                        {f.label}
                      </div>
                      <div className="text-[9px] text-indigo-600 font-black uppercase tracking-widest">
                        {f.type}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeField(f.id)}
                    className="text-slate-400 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <span className="text-lg">✕</span>
                  </button>
                </div>
              ))}

              {fields.length === 0 && (
                <div className="text-center py-10 border-2 border-dashed border-slate-300 rounded-2xl">
                  <div className="text-3xl mb-2 opacity-30">🏗️</div>
                  <p className="text-slate-600 text-xs font-bold uppercase tracking-tighter">
                    No fields defined
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Preview */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-[3rem] border-[3px] border-slate-300 shadow-2xl overflow-hidden min-h-[600px] flex flex-col relative">

            <div className="p-6 bg-slate-200 border-b-[3px] border-slate-300 flex justify-between items-center px-10">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-slate-400" />
              </div>
              <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
                Draft
              </span>
            </div>

            <div className="flex-1 p-16 bg-slate-100">
              <div className="max-w-2xl mx-auto space-y-12">

                <div className="text-center mb-16 opacity-60 select-none">
                  <div className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter">
                    Draft Template
                  </div>
                  <div className="w-20 h-1 bg-slate-900 mx-auto mt-2" />
                </div>

                {fields.map((f) => (
                  <div key={f.id} className="animate-in slide-in-from-bottom-4 duration-500">
                    <label className="block text-[10px] font-black text-slate-600 uppercase tracking-widest mb-3">
                      {f.label}
                    </label>
                    <div className="h-12 w-full bg-white border-[2px] border-dashed border-slate-400 rounded-2xl flex items-center px-6 italic text-slate-400 text-sm shadow-sm">
                      {f.type === FieldType.TEXT && 'Freeform data point...'}
                      {f.type === FieldType.DATE && 'YYYY - MM - DD'}
                      {f.type === FieldType.SIGNATURE && 'Authorized Signature Area'}
                      {f.type === FieldType.CHECKBOX && 'Conditional Boolean'}
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Field Modal */}
              {isAddingField && (
                <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-10 animate-in fade-in duration-300">
                  <div className="bg-white w-full max-w-md border-[3px] border-slate-300 rounded-[2.5rem] shadow-2xl p-10">
                    <h5 className="font-black text-2xl text-slate-900 mb-8 tracking-tight">
                      Add Dynamic Component
                    </h5>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2">
                          Component Type
                        </label>

                        <div className="grid grid-cols-2 gap-3">
                          {Object.values(FieldType).map((type) => (
                            <button
                              key={type}
                              onClick={() => setNewField({ ...newField, type })}
                              className={`px-4 py-3 rounded-2xl text-[10px] font-black transition-all border-2 ${
                                newField.type === type
                                  ? 'bg-indigo-700 border-indigo-800 text-white shadow'
                                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                              }`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2">
                          Component Identifier (Label)
                        </label>
                        <input
                          autoFocus
                          type="text"
                          value={newField.label}
                          onChange={(e) =>
                            setNewField({ ...newField, label: e.target.value })
                          }
                          className="w-full px-5 py-3 bg-white border-[3px] border-slate-300 rounded-2xl outline-none font-bold text-slate-900 shadow-sm"
                          placeholder="e.g. Effective Date"
                          onKeyPress={(e) => e.key === 'Enter' && handleAddField()}
                        />
                      </div>

                      <div className="flex gap-3 pt-4">
                        <button
                          onClick={handleAddField}
                          className="flex-1 bg-indigo-700 text-white py-4 rounded-2xl font-black shadow-xl border-2 border-indigo-900/40 transition-all hover:scale-[1.02] active:scale-95"
                        >
                          Deploy Component
                        </button>
                        <button
                          onClick={() => setIsAddingField(false)}
                          className="px-6 bg-white border-2 border-slate-300 text-slate-700 py-4 rounded-2xl font-bold transition-all hover:bg-slate-100"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BlueprintCreator;
