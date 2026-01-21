import { ContractStatus } from './types';

export const STATUS_TRANSITIONS = {
  [ContractStatus.CREATED]: [ContractStatus.APPROVED, ContractStatus.REVOKED],
  [ContractStatus.APPROVED]: [ContractStatus.SENT],
  [ContractStatus.SENT]: [ContractStatus.SIGNED, ContractStatus.REVOKED],
  [ContractStatus.SIGNED]: [ContractStatus.LOCKED],
  [ContractStatus.LOCKED]: [],
  [ContractStatus.REVOKED]: [],
};

export const STATUS_COLORS = {
  [ContractStatus.CREATED]: 'bg-blue-100 text-blue-800 border-blue-200',
  [ContractStatus.APPROVED]: 'bg-purple-100 text-purple-800 border-purple-200',
  [ContractStatus.SENT]: 'bg-amber-100 text-amber-800 border-amber-200',
  [ContractStatus.SIGNED]: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  [ContractStatus.LOCKED]: 'bg-slate-100 text-slate-800 border-slate-200',
  [ContractStatus.REVOKED]: 'bg-rose-100 text-rose-800 border-rose-200',
};

export const STATUS_GROUPS = {
  [ContractStatus.CREATED]: 'PENDING',
  [ContractStatus.APPROVED]: 'PENDING',
  [ContractStatus.SENT]: 'ACTIVE',
  [ContractStatus.SIGNED]: 'SIGNED',
  [ContractStatus.LOCKED]: 'SIGNED',
  [ContractStatus.REVOKED]: 'PENDING',
};
