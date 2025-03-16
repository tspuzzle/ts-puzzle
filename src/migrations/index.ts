import * as migration_20250316_115533_init_db from './20250316_115533_init_db';

export const migrations = [
  {
    up: migration_20250316_115533_init_db.up,
    down: migration_20250316_115533_init_db.down,
    name: '20250316_115533_init_db'
  },
];
