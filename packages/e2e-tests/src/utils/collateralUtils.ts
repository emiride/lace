import IndexedDB from '../fixture/indexedDB';
import { Logger } from '../support/logger';
export const resetCollateralState = async (): Promise<void> => {
  const allDBs = await IndexedDB.listDatabases();
  const collateralRelatedDBs = allDBs.filter((db) => db.name.endsWith('UnspendableUtxo'));
  Logger.log(String(collateralRelatedDBs));
  if (collateralRelatedDBs.length > 0) {
    for (const db of collateralRelatedDBs) {
      await IndexedDB.deleteDatabase(db.name);
    }
    await driver.execute('await chrome.runtime.reload()');
  }
};
