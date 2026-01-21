const KEYS = {
  BLUEPRINTS: 'cf_blueprints',
  CONTRACTS: 'cf_contracts',
};

export const StorageService = {
  getBlueprints: () => {
    const data = localStorage.getItem(KEYS.BLUEPRINTS);
    return data ? JSON.parse(data) : [];
  },

  saveBlueprint: (blueprint) => {
    const blueprints = StorageService.getBlueprints();
    blueprints.push(blueprint);
    localStorage.setItem(KEYS.BLUEPRINTS, JSON.stringify(blueprints));
  },

  getContracts: () => {
    const data = localStorage.getItem(KEYS.CONTRACTS);
    return data ? JSON.parse(data) : [];
  },

  saveContract: (contract) => {
    const contracts = StorageService.getContracts();
    contracts.push(contract);
    localStorage.setItem(KEYS.CONTRACTS, JSON.stringify(contracts));
  },

  updateContract: (updatedContract) => {
    const contracts = StorageService.getContracts();
    const index = contracts.findIndex((c) => c.id === updatedContract.id);
    if (index !== -1) {
      contracts[index] = updatedContract;
      localStorage.setItem(KEYS.CONTRACTS, JSON.stringify(contracts));
    }
  },

  getBlueprintById: (id) => {
    return StorageService.getBlueprints().find((b) => b.id === id);
  },

  getContractById: (id) => {
    return StorageService.getContracts().find((c) => c.id === id);
  },
};
