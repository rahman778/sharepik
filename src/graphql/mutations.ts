/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createProfile = /* GraphQL */ `
  mutation CreateProfile(
    $input: CreateProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    createProfile(input: $input, condition: $condition) {
      id
      username
      email
      posts {
        items {
          id
          profileID
          title
          createdAt
          category
          description
          image
          updatedAt
          owner
        }
        nextToken
      }
      comments {
        items {
          id
          profileID
          postID
          content
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateProfile = /* GraphQL */ `
  mutation UpdateProfile(
    $input: UpdateProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    updateProfile(input: $input, condition: $condition) {
      id
      username
      email
      posts {
        items {
          id
          profileID
          title
          createdAt
          category
          description
          image
          updatedAt
          owner
        }
        nextToken
      }
      comments {
        items {
          id
          profileID
          postID
          content
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteProfile = /* GraphQL */ `
  mutation DeleteProfile(
    $input: DeleteProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    deleteProfile(input: $input, condition: $condition) {
      id
      username
      email
      posts {
        items {
          id
          profileID
          title
          createdAt
          category
          description
          image
          updatedAt
          owner
        }
        nextToken
      }
      comments {
        items {
          id
          profileID
          postID
          content
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
      id
      profileID
      title
      createdAt
      category
      description
      image
      profile {
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
        owner
      }
      comments {
        items {
          id
          profileID
          postID
          content
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      updatedAt
      owner
    }
  }
`;
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
      id
      profileID
      title
      createdAt
      category
      description
      image
      profile {
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
        owner
      }
      comments {
        items {
          id
          profileID
          postID
          content
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      updatedAt
      owner
    }
  }
`;
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
      id
      profileID
      title
      createdAt
      category
      description
      image
      profile {
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
        owner
      }
      comments {
        items {
          id
          profileID
          postID
          content
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      updatedAt
      owner
    }
  }
`;
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
      id
      profileID
      postID
      profile {
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
        owner
      }
      post {
        id
        profileID
        title
        createdAt
        category
        description
        image
        profile {
          id
          username
          email
          createdAt
          updatedAt
          owner
        }
        comments {
          nextToken
        }
        updatedAt
        owner
      }
      content
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
      id
      profileID
      postID
      profile {
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
        owner
      }
      post {
        id
        profileID
        title
        createdAt
        category
        description
        image
        profile {
          id
          username
          email
          createdAt
          updatedAt
          owner
        }
        comments {
          nextToken
        }
        updatedAt
        owner
      }
      content
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
      id
      profileID
      postID
      profile {
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
        owner
      }
      post {
        id
        profileID
        title
        createdAt
        category
        description
        image
        profile {
          id
          username
          email
          createdAt
          updatedAt
          owner
        }
        comments {
          nextToken
        }
        updatedAt
        owner
      }
      content
      createdAt
      updatedAt
      owner
    }
  }
`;
