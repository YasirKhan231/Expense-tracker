-- CreateTable
CREATE TABLE "Income" (
    "id" SERIAL NOT NULL,
    "expense_name" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Income_pkey" PRIMARY KEY ("id")
);
