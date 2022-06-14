import {useState,useEffect } from 'react'
import * as courseService from '../services/courseService'

const useFetchCourse = (courseId) => {
  const [course, setCourse] = useState({})
 

  
    useEffect(() => { 
        courseService.getOne(courseId)
        .then((courseResult) => {
          console.log(courseResult)
          setCourse(courseResult)
        })
     }, [courseId])


    


     return [
        course,
        setCourse,
        
     ]
}

export default useFetchCourse