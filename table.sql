CREATE TABLE "cake"(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(100) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "image" VARCHAR(1000) NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT NOW()
);

CREATE TABLE "clients"(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(200) NOT NULL,
    "address" VARCHAR(1000) NOT NULL,
    "phone" VARCHAR(100) NOT NULL
);

CREATE TABLE "orders"(
    "id" SERIAL PRIMARY KEY,
    "clientId" INTEGER NOT NULL REFERENCES "clients"("id") ,
    "cakeId" INTEGER NOT NULL REFERENCES "cake"("id"),
    "quantity" INTEGER NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT NOW(),
    "totalPrice" DOUBLE PRECISION NOT NULL,
);

