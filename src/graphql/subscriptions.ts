/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateProfile = /* GraphQL */ `
  subscription OnCreateProfile($filter: ModelSubscriptionProfileFilterInput) {
    onCreateProfile(filter: $filter) {
      id
      username
      email
      posts {
        items {
          id
          owner
          title
          createdAt
          category
          description
          image
          updatedAt
        }
        nextToken
      }
      comments {
        items {
          id
          postId
          owner
          content
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateProfile = /* GraphQL */ `
  subscription OnUpdateProfile($filter: ModelSubscriptionProfileFilterInput) {
    onUpdateProfile(filter: $filter) {
      id
      username
      email
      posts {
        items {
          id
          owner
          title
          createdAt
          category
          description
          image
          updatedAt
        }
        nextToken
      }
      comments {
        items {
          id
          postId
          owner
          content
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteProfile = /* GraphQL */ `
  subscription OnDeleteProfile($filter: ModelSubscriptionProfileFilterInput) {
    onDeleteProfile(filter: $filter) {
      id
      username
      email
      posts {
        items {
          id
          owner
          title
          createdAt
          category
          description
          image
          updatedAt
        }
        nextToken
      }
      comments {
        items {
          id
          postId
          owner
          content
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost(
    $filter: ModelSubscriptionPostFilterInput
    $owner: String
  ) {
    onCreatePost(filter: $filter, owner: $owner) {
      id
      owner
      title
      createdAt
      category
      description
      image
      author {
        id
        username
        email
        posts {
          nextToken
        }
        comments {
          nextToken
        }
        createdAt
        updatedAt
      }
      comments {
        items {
          id
          postId
          owner
          content
          createdAt
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost(
    $filter: ModelSubscriptionPostFilterInput
    $owner: String
  ) {
    onUpdatePost(filter: $filter, owner: $owner) {
      id
      owner
      title
      createdAt
      category
      description
      image
      author {
        id
        username
        email
        posts {
          nextToken
        }
        comments {
          nextToken
        }
        createdAt
        updatedAt
      }
      comments {
        items {
          id
          postId
          owner
          content
          createdAt
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost(
    $filter: ModelSubscriptionPostFilterInput
    $owner: String
  ) {
    onDeletePost(filter: $filter, owner: $owner) {
      id
      owner
      title
      createdAt
      category
      description
      image
      author {
        id
        username
        email
        posts {
          nextToken
        }
        comments {
          nextToken
        }
        createdAt
        updatedAt
      }
      comments {
        items {
          id
          postId
          owner
          content
          createdAt
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment(
    $filter: ModelSubscriptionCommentFilterInput
    $owner: String
  ) {
    onCreateComment(filter: $filter, owner: $owner) {
      id
      postId
      owner
      by {
        id
        username
        email
        posts {
          nextToken
        }
        comments {
          nextToken
        }
        createdAt
        updatedAt
      }
      content
      post {
        id
        owner
        title
        createdAt
        category
        description
        image
        author {
          id
          username
          email
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment(
    $filter: ModelSubscriptionCommentFilterInput
    $owner: String
  ) {
    onUpdateComment(filter: $filter, owner: $owner) {
      id
      postId
      owner
      by {
        id
        username
        email
        posts {
          nextToken
        }
        comments {
          nextToken
        }
        createdAt
        updatedAt
      }
      content
      post {
        id
        owner
        title
        createdAt
        category
        description
        image
        author {
          id
          username
          email
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment(
    $filter: ModelSubscriptionCommentFilterInput
    $owner: String
  ) {
    onDeleteComment(filter: $filter, owner: $owner) {
      id
      postId
      owner
      by {
        id
        username
        email
        posts {
          nextToken
        }
        comments {
          nextToken
        }
        createdAt
        updatedAt
      }
      content
      post {
        id
        owner
        title
        createdAt
        category
        description
        image
        author {
          id
          username
          email
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
