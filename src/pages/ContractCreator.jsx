import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ContractStatus } from '../types';
import { StorageService } from '../services/storage';

const ContractCreator = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [blueprints, setBlueprints] = useState([]);
  const [selectedBlueprintId, setSelectedBlueprintId] = useState(
    searchParams.get('blueprintId') || ''
  );
  const [contractName, setContractName] = useState('');

  useEffect(() => {
    setBlueprints(StorageService.getBlueprints());
  }, []);

  const handleCreate = () => {
    if (!contractName || !selectedBlueprintId) return;

    const contract = {
      id: 'CTR-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
      name: contractName,
      blueprintId: selectedBlueprintId,
      status: ContractStatus.CREATED,
      fieldValues: {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    StorageService.saveContract(contract);
    navigate(`/contracts/${contract.id}`);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-10">

      {/* Header */}
      <div className="text-center">
        <h3 className="text-4xl font-black text-slate-900 tracking-tight">
          Aggrement Creation
        </h3>
        <p className="text-slate-700 mt-2 text-lg">
          select the bueprint or create new.
        </p>
      </div>

      {/* Card */}
      <div className="bg-white p-10 rounded-[3rem] border-[3px] border-slate-300 shadow-2xl space-y-10">

        {/* Blueprint selection */}
        <div>
          <label className="block text-[10px] font-black text-slate-600 uppercase tracking-widest mb-4">
            Target Blueprint Architecture
          </label>

          {blueprints.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {blueprints.map((bp) => {
                const selected = selectedBlueprintId === bp.id;

                return (
                  <button
                    key={bp.id}
                    onClick={() => setSelectedBlueprintId(bp.id)}
                    className={`flex items-center justify-between p-6 rounded-[2rem] border-[3px] transition-all duration-300 ${
                      selected
                        ? 'border-indigo-700 bg-indigo-100 scale-[1.02] shadow-lg'
                        : 'border-slate-300 bg-white hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl border-2 ${
                          selected
                            ? 'bg-indigo-700 text-white border-indigo-800'
                            : 'bg-white text-slate-500 border-slate-300'
                        }`}
                      >
                        {bp.name.charAt(0)}
                      </div>

                      <div className="text-left">
                        <div className="font-black text-slate-900">
                          {bp.name}
                        </div>
                        <div className="text-[10px] font-bold text-slate-600 uppercase tracking-tight">
                          {bp.fields.length} predefined variables
                        </div>
                      </div>
                    </div>

                    {selected && (
                      <div className="w-7 h-7 rounded-full bg-indigo-700 flex items-center justify-center text-white text-[12px] font-black">
                        ✓
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="p-16 text-center bg-white border-[3px] border-dashed border-slate-300 rounded-[2.5rem] shadow-inner">
              <div className="text-4xl mb-4">🏗️</div>
              <p className="text-slate-900 font-bold mb-2">
                No blueprinted architecture found.
              </p>
              <p className="text-slate-700 text-sm mb-8">
                You must design a blueprint before you can instantiate an
                agreement.
              </p>
              <button
                onClick={() => navigate('/blueprints/new')}
                className="bg-indigo-700 text-white px-8 py-3 rounded-2xl font-black shadow-xl border-2 border-indigo-900/40 hover:bg-indigo-800"
              >
                Create Blueprint →
              </button>
            </div>
          )}
        </div>

        {/* Contract name */}
        {selectedBlueprintId && (
          <div className="pt-10 border-t-2 border-slate-300 animate-in slide-in-from-top-4 duration-500">
            <label className="block text-[10px] font-black text-slate-600 uppercase tracking-widest mb-3">
              Agreement Identifier (Name)
            </label>

            <input
              type="text"
              value={contractName}
              onChange={(e) => setContractName(e.target.value)}
              className="w-full px-8 py-5 bg-white border-[3px] border-slate-300 rounded-[1.5rem] outline-none focus:ring-4 focus:ring-indigo-300 text-slate-900 font-black text-lg shadow-sm"
              placeholder="XYZ - finance"
            />
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-4 pt-6">
          <button
            onClick={handleCreate}
            disabled={!contractName || !selectedBlueprintId}
            className="flex-1 bg-indigo-700 hover:bg-indigo-800 disabled:bg-slate-400 text-white py-5 rounded-[2rem] font-black text-lg transition-all shadow-2xl border-2 border-indigo-900/40 active:scale-95"
          >
            Launch Instance
          </button>

          <button
            onClick={() => navigate('/')}
            className="px-10 bg-white border-2 border-slate-300 hover:bg-slate-100 text-slate-700 py-5 rounded-[2rem] font-bold transition-all"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
};

export default ContractCreator;
