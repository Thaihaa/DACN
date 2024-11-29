import { gql, request } from 'graphql-request'

const MASTER_URL="https://eu-west-2.cdn.hygraph.com/content/cm3mvcp3606mt07tae4g76mny/master";

export const getCourseList=async(level)=>{
    const query=gql 
    `query CourseList {
        courses(where: {level: `+level+`}) {
          id
          name
          price
          level
          tags
          time
          author
          description {
            markdown
          }
          banner {
            url
          }
          chapters {
            content {
              heading
              description {
                markdown
                html
              }
              output {
                markdown
                html
              }
            }
            title
            id
          }
        }
      }`
    

  const result=await request(MASTER_URL,query);
  return result;
}


export const enrollCourse=async(courseId,userEmail)=>{
  const mutationQuery=gql
  `mutation MyMutation {
  createUserEnrolledCourse(
    data: {courseId: "`+courseId+`", userEmail: "`+userEmail+`", course: {connect: {id: "`+courseId+`"}}}
  ) {
    id
  }
  publishManyUserEnrolledCoursesConnection(to: PUBLISHED) {
    edges {
      node {
        id
      }
    }
  }
}`


  const result=await request(MASTER_URL,mutationQuery);
  return result;
}


export const getUserEnrolledCourse=async(courseId,userEmail)=>{
  const query=gql
  `query GetUserEnrolledCourse {
  userEnrolledCourses(
    where: {courseId: "`+courseId+`", userEmail: "`+userEmail+`"}
  ) {
    id
    courseId
    completedChapter {
      chapterId
    }
  }
}`

  const result=await request(MASTER_URL,query);
  return result;

}


export const MarkChapterCompleted=async(chapterId,recordId)=>{
  const mutationQuery=gql
  `mutation markChapterCompleted {
  updateUserEnrolledCourse(
    data: {completedChapter: {create: {data: {chapterId: "`+chapterId+`"}}}}
    where: {id: "`+recordId+`"}
  ) {
    id
  }
  publishManyUserEnrolledCoursesConnection {
    edges {
      node {
        id
      }
    }
  }
}`

  const result=await request(MASTER_URL,mutationQuery);
  return result;
}


export const GetAllProgressCourse=async(userEmail)=>{
  const query=gql
  `query GetAllUserEnrollProgressCourse {
  userEnrolledCourses(where: {userEmail: "`+userEmail+`"}) {
    completedChapter {
      chapterId
    }
    course {
      banner {
        url
      }
      chapters {
        id
        title
        content {
          heading
          description {
            markdown
            html
          }
          output {
            markdown
            html
          }
        }
      } 
      description{
      markdown
      }
      id
      level
      name
      price
      time
    }
  }
}`

  const result=await request(MASTER_URL,query);
  return result;
}