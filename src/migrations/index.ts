import * as migration_20250316_115533_init_db from './20250316_115533_init_db';
import * as migration_20250324_104504_test from './20250324_104504_test';

export const migrations = [
  {
    up: migration_20250316_115533_init_db.up,
    down: migration_20250316_115533_init_db.down,
    name: '20250316_115533_init_db',
  },
  {
    up: migration_20250324_104504_test.up,
    down: migration_20250324_104504_test.down,
    name: '20250324_104504_test'
  },
];
