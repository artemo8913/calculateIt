ALTER TABLE "Transactions" ALTER COLUMN "tagIds" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "Categories" ADD COLUMN "tgId" text NOT NULL;--> statement-breakpoint
ALTER TABLE "Tags" ADD COLUMN "tgId" text NOT NULL;--> statement-breakpoint
ALTER TABLE "Transactions" ADD COLUMN "date" date DEFAULT now() NOT NULL;