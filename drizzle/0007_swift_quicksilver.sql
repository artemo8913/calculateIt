CREATE TABLE "Anxieties" (
	"tgId" text NOT NULL,
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "Anxieties_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"date" timestamp DEFAULT now() NOT NULL,
	"anxiety" text DEFAULT '' NOT NULL,
	"probability" integer DEFAULT 5 NOT NULL,
	"worstConsequence" text DEFAULT '' NOT NULL,
	"preventionActions" text DEFAULT '' NOT NULL,
	"advice" text DEFAULT '' NOT NULL
);
