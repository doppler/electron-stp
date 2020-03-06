// @ts-nocheck
import { diff } from 'deep-diff';

const DESIGN_DOC_ID = '_design/queries';

const createViews = async (DB: PouchDB.Database): Promise<any> => {
  let existingViewDoc;
  try {
    existingViewDoc = await DB.get(DESIGN_DOC_ID);
  } catch (error) {
    console.error(error);
  }

  const ddoc = {
    _id: DESIGN_DOC_ID,
    views: {
      location_latest_jump: {
        map: function(doc) {
          if (
            doc.type === 'student' &&
            doc.locations.length &&
            doc.latestJump
          ) {
            doc.locations.forEach(function(location) {
              emit([location, doc.latestJump.date], null);
            });
          }
        }.toString()
      }
    }
  };

  let changed = false;
  if (existingViewDoc) {
    ddoc._rev = existingViewDoc._rev;
    const differences = diff(ddoc, existingViewDoc);
    if (differences) {
      changed = true;
    }
  }

  let storeViewResult;
  if (changed) {
    try {
      storeViewResult = await DB.put(ddoc);
      console.log({ storeViewResult });
    } catch (error) {
      console.error(error);
    }
  }

  return storeViewResult;
};

export default createViews;
