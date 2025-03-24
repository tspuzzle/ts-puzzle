import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "accounts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" varchar NOT NULL,
  	"provider" varchar NOT NULL,
  	"provider_account_id" varchar NOT NULL,
  	"refresh_token" varchar,
  	"access_token" varchar,
  	"user_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "users" ADD COLUMN "name" varchar;
  ALTER TABLE "users" ADD COLUMN "image" varchar;
  ALTER TABLE "users" ADD COLUMN "email_verified" timestamp(3) with time zone;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "accounts_id" integer;
  DO $$ BEGIN
   ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "accounts_provider_idx" ON "accounts" USING btree ("provider");
  CREATE INDEX IF NOT EXISTS "accounts_provider_account_id_idx" ON "accounts" USING btree ("provider_account_id");
  CREATE INDEX IF NOT EXISTS "accounts_user_idx" ON "accounts" USING btree ("user_id");
  CREATE INDEX IF NOT EXISTS "accounts_updated_at_idx" ON "accounts" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "accounts_created_at_idx" ON "accounts" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "provider_providerAccountId_idx" ON "accounts" USING btree ("provider","provider_account_id");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_accounts_fk" FOREIGN KEY ("accounts_id") REFERENCES "public"."accounts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_accounts_id_idx" ON "payload_locked_documents_rels" USING btree ("accounts_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "accounts" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "accounts" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_accounts_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_accounts_id_idx";
  ALTER TABLE "users" DROP COLUMN IF EXISTS "name";
  ALTER TABLE "users" DROP COLUMN IF EXISTS "image";
  ALTER TABLE "users" DROP COLUMN IF EXISTS "email_verified";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "accounts_id";`)
}
