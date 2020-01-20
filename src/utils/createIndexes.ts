const APP_INDEXES: TIndexDefinition[] = [
  {
    index: {
      fields: ['type'],
      ddoc: 'by',
      name: 'type'
    }
  },
  {
    index: {
      fields: ['name'],
      ddoc: 'by',
      name: 'name'
    }
  }
];
const createIndexes = async (
  DB: PouchDB.Database
): Promise<TCreateIndexResults> => {
  /**
   * Creeates new indexes to be used by PouchDB.find if they
   * don't aleady exist. Runs at doc startup via AppRouter
   * useEffect()
   */
  let createIndexResults: TCreateIndexResults = [];
  try {
    const existingIndexesResult = await DB.getIndexes();

    const indexNames = existingIndexesResult.indexes.map(i => i.name);

    for (let i = 0; i < APP_INDEXES.length; i++) {
      let indexDefinition = APP_INDEXES[i];

      if (!indexNames.includes(indexDefinition.index.name)) {
        const createIndexResult = await DB.createIndex(indexDefinition);
        createIndexResults.push(createIndexResult);
      }
    }
  } catch (error) {
    console.error(error);
  }
  return createIndexResults;
};

export default createIndexes;
