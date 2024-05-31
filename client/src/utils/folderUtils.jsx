
import { graphQLRequest } from "./request";

export const foldersLoader = async () => {
  const query = `query Folders{
      folders {
        id
        name
        createdAt
      }
    }`;

  const data = await graphQLRequest({ query });

  return data;
};
export const addNewFolder = async (NewFolder) => {
  const query = `mutation mutationAddFolder($name: String!) {
    addFolder(name: $name) {
      name
      author{
        name
      }
    }
  }`;

  const data = await graphQLRequest({
    query,
    variables: { name: NewFolder.name },
  });
  return data;
};

export const updateFolder = async (folderId, name) => {
  const query = `mutation mutationUpdateFolder($id: String!, $name: String!) {
    updateFolder(id: $id, name: $name) {
      id
      name
    }
  }`;

  const data = await graphQLRequest({
    query,
    variables: {
      id: folderId,
      name,
    },
  });

  return data;
};
export const deleteFolder = async (folderId) => {
  const query = `mutation mutationDeleteFolder($deleteFolderId: String!) {
    deleteFolder(id: $deleteFolderId) {
      message
      success
      folder {
        id
        name
      }
    }
  }
  `;

  const data = await graphQLRequest({
    query,
    variables: {
      deleteFolderId: folderId,
    },
  });

  return data;
};
