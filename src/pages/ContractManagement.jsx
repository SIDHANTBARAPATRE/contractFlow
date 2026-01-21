import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ContractStatus, FieldType } from '../types';
import { StorageService } from '../services/storage';
import { STATUS_TRANSITIONS, STATUS_COLORS } from '../constants';

const ContractManagement = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [contract, setContract] = useState(null);
  const [blueprint, setBlueprint] = useState(null);
  const [fieldValues, setFieldValues] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (id) {
      const c = StorageService.getContractById(id);
      if (c) {
        setContract(c);
        setFieldValues(c.fieldValues);
        const b = StorageService.getBlueprintById(c.blueprintId);
        if (b) setBlueprint(b);
      }
    }
  }, [id]);

  if (!contract || !blueprint) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <div className="text-center p-10 bg-white rounded-[3rem] shadow-2xl border-[3px] border-slate-300">
          <div className="text-6xl mb-6">🔍</div>
          <h3 className="text-2xl font-black text-slate-900 mb-2">
            Instance not found
          </h3>
          <p className="text-slate-700 mb-8 max-w-xs">
            The requested contract ID does not exist in our secure registry.
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-indigo-700 text-white px-8 py-3 rounded-2xl font-black shadow-xl border-2 border-indigo-900/40 hover:bg-indigo-800"
          >
            Back to Registry
          </button>
        </div>
      </div>
    );
  }

  const isLocked =
    contract.status === ContractStatus.LOCKED ||
    contract.status === ContractStatus.REVOKED;

  const handleFieldChange = (fieldId, value) => {
    if (isLocked) return;
    setFieldValues({ ...fieldValues, [fieldId]: value });
  };

  const handleStatusChange = (newStatus) => {
    setIsUpdating(true);

    const updatedContract = {
      ...contract,
      status: newStatus,
      fieldValues,
      updatedAt: new Date().toISOString(),
    };

    StorageService.updateContract(updatedContract);
    setContract(updatedContract);

    setTimeout(() => setIsUpdating(false), 800);
  };

  const nextStatuses = STATUS_TRANSITIONS[contract.status] || [];

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-32 animate-in fade-in duration-500">

      {/* Header */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8 bg-white p-10 rounded-[3rem] border-[3px] border-slate-300 shadow-2xl">

        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-[1.5rem] bg-indigo-700 text-white flex items-center justify-center font-black text-2xl shadow-xl border-2 border-indigo-900/40">
            {contract.name.charAt(0)}
          </div>

          <div>
            <div className="flex items-center gap-4 mb-1">
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">
                {contract.name}
              </h3>
              <span
                className={`px-4 py-1 rounded-full text-[10px] font-black tracking-widest border-2 ${STATUS_COLORS[contract.status]}`}
              >
                {contract.status}
              </span>
            </div>

            <p className="text-slate-700 font-medium">
              Instance of{' '}
              <span className="font-black text-indigo-700">
                {blueprint.name}
              </span>{' '}
              • Created {new Date(contract.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          {nextStatuses.map((status) => (
            <button
              key={status}
              onClick={() => handleStatusChange(status)}
              disabled={isUpdating}
              className={`px-8 py-3.5 rounded-2xl font-black text-sm transition-all shadow-xl border-2 active:scale-95 ${
                status === ContractStatus.REVOKED
                  ? 'bg-rose-100 text-rose-700 border-rose-300 hover:bg-rose-200'
                  : 'bg-indigo-700 text-white border-indigo-900/40 hover:bg-indigo-800'
              }`}
            >
              {isUpdating ? 'Updating...' : `Advance to ${status}`}
            </button>
          ))}

          {nextStatuses.length === 0 && (
            <div className="bg-slate-200 px-8 py-3.5 rounded-2xl border-2 border-slate-400">
              <span className="text-sm font-black text-slate-600 uppercase tracking-widest italic">
                Immutable Archive Mode
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Main */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

        {/* Document */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-[4rem] border-[3px] border-slate-300 shadow-2xl overflow-hidden min-h-[800px] flex flex-col relative group">

            <div className="p-8 bg-slate-200 border-b-2 border-slate-400 flex justify-between items-center px-12">
              <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">
                Formal Document Representation
              </span>

              {isLocked && (
                <div className="flex items-center gap-2 bg-rose-100 px-4 py-1.5 rounded-full border-2 border-rose-300">
                  <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                  <span className="text-[10px] font-black text-rose-700 uppercase tracking-widest">
                    Locked for Audit
                  </span>
                </div>
              )}
            </div>

            <div className="flex-1 p-24 bg-white relative overflow-y-auto">
              <div className="max-w-xl mx-auto space-y-20">

                <div className="text-center space-y-2 select-none opacity-60">
                  <div className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter">
                    Contract Agreement
                  </div>
                  <div className="text-[10px] font-mono text-slate-600">
                    UUID: {contract.id}
                  </div>
                  <div className="w-40 h-1.5 bg-indigo-700 mx-auto rounded-full"></div>
                </div>

                <div className="space-y-16">
                  {blueprint.fields.map((f) => (
                    <div key={f.id} className="animate-in slide-in-from-bottom-4 duration-700">

                      <label className="block text-[10px] font-black text-slate-600 uppercase tracking-widest mb-4">
                        {f.label}
                      </label>

                      {(f.type === FieldType.TEXT || f.type === FieldType.DATE) && (
                        <input
                          type={f.type === FieldType.DATE ? 'date' : 'text'}
                          disabled={isLocked}
                          value={fieldValues[f.id] || ''}
                          onChange={(e) => handleFieldChange(f.id, e.target.value)}
                          className="w-full px-4 py-4 border-[3px] border-slate-400 rounded-xl bg-white outline-none focus:border-indigo-700 transition-all font-bold text-lg text-slate-900 disabled:bg-slate-100 disabled:text-slate-500"
                        />
                      )}

                      {f.type === FieldType.CHECKBOX && (
                        <div
                          onClick={() => !isLocked && handleFieldChange(f.id, !fieldValues[f.id])}
                          className={`flex items-center gap-6 p-6 rounded-3xl border-[3px] transition-all cursor-pointer ${
                            fieldValues[f.id]
                              ? 'bg-indigo-100 border-indigo-400'
                              : 'bg-white border-slate-300 hover:border-slate-500'
                          } ${isLocked ? 'opacity-60 cursor-not-allowed grayscale' : ''}`}
                        >
                          <div
                            className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all border-2 ${
                              fieldValues[f.id]
                                ? 'bg-indigo-700 text-white border-indigo-900 scale-110'
                                : 'bg-white border-slate-400'
                            }`}
                          >
                            {fieldValues[f.id] && <span className="text-xl">✓</span>}
                          </div>

                          <span
                            className={`text-sm font-bold ${
                              fieldValues[f.id]
                                ? 'text-indigo-900'
                                : 'text-slate-600'
                            }`}
                          >
                            Acknowledged and verified for submission
                          </span>
                        </div>
                      )}

                      {f.type === FieldType.SIGNATURE && (
                        <div className="mt-2">
                          <div
                            className={`h-40 w-full bg-white border-[4px] border-dashed border-slate-400 rounded-[2.5rem] flex items-center justify-center relative overflow-hidden transition-all ${
                              isLocked ? 'grayscale opacity-75' : 'hover:border-indigo-500'
                            }`}
                          >
                            {fieldValues[f.id] ? (
                              <div className="font-['Brush_Script_MT',cursive] text-6xl text-indigo-800 italic select-none animate-in zoom-in-75 duration-300">
                                {fieldValues[f.id]}
                              </div>
                            ) : (
                              <div className="text-center space-y-2 opacity-60">
                                <span className="text-3xl block">🖋️</span>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">
                                  Signatory Required
                                </span>
                              </div>
                            )}

                            {!isLocked && (
                              <button
                                onClick={() => {
                                  const sig = prompt(
                                    'Electronic Signature Authorization - Type your full name:'
                                  );
                                  if (sig) handleFieldChange(f.id, sig);
                                }}
                                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                              ></button>
                            )}
                          </div>
                        </div>
                      )}

                    </div>
                  ))}
                </div>

                <div className="pt-32 text-center select-none">
                  <div className="text-sm font-black text-slate-400 uppercase tracking-[0.4em] mb-2">
                    Digital Integrity Token
                  </div>
                  <div className="text-[10px] font-mono text-slate-700 bg-white py-3 rounded-2xl inline-block px-8 border-[3px] border-slate-300">
                    CERT-MD5-{Math.random().toString(36).substr(2, 12).toUpperCase()}
                  </div>
                </div>

              </div>
            </div>

            <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
              <div className="text-9xl font-black rotate-12">SEAL</div>
            </div>
          </div>
        </div>

        {/* Lifecycle */}
        <div className="lg:col-span-4 space-y-8 sticky top-32">
          <div className="bg-white p-10 rounded-[3rem] border-[3px] border-slate-300 shadow-2xl">

            <h4 className="font-black text-slate-900 mb-8 flex items-center gap-3 text-lg tracking-tight">
              <span className="p-2 bg-indigo-100 rounded-xl text-indigo-700">
                ⏱️
              </span>
              Lifecycle Sequence
            </h4>

            <div className="space-y-12 relative">
              <div className="absolute left-[15px] top-2 bottom-2 w-1 bg-slate-400 rounded-full"></div>

              {Object.values(ContractStatus).map((status, idx) => {
                const isPast =
                  Object.values(ContractStatus).indexOf(contract.status) >= idx;
                const isCurrent = contract.status === status;

                return (
                  <div
                    key={status}
                    className="flex gap-6 relative animate-in fade-in slide-in-from-left-4 duration-500"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div
                      className={`w-8 h-8 rounded-full border-4 z-10 transition-all duration-500 ${
                        isCurrent
                          ? 'bg-indigo-700 border-indigo-200 scale-125 shadow-lg'
                          : isPast
                          ? 'bg-indigo-400 border-white'
                          : 'bg-slate-200 border-white'
                      }`}
                    ></div>

                    <div>
                      <div
                        className={`text-sm font-black tracking-tight ${
                          isCurrent
                            ? 'text-slate-900'
                            : isPast
                            ? 'text-slate-600'
                            : 'text-slate-400'
                        }`}
                      >
                        {status}
                      </div>

                      {isCurrent && (
                        <div className="text-[9px] text-indigo-700 font-black uppercase tracking-widest mt-1 bg-indigo-100 px-2 py-0.5 rounded-lg inline-block">
                          ACTIVE PHASE
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default ContractManagement;
