CREATE TABLE "cake"(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(100) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "image" VARCHAR(1000) NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL
);

CREATE TABLE "clients"(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(100) NOT NULL,
    "address" VARCHAR(1000) NOT NULL,
    "phone" VARCHAR(1000) NOT NULL
);

CREATE TABLE "orders"(
    "id" SERIAL PRIMARY KEY,
    "clientId" INTEGER NOT NULL,
    "cakeId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
);

