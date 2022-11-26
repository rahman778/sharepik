/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProfile = /* GraphQL */ `
   query GetProfile($id: ID!) {
      getProfile(id: $id) {
         id
         username
         email
         createdAt
         updatedAt
      }
   }
`;
export const listProfiles = /* GraphQL */ `
   query ListProfiles($filter: ModelProfileFilterInput, $limit: Int, $nextToken: String) {
      listProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
         items {
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
         nextToken
      }
   }
`;
export const getPost = /* GraphQL */ `
   query GetPost($id: ID!) {
      getPost(id: $id) {
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
         updatedAt
      }
   }
`;
export const listPosts = /* GraphQL */ `
   query ListPosts($filter: ModelPostFilterInput, $limit: Int, $nextToken: String) {
      listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
         items {
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
            updatedAt
         }
         nextToken
      }
   }
`;
export const postsByProfile = /* GraphQL */ `
   query PostsByProfile(
      $owner: ID!
      $sortDirection: ModelSortDirection
      $filter: ModelPostFilterInput
      $limit: Int
      $nextToken: String
   ) {
      postsByProfile(
         owner: $owner
         sortDirection: $sortDirection
         filter: $filter
         limit: $limit
         nextToken: $nextToken
      ) {
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
   }
`;
export const postsByDate = /* GraphQL */ `
   query PostsByDate(
      $title: String!
      $createdAt: ModelStringKeyConditionInput
      $sortDirection: ModelSortDirection
      $filter: ModelPostFilterInput
      $limit: Int
      $nextToken: String
   ) {
      postsByDate(
         title: $title
         createdAt: $createdAt
         sortDirection: $sortDirection
         filter: $filter
         limit: $limit
         nextToken: $nextToken
      ) {
         items {
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
         nextToken
      }
   }
`;
export const searchPosts = /* GraphQL */ `
   query SearchPosts(
      $filter: SearchablePostFilterInput
      $sort: [SearchablePostSortInput]
      $limit: Int
      $nextToken: String
      $from: Int
      $aggregates: [SearchablePostAggregationInput]
   ) {
      searchPosts(
         filter: $filter
         sort: $sort
         limit: $limit
         nextToken: $nextToken
         from: $from
         aggregates: $aggregates
      ) {
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
         total
         aggregateItems {
            name
            result {
               ... on SearchableAggregateScalarResult {
                  value
               }
               ... on SearchableAggregateBucketResult {
                  buckets {
                     key
                     doc_count
                  }
               }
            }
         }
      }
   }
`;
export const getComment = /* GraphQL */ `
   query GetComment($id: ID!) {
      getComment(id: $id) {
         id
         owner
         postId
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
         content
         createdAt
         updatedAt
      }
   }
`;
export const listComments = /* GraphQL */ `
   query ListComments($filter: ModelCommentFilterInput, $limit: Int, $nextToken: String) {
      listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
         items {
            id
            owner
            by {
               id
               username
               email
               createdAt
               updatedAt
            }
            content
            createdAt
            updatedAt
         }
         nextToken
      }
   }
`;
export const commentsByProfile = /* GraphQL */ `
   query CommentsByProfile(
      $owner: ID!
      $sortDirection: ModelSortDirection
      $filter: ModelCommentFilterInput
      $limit: Int
      $nextToken: String
   ) {
      commentsByProfile(
         owner: $owner
         sortDirection: $sortDirection
         filter: $filter
         limit: $limit
         nextToken: $nextToken
      ) {
         items {
            id
            owner
            postId
            by {
               id
               username
               email
               createdAt
               updatedAt
            }
            post {
               id
               owner
               title
               createdAt
               category
               description
               image
               updatedAt
            }
            content
            createdAt
            updatedAt
         }
         nextToken
      }
   }
`;
export const commentsByPost = /* GraphQL */ `
   query CommentsByPost(
      $postId: ID!
      $sortDirection: ModelSortDirection
      $filter: ModelCommentFilterInput
      $limit: Int
      $nextToken: String
   ) {
      commentsByPost(
         postId: $postId
         sortDirection: $sortDirection
         filter: $filter
         limit: $limit
         nextToken: $nextToken
      ) {
         items {
            id
            owner
            by {
               id
               username
               email
               createdAt
               updatedAt
            }
            content
            createdAt
            updatedAt
         }
         nextToken
      }
   }
`;
