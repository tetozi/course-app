import "./Course.css"
import { useParams, Link } from "react-router-dom";
import * as courseService from '../../../../services/courseService'

import { useEffect, useState } from "react";

import Modal from "../../../Modal/Modal";
import Review from "../../../Review/Review";
import useFetchCourse from "../../../../hooks/useFetchCourse";
import { useAuthContext } from '../../../../contexts/AuthContext'



const CoursePage = () => {
  const [reviews, setReview] = useState({})
  const { courseId } = useParams();
  const { user } = useAuthContext()
  const [course, setCourse] = useFetchCourse(courseId)
  const owner = course.owner
  const [message, setMessage] = useState({})
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [modalOpen, setModalOpen] = useState(true);

  const [pageNumber, setPageNumber] = useState(0);


  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);


  useEffect(() => {
    courseService.getreviews(courseId, pageNumber)

      .then(({ reviews, totalPages }) => {
        setReview(reviews);
        setNumberOfPages(totalPages);
      });
  }, [pageNumber, courseId])

  //delete handler


  const ownerButtons = (
    < div className="footer" >
      <button className="update-Btm"  ><Link to={`/update/${courseId}`}>Update</Link> </button>
    </div >
  )

  const takeMessage = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = (e) => {
    e.preventDefault()
    let token = user.token
    courseService.sendMessage(courseId, message, token)
      .then(reviews => {
        setCourse(state => ({ ...state, reviews }))
      })
  }
  // Change page

  return (
    <>
      <div >
        <button
          className="openModalBtn"
          onClick={() => {
            setModalOpen(true);
          }}
        >
          Delete
        </button>

        { modalOpen && <Modal setOpenModal={setModalOpen} />}
      </div>

      <div className="coursePage">
        <div className="courseHeader"> <h2>{course.title}</h2>
        </div>
        <div className="content">
          <div className="courseImage"> <img src={course.imageUrl} alt="course" /></div>
          <div className="info">
            <p className="containerContent">  {course.description} Does anyone else intentionally lose rivals every so often to stay in lower division. Way too sweaty the higher you get  </p>
            <p className="duration"> {course.duration} days</p>

            <button className="update-Btm"  ><Link to={`/cart/${courseId}`}> buy it now </Link> </button>
          </div>
        </div>

      </div>
      {user._id && (user._id == owner
        ? ownerButtons 
        
        : <div className="view">

          <h2 className="heading-secondary">Once you try it, you can't go back</h2>
          <textarea className="message" id="textarea" cols="30" rows="10" onChange={takeMessage}></textarea>
          <button className="sendMessage" onClick={sendMessage}>Send me </button>
        </div>
      )}

      <section >
        <div className="testimonials-container">
          <div className="testimonials">

            {reviews.length > 0
              ? (
                <>
                  <Review reviews={reviews} />
                </>
              )
              : <p className="course-err-txt">No review in database!</p>
            }

          </div>
          <div className='myPagination'>
            {pages.map((pageIndex) => (
              <button className='paginationButton' key={pageIndex} onClick={() => setPageNumber(pageIndex)}>
                {pageIndex + 1}
              </button>
            ))}

          </div>
        </div>
      </section>

    </>

  );
};


export default CoursePage;