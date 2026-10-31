-- CreateEnum
CREATE TYPE "RSVPStatus" AS ENUM ('GOING', 'MAYBE', 'NOT_GOING');

-- CreateEnum
CREATE TYPE "InviteStatus" AS ENUM ('ACTIVE', 'REVOKED');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "authUserId" VARCHAR(255) NOT NULL,
    "name" VARCHAR(120),
    "email" VARCHAR(320) NOT NULL,
    "emailNormalized" VARCHAR(320) NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" UUID NOT NULL,
    "title" VARCHAR(160) NOT NULL,
    "description" VARCHAR(5000) NOT NULL,
    "location" VARCHAR(300) NOT NULL,
    "eventDate" TIMESTAMPTZ(3) NOT NULL,
    "imageUrl" TEXT,
    "imagePublicId" VARCHAR(255),
    "createdById" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_invites" (
    "id" UUID NOT NULL,
    "eventId" UUID NOT NULL,
    "tokenHash" CHAR(64) NOT NULL,
    "status" "InviteStatus" NOT NULL DEFAULT 'ACTIVE',
    "expiresAt" TIMESTAMPTZ(3),
    "revokedAt" TIMESTAMPTZ(3),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "event_invites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_rsvps" (
    "id" UUID NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "email" VARCHAR(320) NOT NULL,
    "emailNormalized" VARCHAR(320) NOT NULL,
    "status" "RSVPStatus" NOT NULL,
    "eventId" UUID NOT NULL,
    "inviteId" UUID,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "event_rsvps_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_authUserId_key" ON "users"("authUserId");

-- CreateIndex
CREATE UNIQUE INDEX "users_emailNormalized_key" ON "users"("emailNormalized");

-- CreateIndex
CREATE INDEX "events_createdById_createdAt_idx" ON "events"("createdById", "createdAt");

-- CreateIndex
CREATE INDEX "events_createdById_eventDate_idx" ON "events"("createdById", "eventDate");

-- CreateIndex
CREATE UNIQUE INDEX "event_invites_tokenHash_key" ON "event_invites"("tokenHash");

-- CreateIndex
CREATE INDEX "event_invites_eventId_status_createdAt_idx" ON "event_invites"("eventId", "status", "createdAt");

-- CreateIndex
CREATE INDEX "event_invites_expiresAt_idx" ON "event_invites"("expiresAt");

-- CreateIndex
CREATE INDEX "event_rsvps_eventId_status_createdAt_idx" ON "event_rsvps"("eventId", "status", "createdAt");

-- CreateIndex
CREATE INDEX "event_rsvps_eventId_createdAt_idx" ON "event_rsvps"("eventId", "createdAt");

-- CreateIndex
CREATE INDEX "event_rsvps_inviteId_idx" ON "event_rsvps"("inviteId");

-- CreateIndex
CREATE UNIQUE INDEX "event_rsvps_eventId_emailNormalized_key" ON "event_rsvps"("eventId", "emailNormalized");

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_invites" ADD CONSTRAINT "event_invites_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_rsvps" ADD CONSTRAINT "event_rsvps_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_rsvps" ADD CONSTRAINT "event_rsvps_inviteId_fkey" FOREIGN KEY ("inviteId") REFERENCES "event_invites"("id") ON DELETE SET NULL ON UPDATE CASCADE;
