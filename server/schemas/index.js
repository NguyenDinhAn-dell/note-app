export const typeDefs = `#graphql
    scalar Date

    type Folder {
        id: String!,
        name: String,
        createdAt: String,
        author: Author,
        notes: [Note],
    }
    type Note {
      id: String!,
      content: String,
      updatedAt: Date,
    }
    
    type Author {
        uid: String!,
        name: String,
    } 

    type Query {
        folders: [Folder],
        folder(folderId: String!): Folder,
        note(noteId: String): Note,
    }
    type DeleteFolderResponse {
        success: Boolean!
        message: String!
        folder: Folder
    }
    type DeleteNoteResponse {
        success: Boolean!
        message: String!
        note: Note
    }

    type Mutation {
      
        deleteFolder(id: String!): DeleteFolderResponse,
        deleteNote(id: String!): DeleteNoteResponse,
        updateNote(id: String!, content: String!): Note,
        addNote(content: String!, folderId: ID!): Note,
        addFolder(name: String!): Folder,
        register(uid: String!, name: String!): Author,
        updateFolder(id: String!, name: String!): Folder
    }

    
`;