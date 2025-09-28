CREATE TABLE "Thoughts" (
	"tgId" text NOT NULL,
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "Thoughts_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"date" date DEFAULT now() NOT NULL,
	"thoughts" text DEFAULT '' NOT NULL,
	"conditions" text DEFAULT '' NOT NULL,
	"emotion" text DEFAULT '' NOT NULL
);
--> statement-breakpoint
DROP TABLE "Accounts" CASCADE;--> statement-breakpoint
DROP TABLE "Categories" CASCADE;--> statement-breakpoint
DROP TABLE "Tags" CASCADE;--> statement-breakpoint
DROP TABLE "Transactions" CASCADE;--> statement-breakpoint
DROP TYPE "public"."transactionenum";