/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createProfile = /* GraphQL */ `
   mutation CreateProfile($input: CreateProfileInput!, $condition: ModelProfileConditionInput) {
      createProfile(input: $input, condition: $condition) {
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
export const updateProfile = /* GraphQL */ `
   mutation UpdateProfile($input: UpdateProfileInput!, $condition: ModelProfileConditionInput) {
      updateProfile(input: $input, condition: $condition) {
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
export const deleteProfile = /* GraphQL */ `
   mutation DeleteProfile($input: DeleteProfileInput!, $condition: ModelProfileConditionInput) {
      deleteProfile(input: $input, condition: $condition) {
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
export const createPost = /* GraphQL */ `
   mutation CreatePost($input: CreatePostInput!, $condition: ModelPostConditionInput) {
      createPost(input: $input, condition: $condition) {
         id
      }
   }
`;
export const updatePost = /* GraphQL */ `
   mutation UpdatePost($input: UpdatePostInput!, $condition: ModelPostConditionInput) {
      updatePost(input: $input, condition: $condition) {
         id
         owner
         title
         createdAt
         category
         description
         image
         updatedAt
      }
   }
`;
export const deletePost = /* GraphQL */ `
   mutation DeletePost($input: DeletePostInput!, $condition: ModelPostConditionInput) {
      deletePost(input: $input, condition: $condition) {
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
export const createComment = /* GraphQL */ `
   mutation CreateComment($input: CreateCommentInput!, $condition: ModelCommentConditionInput) {
      createComment(input: $input, condition: $condition) {
         id
         postId
         owner
         by {
            id
            username
            email
         }
         content
         createdAt
         updatedAt
      }
   }
`;
export const updateComment = /* GraphQL */ `
   mutation UpdateComment($input: UpdateCommentInput!, $condition: ModelCommentConditionInput) {
      updateComment(input: $input, condition: $condition) {
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
         createdAt
         updatedAt
      }
   }
`;
export const deleteComment = /* GraphQL */ `
   mutation DeleteComment($input: DeleteCommentInput!, $condition: ModelCommentConditionInput) {
      deleteComment(input: $input, condition: $condition) {
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
         createdAt
         updatedAt
      }
   }
`;
