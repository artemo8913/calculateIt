ALTER TABLE "Thoughts" ALTER COLUMN "date" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "Thoughts" ALTER COLUMN "date" SET DEFAULT now();