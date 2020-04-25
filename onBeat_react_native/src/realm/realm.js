import Realm from 'realm'

import Image from './v1/models/Image'
import Contributor from './v1/models/Contributor'
import SongV1 from './v1/models/Song'
import Album from './v1/models/Album'
import Artist from './v1/models/Artist'
import Library from './v1/models/Library'
import Token from './v1/models/Token'
import Playlist from './v1/models/Playlist'
import SavedSong from './v1/models/SavedSong'

import SongV2 from './v2/models/Song'


const schemas = [
  {
    schema: [
      Token.schema,
      SongV1.schema,
      Album.schema,
      Artist.schema,
      Library.schema,
      Playlist.schema,
      SavedSong.schema,
      Contributor.schema,
      Image.schema
    ],
    schemaVersion: 1,
  },
  {
    schema: [
      Token.schema,
      SongV2.schema,
      Album.schema,
      Artist.schema,
      Library.schema,
      Playlist.schema,
      SavedSong.schema,
      Contributor.schema,
      Image.schema
    ],
    schemaVersion: 2,
  },
]

console.log(Realm.defaultPath);
console.log("WASUHHHHHH");


// If Realm.schemaVersion() returned -1, it means this is a new Realm file so no migration is needed.
let nextSchemaVersion = Realm.schemaVersion(Realm.defaultPath);
if (nextSchemaVersion !== -1) {

  while (nextSchemaVersion < schemas[schemas.length-1].schemaVersion) {
    let schemaVersion = schemas[schemas.findIndex(x => x.schemaVersion === nextSchemaVersion)]
    const migratedRealm = new Realm(schemaVersion);
    migratedRealm.close();
    nextSchemaVersion++
  }
}

const realm = new Realm(schemas[schemas.length-1])

// realm.write(() => {
  // let OnBeatToken = realm.objects('Token').filtered('platform = "OnBeat"')["0"]
  // if(OnBeatToken) realm.delete(OnBeatToken)
//   realm.deleteAll();
// });

export default realm;
