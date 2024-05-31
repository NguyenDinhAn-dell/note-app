import FolderModel from "../models/FolderModel.js";
import { GraphQLScalarType } from "graphql";
import AuthorModel from "../models/AuthorModel.js";
import NoteModel from "../models/NoteModel.js";
export const resolvers = {
  Date: new GraphQLScalarType({
    name: "Date",
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return value.toISOString();
    },
  }),
  Query: {
    folders: async (parent, args, context) => {
      const folders = await FolderModel.find({
        authorId: context.uid,
      }).sort({
        updatedAt: "desc",
      });
      console.log({ folders, context });
      return folders;
    },
    folder: async (parent, args) => {
      const folderId = args.folderId;
      console.log({ folderId });
      const foundFolder = await FolderModel.findById(folderId);
      return foundFolder;
    },
    note: async (parent, args) => {
      const noteId = args.noteId;
      const note = await NoteModel.findById(noteId);
      return note;
      // return fakeData.notes.find((note) => note.id === noteId);
    },
  },
  Folder: {
    author: async (parent, args) => {
      const authorId = parent.authorId;
      const author = await AuthorModel.findOne({
        uid: authorId,
      });
      return author;
    },
    notes: async (parent, args) => {
      console.log({ parent });
      const notes = await NoteModel.find({
        folderId: parent.id,
      }).sort({
        updatedAt: "desc",
      });
      console.log({ notes });
      return notes;
    },
  },
  Mutation: {
    updateFolder: async (parent, args) => {
      const { id, name } = args;
      try {
        const updatedFolder = await FolderModel.findByIdAndUpdate(id, { name }, { new: true });
        if (!updatedFolder) {
          throw new Error(`Folder with ID ${id} not found`);
        }
        return updatedFolder;
      } catch (error) {
        throw new Error(`Error updating folder: ${error.message}`);
      }
    },
  
    deleteFolder: async (parent, args) => {
      const { id } = args;
      try {
        await NoteModel.deleteMany({ folderId: id });
        const deletedFolder = await FolderModel.findByIdAndDelete(id);
        if (!deletedFolder) {
          return {
            success: false,
            message: `Folder with ID ${id} not found`,
            folder: null,
          };
        }
        return {
          success: true,
          message: `Folder and associated notes deleted successfully`,
          folder: deletedFolder,
        };
      } catch (error) {
        return {
          success: false,
          message: error.message,
          folder: null,
        };
      }
    },

    deleteNote: async (parent, args) => {
      const { id } = args;
      try {
        const deletedNote = await NoteModel.findByIdAndDelete(id);

        if (!deletedNote) {
          return {
            success: false,
            message: `Note with ID ${id} not found`,
            note: null,
          };
        }

        return {
          success: true,
          message: `Note with ID ${id} was successfully deleted`,
          note: deletedNote,
        };
      } catch (error) {
        return {
          success: false,
          message: error.message,
          note: null,
        };
      }
    },
    updateNote: async (parent, args) => {
      const noteId = args.id;
      const note = await NoteModel.findByIdAndUpdate(noteId, args);
      return note;
    },
    addNote: async (parent, args) => {
      const newNote = new NoteModel(args);
      await newNote.save();
      return newNote;
    },

    addFolder: async (parent, args, context) => {
      const newFolder = new FolderModel({ ...args, authorId: context.uid });
      console.log({ newFolder });
      await newFolder.save();
      return newFolder;
    },
    register: async (parent, args) => {
      const foundUser = await AuthorModel.findOne({ uid: args.uid });
      if (!foundUser) {
        const newUser = new AuthorModel(args);
        await newUser.save();
        return newUser;
      }
      return foundUser;
    },
  },
};
