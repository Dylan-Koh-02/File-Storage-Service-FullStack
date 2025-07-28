import {
  pgTable,
  uuid,
  text,
  integer,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const files = pgTable("files", {
  id: uuid("id").defaultRandom().primaryKey(),

  // Basic file info
  name: text("name").notNull(),
  path: text("path").notNull(), // folder1/folder11/document111
  size: integer("size").notNull(),
  type: text("type").notNull(), // "folder"

  // Storage info
  fileUrl: text("fileurl").notNull(),
  thumbnailUrl: text("thumbnail_url"),

  // Ownership
  userId: text("user_id").notNull(),
  parentId: uuid("parent_id"), // Null for root item

  // file/folder flags
  isFolder: boolean("is_folder").default(false).notNull(),
  isStarred: boolean("is_starred").default(false).notNull(),
  isTrash: boolean("is_trash").default(false).notNull(),

  //Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/**
 *parent: Each file/folder can have one parent folder
 *children: Each folder can have many files/folders
 */
export const filesRelations = relations(files, ({ one, many }) => ({
  parent: one(files, {
    fields: [files.parentId],
    references: [files.id],
  }),

  //Relationship to child file/folder
  children: many(files),
}));

/**
 * Generate File type
 */
export const File = typeof files.$inferSelect;
export const NewFile = typeof files.$inferInsert;
