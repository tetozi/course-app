import { useState, useEffect } from 'react'
import * as courseService from '../services/courseService'



const useReviews = (courseId) => {
    const [reviews, setReview] = useState({})
  
    useEffect(() => {
        courseService.getreviews(courseId)
            .then(({ reviews }) => {
                setReview(reviews);
            
            });
    }, [courseId, ])

    return [
        reviews,
        
    ]

}

export default useReviews

