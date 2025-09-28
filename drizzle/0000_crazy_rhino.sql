CREATE TYPE "public"."transactionenum" AS ENUM('inc', 'out');--> statement-breakpoint
CREATE TABLE "Accounts" (
	"tgId" text NOT NULL,
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "Accounts_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"value" numeric(14, 2),
	"isPrimary" boolean
);
--> statement-breakpoint
CREATE TABLE "Categories" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "Categories_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Tags" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "Tags_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Transactions" (
	"tgId" text NOT NULL,
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "Transactions_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"accountId" integer NOT NULL,
	"categoryId" integer NOT NULL,
	"tagIds" integer[] NOT NULL,
	"type" "transactionenum" NOT NULL,
	"note" text,
	"value" numeric(14, 2) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_accountId_Accounts_id_fk" FOREIGN KEY ("accountId") REFERENCES "public"."Accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_categoryId_Categories_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."Categories"("id") ON DELETE no action ON UPDATE no action;